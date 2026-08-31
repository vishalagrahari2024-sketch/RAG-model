import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Alert } from '../../components/common/Alert';
import { Shield, Mail, Lock, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
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
    } catch (err) {
      // Error handled by AuthContext
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@enterprise.ai');
    setPassword('Admin123!');
    setFieldErrors({});
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-[#090D16] relative">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-xl shadow-indigo-500/20 border border-indigo-400/30 mb-2">
            <Shield className="w-8 h-8 text-cyan-300" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Sign In to Aegis Platform</h2>
          <p className="text-xs text-slate-400">
            Enter your enterprise credentials to access your secure RAG dashboard.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#111726] border border-blue-500/30 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 animate-pulse" />
            <div>
              <span className="font-semibold text-slate-200">Testing Phase 1?</span>
              <p className="text-[11px] text-slate-400">Use pre-seeded Enterprise Admin account.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 font-medium hover:bg-blue-500/30 transition-colors shrink-0 text-xs"
          >
            Auto-fill Demo
          </button>
        </div>

        <Card className="p-0 border-[#1F293D]">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert
                type="error"
                message={error}
                onClose={clearError}
              />
            )}

            <Input
              label="Enterprise Email"
              type="email"
              placeholder="name@company.com"
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

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-[#0D1322] text-blue-600 focus:ring-blue-500"
                />
                <span>Remember session</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full mt-2"
            >
              Sign In to Account
            </Button>
          </form>
        </Card>

        <p className="text-center text-xs text-slate-400">
          Don't have an enterprise workspace?{' '}
          <Link to="/register" className="text-blue-400 font-semibold hover:underline">
            Register new tenant
          </Link>
        </p>
      </div>
    </div>
  );
};
