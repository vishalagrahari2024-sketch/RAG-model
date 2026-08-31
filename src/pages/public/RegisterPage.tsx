import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Alert } from '../../components/common/Alert';
import { Shield, Mail, Lock, User, Building, Check, X } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const passwordStrength = authService.validatePassword(password);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = 'Full name is required';

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (passwordStrength.score < 2) {
      errors.password = 'Password does not meet security requirements';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validate()) return;

    try {
      await register({
        name,
        email,
        password,
        confirmPassword,
        tenantName: tenantName || 'Enterprise Sandbox',
      });
      navigate('/dashboard');
    } catch (err) {
      // Handled in context
    }
  };

  const getMeterColor = (score: number) => {
    if (score === 0 || score === 1) return 'bg-red-500';
    if (score === 2) return 'bg-amber-500';
    if (score === 3) return 'bg-blue-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-[#090D16] relative">
      <div className="w-full max-w-lg space-y-6 my-8">
        {/* Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-xl shadow-indigo-500/20 border border-indigo-400/30 mb-1">
            <Shield className="w-8 h-8 text-cyan-300" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Create Enterprise Workspace</h2>
          <p className="text-xs text-slate-400">
            Setup an isolated admin account for your organization.
          </p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="Sarah Connor"
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftIcon={<User className="w-4 h-4" />}
                error={fieldErrors.name}
              />

              <Input
                label="Organization / Tenant"
                placeholder="Aegis Security Corp"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                leftIcon={<Building className="w-4 h-4" />}
              />
            </div>

            <Input
              label="Work Email"
              type="email"
              placeholder="s.connor@enterprise.ai"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              error={fieldErrors.email}
            />

            <Input
              label="Master Password"
              isPassword
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              error={fieldErrors.password}
            />

            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <div className="p-3 rounded-xl bg-[#0D1322] border border-[#1F293D] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Password Complexity:</span>
                  <span className="font-semibold text-slate-200">{passwordStrength.label}</span>
                </div>
                {/* Meter Bar */}
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex gap-1">
                  <div className={`h-full transition-all duration-300 ${getMeterColor(passwordStrength.score)}`} style={{ width: `${(passwordStrength.score / 4) * 100}%` }} />
                </div>
                {/* Requirements check grid */}
                <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-1">
                  <div className={`flex items-center gap-1.5 ${passwordStrength.hasMinLength ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {passwordStrength.hasMinLength ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    <span>Min 8 characters</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordStrength.hasUppercase ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {passwordStrength.hasUppercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    <span>Uppercase letter</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordStrength.hasNumber ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {passwordStrength.hasNumber ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    <span>Number (0-9)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordStrength.hasSpecialChar ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {passwordStrength.hasSpecialChar ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    <span>Special character (!@#)</span>
                  </div>
                </div>
              </div>
            )}

            <Input
              label="Confirm Password"
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
              Create Account & Initialize Dashboard
            </Button>
          </form>
        </Card>

        <p className="text-center text-xs text-slate-400">
          Already registered?{' '}
          <Link to="/login" className="text-blue-400 font-semibold hover:underline">
            Sign in to existing account
          </Link>
        </p>
      </div>
    </div>
  );
};
