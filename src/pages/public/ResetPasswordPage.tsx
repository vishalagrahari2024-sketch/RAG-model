import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Alert } from '../../components/common/Alert';
<<<<<<< HEAD
import { Lock, CheckCircle2, ArrowRight } from 'lucide-react';
=======
>>>>>>> 107f6ad (final changes)

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword, isLoading, error, clearError } = useAuth();

  const initialEmail = searchParams.get('email') || 'finance.employee@demo-company.com';
  const token = searchParams.get('token') || 'mock-reset-token-123';

  const [email, setEmail] = useState(initialEmail);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const passwordStrength = authService.validatePassword(newPassword);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!email.trim()) errors.email = 'Email reference required';
    if (!newPassword) errors.newPassword = 'New password is required';
    if (newPassword !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (passwordStrength.score < 2) errors.newPassword = 'Password does not meet the minimum security requirements';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validate()) return;

    try {
      await resetPassword({
        email,
        token,
        newPassword,
        confirmPassword,
      });
      setSuccess(true);
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
          <h2 className="display-heading text-4xl text-[#121212]">Set new password</h2>
          <p className="text-sm text-slate-500">
            Create a secure new password for account <span className="text-slate-800 font-mono">{email}</span>.
          </p>
        </div>

        <Card className="p-5 border-slate-200 shadow-sm rounded-2xl">
=======
    <div className="flex-1 flex items-center justify-center p-4 bg-[#fafafa]">
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-lg font-bold text-gray-900">Set New Password</h2>
          <p className="text-xs text-gray-500">
            Account: {email}
          </p>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-md">
>>>>>>> 107f6ad (final changes)
          {success ? (
            <div className="space-y-3 text-center py-2">
              <h3 className="text-sm font-semibold text-gray-900">Password Updated</h3>
              <p className="text-xs text-gray-600">
                You can now log in with your new password.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/login')}
                className="w-full mt-2"
              >
                Go to Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {error && <Alert type="error" message={error} onClose={clearError} />}

              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={fieldErrors.email}
              />

              <div>
                <Input
                  label="New Password"
                  isPassword
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  error={fieldErrors.newPassword}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Password must contain at least 1 capital letter.
                </p>
              </div>

              <Input
                label="Confirm New Password"
                isPassword
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={fieldErrors.confirmPassword}
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                className="pill-btn w-full mt-2 rounded-full bg-blue-700 hover:bg-blue-800 border-0"
              >
                Update Password
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
