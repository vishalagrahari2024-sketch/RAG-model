export type UserRole = 'Enterprise Admin' | 'Security Engineer' | 'Data Compliance Officer' | 'Auditor' | 'Standard User';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tenant: string;
  createdAt: string;
  avatarUrl?: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
  rememberMe: boolean;
}

export interface AuthState {
  user: User | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginParams {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  tenantName?: string;
}

export interface ForgotPasswordParams {
  email: string;
}

export interface ResetPasswordParams {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordStrength {
  score: number; // 0 to 4
  label: 'Weak' | 'Fair' | 'Good' | 'Strong';
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}
