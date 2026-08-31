import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Alert } from '../../components/common/Alert';
import { Shield, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { requestPasswordReset, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setFieldError('');

    if (!email.trim()) {
      setFieldError('Email address is required');
      return;
    }

    try {
      const res = await requestPasswordReset({ email });
      setSuccessMessage(res.message);
    } catch (err) {
      // Handled in context
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-[#090D16] relative">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-xl border border-indigo-400/30 mb-2">
            <Shield className="w-8 h-8 text-cyan-300" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Reset Password</h2>
          <p className="text-xs text-slate-400">
            Enter your registered enterprise email address to receive reset instructions.
          </p>
        </div>

        <Card className="p-0 border-[#1F293D]">
          {successMessage ? (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-100">Reset Request Dispatched</h3>
              <p className="text-xs text-slate-400 leading-relaxed px-2">{successMessage}</p>

              <div className="p-3 rounded-xl bg-[#0D1322] border border-[#1F293D] text-left text-xs text-slate-400 space-y-2">
                <span className="font-semibold text-slate-200">Simulation Shortcut:</span>
                <p>For testing without an email server, proceed directly to the reset password screen:</p>
                <Link
                  to={`/reset-password?email=${encodeURIComponent(email)}&token=mock-reset-token-123`}
                  className="inline-block px-3 py-1.5 rounded bg-blue-600/20 text-blue-300 font-mono text-[11px] border border-blue-500/30 hover:bg-blue-600/30 transition-colors"
                >
                  Proceed to Reset Form (Token Simulator) →
                </Link>
              </div>

              <div className="pt-2">
                <Link to="/login" className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:underline">
                  <ArrowLeft className="w-4 h-4" /> Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <Alert type="error" message={error} onClose={clearError} />}

              <Input
                label="Enterprise Email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                error={fieldError}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full mt-2"
              >
                Send Reset Link
              </Button>

              <div className="text-center pt-2">
                <Link to="/login" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Remembered password? Sign In
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};
