import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Alert } from '../../components/common/Alert';
<<<<<<< HEAD
import { Mail, Lock, Check } from 'lucide-react';
=======
>>>>>>> 107f6ad (final changes)

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
<<<<<<< HEAD
    <div className="flex-1 flex items-center justify-center p-6 bg-cream">
      <div className="w-full max-w-md space-y-6">
        {/* Top Branding */}
        <div className="text-center space-y-2">
          <p className="eyebrow text-[11px] text-blue-600">Apex RAG</p>
          <h2 className="display-heading text-4xl text-[#121212]">Sign in or register</h2>
          <p className="text-sm text-slate-500">
            Sign in with your organizational role credentials to test RBAC and RAG.
=======
    <div className="flex-1 flex items-center justify-center p-4 bg-[#fafafa]">
      <div className="w-full max-w-sm space-y-4">
        {/* Title */}
        <div className="text-center space-y-1">
          <h2 className="text-lg font-bold text-gray-900">Login</h2>
          <p className="text-xs text-gray-500">
            Secure RAG with Role-Based Access Control
>>>>>>> 107f6ad (final changes)
          </p>
        </div>

        {/* Demo Accounts for Mentor/Evaluator Quick Testing */}
        <div className="p-3 rounded-md bg-white border border-gray-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-800">Quick Test Accounts:</span>
            <span className="text-[11px] text-gray-500">Click to fill</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {demoAccounts.map((acc) => {
              const isSelected = email === acc.email;
              return (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleSelectDemo(acc)}
                  className={`p-1.5 rounded text-left border text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-medium'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="font-medium truncate">{acc.label}</div>
                  <div className="text-[10px] text-gray-500 truncate">{acc.role}</div>
                </button>
              );
            })}
          </div>
        </div>

<<<<<<< HEAD
        {/* Login Card */}
        <Card className="p-5 border-slate-200 shadow-sm rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
=======
        {/* Login Form */}
        <div className="p-4 bg-white border border-gray-200 rounded-md">
          <form onSubmit={handleSubmit} className="space-y-3">
>>>>>>> 107f6ad (final changes)
            {error && (
              <Alert
                type="error"
                message={error}
                onClose={clearError}
              />
            )}

            <Input
              label="Email"
              type="email"
              placeholder="user@demo-company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={fieldErrors.email}
            />

            <Input
              label="Password"
              isPassword
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={fieldErrors.password}
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-1.5 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span>Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="pill-btn w-full mt-2 rounded-full bg-blue-700 hover:bg-blue-800 border-0"
            >
              Sign In
            </Button>
          </form>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-gray-500">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
