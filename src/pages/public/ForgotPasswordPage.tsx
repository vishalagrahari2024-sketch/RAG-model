import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Alert } from '../../components/common/Alert';
<<<<<<< HEAD
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
=======


>>>>>>> 107f6ad (final changes)

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
<<<<<<< HEAD
    <div className="flex-1 flex items-center justify-center p-6 bg-cream">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <p className="eyebrow text-[11px] text-blue-600">Apex RAG</p>
          <h2 className="display-heading text-4xl text-[#121212]">Reset password</h2>
          <p className="text-sm text-slate-500">
            Enter your registered enterprise email address to dispatch password recovery instructions.
          </p>
        </div>

        <Card className="p-5 border-slate-200 shadow-sm rounded-2xl">
=======
    <div className="flex-1 flex items-center justify-center p-4 bg-[#fafafa]">
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-lg font-bold text-gray-900">Forgot Password</h2>
          <p className="text-xs text-gray-500">
            Enter your email address to reset your password
          </p>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-md">
>>>>>>> 107f6ad (final changes)
          {successMessage ? (
            <div className="space-y-3 text-center py-2">
              <h3 className="text-sm font-semibold text-gray-900">Reset Link Sent</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{successMessage}</p>

              <div className="p-2.5 rounded bg-gray-50 border border-gray-200 text-left text-xs text-gray-600 space-y-1">
                <span className="font-semibold text-gray-800">Test Simulator:</span>
                <p>Click below to open the reset form directly:</p>
                <Link
                  to={`/reset-password?email=${encodeURIComponent(email)}&token=mock-reset-token-123`}
                  className="inline-block text-blue-600 hover:underline text-xs"
                >
                  Go to Reset Form →
                </Link>
              </div>

              <div className="pt-2">
                <Link to="/login" className="text-xs text-blue-600 hover:underline">
                  Back to Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {error && <Alert type="error" message={error} onClose={clearError} />}

              <Input
                label="Email"
                type="email"
                placeholder="name@demo-company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={fieldError}
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                className="pill-btn w-full mt-2 rounded-full bg-blue-700 hover:bg-blue-800 border-0"
              >
                Send Reset Link
              </Button>

              <div className="text-center pt-2">
                <Link to="/login" className="text-xs text-gray-600 hover:underline">
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
