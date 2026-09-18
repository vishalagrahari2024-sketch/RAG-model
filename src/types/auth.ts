export const UserRole = {
  Employee: 'Employee',
  Manager: 'Manager',
  CEO: 'CEO',
  EnterpriseAdmin: 'Enterprise Admin',
} as const;
export type UserRole = 'Employee' | 'Manager' | 'CEO' | 'Enterprise Admin';

export const Department = {
  Finance: 'Finance',
  Manufacturing: 'Manufacturing',
  HR: 'HR',
  Executive: 'Executive',
  IT: 'IT',
} as const;
export type Department = 'Finance' | 'Manufacturing' | 'HR' | 'Executive' | 'IT';

export const PermissionAction = {
  VIEW: 'VIEW',
  UPLOAD: 'UPLOAD',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
  RAG_ACCESS: 'RAG_ACCESS',
} as const;
export type PermissionAction = 'VIEW' | 'UPLOAD' | 'EDIT' | 'DELETE' | 'RAG_ACCESS';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: Department;
  tenant: string;
  permissions: PermissionAction[];
  accessibleDepartments: Department[];
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
  department?: Department;
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
