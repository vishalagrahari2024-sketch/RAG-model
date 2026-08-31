import type {
  User,
  AuthSession,
  LoginParams,
  RegisterParams,
  ForgotPasswordParams,
  ResetPasswordParams,
  PasswordStrength
} from '../types/auth';

const USERS_STORAGE_KEY = 'rag_rbac_users';
const SESSION_STORAGE_KEY = 'rag_rbac_session';

// Pre-seeded demo user
const DEMO_USER: User & { passwordHash: string } = {
  id: 'usr-admin-01',
  name: 'Sarah Connor',
  email: 'admin@enterprise.ai',
  role: 'Enterprise Admin',
  tenant: 'Aegis Security Corp',
  createdAt: new Date().toISOString(),
  passwordHash: 'Admin123!',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
};

class AuthService {
  constructor() {
    this.initDefaultUsers();
  }

  private initDefaultUsers() {
    const existingUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (!existingUsers) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([DEMO_USER]));
    }
  }

  private getUsers(): Array<User & { passwordHash: string }> {
    try {
      const usersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      return usersRaw ? JSON.parse(usersRaw) : [DEMO_USER];
    } catch (e) {
      console.error('Failed to parse users from localStorage', e);
      return [DEMO_USER];
    }
  }

  private saveUser(newUser: User & { passwordHash: string }) {
    const users = this.getUsers();
    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }

  public validatePassword(password: string): PasswordStrength {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

    let score = 0;
    if (hasMinLength) score++;
    if (hasUppercase) score++;
    if (hasNumber) score++;
    if (hasSpecialChar) score++;

    let label: PasswordStrength['label'] = 'Weak';
    if (score === 2) label = 'Fair';
    if (score === 3) label = 'Good';
    if (score === 4) label = 'Strong';

    return {
      score,
      label,
      hasMinLength,
      hasUppercase,
      hasNumber,
      hasSpecialChar
    };
  }

  public async login(params: LoginParams): Promise<AuthSession> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const email = params.email.trim().toLowerCase();
    const users = this.getUsers();
    const user = users.find((u) => u.email.toLowerCase() === email);

    if (!user) {
      throw new Error('Invalid email or password. Please check your credentials.');
    }

    if (user.passwordHash !== params.password) {
      throw new Error('Invalid email or password. Please check your credentials.');
    }

    const { passwordHash: _, ...cleanUser } = user;
    
    const session: AuthSession = {
      user: cleanUser,
      token: `jwt_mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      expiresAt: new Date(Date.now() + (params.rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000)).toISOString(),
      rememberMe: params.rememberMe
    };

    const storage = params.rememberMe ? localStorage : sessionStorage;
    storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));

    return session;
  }

  public async register(params: RegisterParams): Promise<AuthSession> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const email = params.email.trim().toLowerCase();
    const users = this.getUsers();

    if (users.some((u) => u.email.toLowerCase() === email)) {
      throw new Error('An account with this email address already exists.');
    }

    if (params.password !== params.confirmPassword) {
      throw new Error('Passwords do not match.');
    }

    const strength = this.validatePassword(params.password);
    if (strength.score < 2) {
      throw new Error('Password is too weak. Please meet minimum password security criteria.');
    }

    const newUserFull = {
      id: `usr-${Date.now().toString(36)}`,
      name: params.name.trim(),
      email,
      role: 'Enterprise Admin' as const,
      tenant: params.tenantName ? params.tenantName.trim() : 'My AI Org',
      createdAt: new Date().toISOString(),
      passwordHash: params.password
    };

    this.saveUser(newUserFull);

    return this.login({
      email: params.email,
      password: params.password,
      rememberMe: true
    });
  }

  public async requestPasswordReset(params: ForgotPasswordParams): Promise<{ success: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const email = params.email.trim().toLowerCase();
    const users = this.getUsers();
    const user = users.find((u) => u.email.toLowerCase() === email);

    if (!user) {
      return {
        success: true,
        message: `If an account exists for ${email}, a password reset link has been dispatched.`
      };
    }

    return {
      success: true,
      message: `Password reset link dispatched to ${email}. Check your inbox for reset instructions.`
    };
  }

  public async resetPassword(params: ResetPasswordParams): Promise<{ success: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (params.newPassword !== params.confirmPassword) {
      throw new Error('Passwords do not match.');
    }

    const strength = this.validatePassword(params.newPassword);
    if (strength.score < 2) {
      throw new Error('New password is too weak.');
    }

    const email = params.email.trim().toLowerCase();
    const users = this.getUsers();
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === email);

    if (userIndex === -1) {
      throw new Error('Invalid or expired reset token/email reference.');
    }

    users[userIndex].passwordHash = params.newPassword;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    return {
      success: true,
      message: 'Password successfully updated. You can now login with your new password.'
    };
  }

  public getCurrentSession(): AuthSession | null {
    try {
      let rawSession = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!rawSession) {
        rawSession = sessionStorage.getItem(SESSION_STORAGE_KEY);
      }

      if (!rawSession) return null;

      const session: AuthSession = JSON.parse(rawSession);
      
      if (new Date(session.expiresAt) < new Date()) {
        this.logout();
        return null;
      }

      return session;
    } catch (e) {
      console.error('Failed to parse current auth session', e);
      return null;
    }
  }

  public logout(): void {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }
}

export const authService = new AuthService();
