import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Alert } from '../../components/common/Alert';
import { Building2, Mail, Lock, Check } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const demoAccounts = [
    {
      label: 'Finance Employee',
      email: 'finance.employee@demo-company.com',
      password: 'Finance123!',
      role: 'Employee (Finance)',
      desc: 'Can access Finance docs only, cannot view Manufacturing'
    },
    {
      label: 'Manufacturing Employee',
      email: 'manufacturing.employee@demo-company.com',
      password: 'Mfg123!',
      role: 'Employee (Manufacturing)',
      desc: 'Can access Manufacturing docs, cannot view Finance'
    },
    {
      label: 'Finance Manager',
      email: 'finance.manager@demo-company.com',
      password: 'Manager123!',
      role: 'Manager (Finance)',
      desc: 'Can View, Upload & Edit Finance department documents'
    },
    {
      label: 'CEO / Executive',
      email: 'ceo@demo-company.com',
      password: 'Ceo123!',
      role: 'CEO (Company-wide)',
      desc: 'Authorized cross-departmental & executive access'
    },
  ];

  const handleSelectDemo = (acc: typeof demoAccounts[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setFieldErrors({});
    clearError();
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validate()) return;

    try {
      await login({ email, password, rememberMe });
      navigate(from, { replace: true });
    } catch {
      // Error handled by AuthContext
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md space-y-6">
        {/* Top Branding */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex p-2.5 rounded-lg bg-blue-700 text-white shadow-xs mb-1">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Apex Enterprise RAG Platform</h2>
          <p className="text-xs text-slate-500">
            Sign in with your organizational role credentials to test RBAC and RAG.
          </p>
        </div>

        {/* 1-Click Demo Accounts Selector */}
        <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-800">1-Click Demo Accounts</span>
            <span className="text-[10px] text-slate-500 font-mono">Select to Test RBAC</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {demoAccounts.map((acc) => {
              const isSelected = email === acc.email;
              return (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleSelectDemo(acc)}
                  className={`p-2 rounded text-left border text-xs transition-all ${
                    isSelected
                      ? 'border-blue-700 bg-blue-50/70 text-blue-900 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{acc.label}</span>
                    {isSelected && <Check className="w-3 h-3 text-blue-700 shrink-0" />}
                  </div>
                  <p className="text-[10px] text-slate-500 font-normal truncate mt-0.5">{acc.role}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Login Card */}
        <Card className="p-5 border-slate-200 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert
                type="error"
                message={error}
                onClose={clearError}
              />
            )}

            <Input
              label="Corporate Email Address"
              type="email"
              placeholder="user@demo-company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              error={fieldErrors.email}
            />

            <Input
              label="Password"
              isPassword
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              error={fieldErrors.password}
            />

            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Remember session</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-blue-700 hover:text-blue-800 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full mt-2"
            >
              Sign In to Platform
            </Button>
          </form>
        </Card>

        {/* Footer info */}
        <div className="text-center text-xs text-slate-500 space-y-1">
          <p>
            Don't have an enterprise account?{' '}
            <Link to="/register" className="text-blue-700 font-semibold hover:underline">
              Register new user
            </Link>
          </p>
          <p className="text-[11px] text-slate-400">
            RBAC enforced at retrieval boundary • Role & Department identity verified
          </p>
        </div>
      </div>
    </div>
  );
};
