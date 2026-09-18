import type {
  User,
  AuthSession,
  LoginParams,
  RegisterParams,
  ForgotPasswordParams,
  ResetPasswordParams,
  PasswordStrength
} from '../types/auth';
import { auditService } from './auditService';

const USERS_STORAGE_KEY = 'rag_rbac_users_v2';
const SESSION_STORAGE_KEY = 'rag_rbac_session';

// Pre-seeded enterprise demo accounts
export const DEMO_USERS: Array<User & { passwordHash: string }> = [
  {
    id: 'usr-fin-01',
    name: 'Rahul Sharma',
    email: 'finance.employee@demo-company.com',
    role: 'Employee',
    department: 'Finance',
    tenant: 'Apex Global Industries',
    permissions: ['VIEW', 'UPLOAD', 'RAG_ACCESS'],
    accessibleDepartments: ['Finance'],
    createdAt: '2026-01-15T09:00:00.000Z',
    passwordHash: 'Finance123!'
  },
  {
    id: 'usr-mfg-01',
    name: 'Amit Verma',
    email: 'manufacturing.employee@demo-company.com',
    role: 'Employee',
    department: 'Manufacturing',
    tenant: 'Apex Global Industries',
    permissions: ['VIEW', 'UPLOAD', 'RAG_ACCESS'],
    accessibleDepartments: ['Manufacturing'],
    createdAt: '2026-02-10T10:30:00.000Z',
    passwordHash: 'Mfg123!'
  },
  {
    id: 'usr-mgr-01',
    name: 'Priya Patel',
    email: 'finance.manager@demo-company.com',
    role: 'Manager',
    department: 'Finance',
    tenant: 'Apex Global Industries',
    permissions: ['VIEW', 'UPLOAD', 'EDIT', 'RAG_ACCESS'],
    accessibleDepartments: ['Finance'],
    createdAt: '2025-11-01T08:15:00.000Z',
    passwordHash: 'Manager123!'
  },
  {
    id: 'usr-ceo-01',
    name: 'Vikram Malhotra',
    email: 'ceo@demo-company.com',
    role: 'CEO',
    department: 'Executive',
    tenant: 'Apex Global Industries',
    permissions: ['VIEW', 'UPLOAD', 'EDIT', 'DELETE', 'RAG_ACCESS'],
    accessibleDepartments: ['Finance', 'Manufacturing', 'HR', 'Executive'],
    createdAt: '2025-06-01T07:00:00.000Z',
    passwordHash: 'Ceo123!'
  },
  {
    id: 'usr-admin-01',
    name: 'Sarah Connor',
    email: 'admin@enterprise.ai',
    role: 'Enterprise Admin',
    department: 'IT',
    tenant: 'Apex Global Industries',
    permissions: ['VIEW', 'UPLOAD', 'EDIT', 'DELETE', 'RAG_ACCESS'],
    accessibleDepartments: ['Finance', 'Manufacturing', 'HR', 'Executive', 'IT'],
    createdAt: '2025-01-01T00:00:00.000Z',
    passwordHash: 'Admin123!'
  }
];

class AuthService {
  constructor() {
    this.initDefaultUsers();
  }

  private initDefaultUsers() {
    const existingUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (!existingUsers) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEMO_USERS));
    }
  }

  public getUsers(): Array<User & { passwordHash: string }> {
    try {
      const usersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      return usersRaw ? JSON.parse(usersRaw) : DEMO_USERS;
    } catch (e) {
      console.error('Failed to parse users from localStorage', e);
      return DEMO_USERS;
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
    await new Promise((resolve) => setTimeout(resolve, 400));

    const email = params.email.trim().toLowerCase();
    const users = this.getUsers();
    const user = users.find((u) => u.email.toLowerCase() === email);

    if (!user) {
      throw new Error('Invalid email or password. Please verify your credentials.');
    }

    if (user.passwordHash !== params.password) {
      throw new Error('Invalid email or password. Please verify your credentials.');
    }

    const { passwordHash: _, ...cleanUser } = user;
    
    const session: AuthSession = {
      user: cleanUser,
      token: `token_${cleanUser.role.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      expiresAt: new Date(Date.now() + (params.rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000)).toISOString(),
      rememberMe: params.rememberMe
    };

    const storage = params.rememberMe ? localStorage : sessionStorage;
    storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));

    // Log successful login
    auditService.logEvent({
      userEmail: cleanUser.email,
      userName: cleanUser.name,
      userRole: cleanUser.role,
      department: cleanUser.department,
      action: 'LOGIN',
      resource: 'Identity & Authentication Provider',
      status: 'Allowed',
      reason: `Authenticated successfully as ${cleanUser.role} (${cleanUser.department})`
    });

    return session;
  }

  public async register(params: RegisterParams): Promise<AuthSession> {
    await new Promise((resolve) => setTimeout(resolve, 600));

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
      throw new Error('Password is too weak. Please meet minimum password security requirements.');
    }

    const dept = params.department || 'Finance';

    const newUserFull: User & { passwordHash: string } = {
      id: `usr-${Date.now().toString(36)}`,
      name: params.name.trim(),
      email,
      role: 'Employee',
      department: dept,
      tenant: params.tenantName ? params.tenantName.trim() : 'Apex Global Industries',
      permissions: ['VIEW', 'UPLOAD', 'RAG_ACCESS'],
      accessibleDepartments: [dept],
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
    await new Promise((resolve) => setTimeout(resolve, 400));
    const email = params.email.trim().toLowerCase();
    return {
      success: true,
      message: `If an account exists for ${email}, password reset instructions have been dispatched.`
    };
  }

  public async resetPassword(params: ResetPasswordParams): Promise<{ success: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (params.newPassword !== params.confirmPassword) {
      throw new Error('Passwords do not match.');
    }

    const email = params.email.trim().toLowerCase();
    const users = this.getUsers();
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === email);

    if (userIndex === -1) {
      throw new Error('Invalid or expired password reset reference.');
    }

    users[userIndex].passwordHash = params.newPassword;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    return {
      success: true,
      message: 'Password successfully updated. You may now sign in with your new password.'
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
    const current = this.getCurrentSession();
    if (current?.user) {
      auditService.logEvent({
        userEmail: current.user.email,
        userName: current.user.name,
        userRole: current.user.role,
        department: current.user.department,
        action: 'LOGOUT',
        resource: 'Session Manager',
        status: 'Allowed',
        reason: 'User explicitly logged out'
      });
    }
    localStorage.removeItem(SESSION_STORAGE_KEY);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }
}

export const authService = new AuthService();
