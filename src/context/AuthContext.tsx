import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  User,
  AuthSession,
  AuthState,
  LoginParams,
  RegisterParams,
  ForgotPasswordParams,
  ResetPasswordParams
} from '../types/auth';
import { authService } from '../services/authService';

interface AuthContextType extends AuthState {
  login: (params: LoginParams) => Promise<void>;
  register: (params: RegisterParams) => Promise<void>;
  requestPasswordReset: (params: ForgotPasswordParams) => Promise<{ success: boolean; message: string }>;
  resetPassword: (params: ResetPasswordParams) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const activeSession = authService.getCurrentSession();
      if (activeSession) {
        setSession(activeSession);
        setUser(activeSession.user);
      }
    } catch (err) {
      console.error('Failed restoring auth session', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (params: LoginParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const newSession = await authService.login(params);
      setSession(newSession);
      setUser(newSession.user);
    } catch (err: any) {
      setError(err.message || 'Login failed.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (params: RegisterParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const newSession = await authService.register(params);
      setSession(newSession);
      setUser(newSession.user);
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const requestPasswordReset = async (params: ForgotPasswordParams) => {
    setError(null);
    try {
      return await authService.requestPasswordReset(params);
    } catch (err: any) {
      setError(err.message || 'Failed to process password reset request.');
      throw err;
    }
  };

  const resetPassword = async (params: ResetPasswordParams) => {
    setError(null);
    try {
      return await authService.resetPassword(params);
    } catch (err: any) {
      setError(err.message || 'Failed to update password.');
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setSession(null);
    setUser(null);
    setError(null);
  };

  const clearError = () => setError(null);

  const value: AuthContextType = {
    user,
    session,
    isAuthenticated: !!user && !!session,
    isLoading,
    error,
    login,
    register,
    requestPasswordReset,
    resetPassword,
    logout,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
