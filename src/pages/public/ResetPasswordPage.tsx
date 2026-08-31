import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Alert } from '../../components/common/Alert';
import { Shield, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword, isLoading, error, clearError } = useAuth();

  const initialEmail = searchParams.get('email') || 'admin@enterprise.ai';
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
    if (passwordStrength.score < 2) errors.newPassword = 'Password is too weak';

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
          <h2 className="text-2xl font-bold text-white tracking-tight">Set New Password</h2>
          <p className="text-xs text-slate-400">
            Create a secure new master password for account <span className="text-slate-200 font-mono">{email}</span>.
          </p>
        </div>

        <Card className="p-0 border-[#1F293D]">
          {success ? (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-100">Password Updated Successfully</h3>
              <p className="text-xs text-slate-400">
                Your credentials have been updated. You can now log into your dashboard with your new password.
              </p>
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => navigate('/login')}
                className="w-full mt-4"
              >
                Proceed to Sign In
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <Alert type="error" message={error} onClose={clearError} />}

              <Input
                label="Target Account Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={fieldErrors.email}
              />

              <Input
                label="New Password"
                isPassword
                placeholder="••••••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
                error={fieldErrors.newPassword}
              />

              <Input
                label="Confirm New Password"
                isPassword
                placeholder="••••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
                error={fieldErrors.confirmPassword}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full mt-2"
              >
                Update Password
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};
