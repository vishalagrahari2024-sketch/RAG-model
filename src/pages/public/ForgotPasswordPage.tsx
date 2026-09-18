import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Alert } from '../../components/common/Alert';
import { Building2, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

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
    } catch {
      // Handled in context
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-1">
          <div className="inline-flex p-2.5 rounded-lg bg-blue-700 text-white shadow-xs mb-1">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Reset Password</h2>
          <p className="text-xs text-slate-500">
            Enter your registered enterprise email address to dispatch password recovery instructions.
          </p>
        </div>

        <Card className="p-5 border-slate-200 shadow-xs">
          {successMessage ? (
            <div className="space-y-4 text-center py-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">Reset Request Dispatched</h3>
              <p className="text-xs text-slate-600 leading-relaxed px-2">{successMessage}</p>

              <div className="p-3 rounded-md bg-slate-50 border border-slate-200 text-left text-xs text-slate-600 space-y-1.5">
                <span className="font-semibold text-slate-800">Development Simulator:</span>
                <p>For testing without an external mailer, jump directly to the reset password form:</p>
                <Link
                  to={`/reset-password?email=${encodeURIComponent(email)}&token=mock-reset-token-123`}
                  className="inline-block px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-mono text-[11px] border border-blue-200 hover:bg-blue-100 transition-colors"
                >
                  Proceed to Reset Form (Token Simulator) →
                </Link>
              </div>

              <div className="pt-2">
                <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:underline">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <Alert type="error" message={error} onClose={clearError} />}

              <Input
                label="Enterprise Email Address"
                type="email"
                placeholder="name@demo-company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                error={fieldError}
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                className="w-full mt-2"
              >
                Send Reset Link
              </Button>

              <div className="text-center pt-2">
                <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Remembered password? Sign In
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};
