import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Alert } from '../../components/common/Alert';
import { Building2, Mail, Lock, User, Check, X } from 'lucide-react';
import type { Department } from '../../types/auth';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState<Department>('Finance');
  const [tenantName, setTenantName] = useState('Apex Global Industries');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const passwordStrength = authService.validatePassword(password);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = 'Full name is required';

    if (!email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (passwordStrength.score < 2) {
      errors.password = 'Password does not meet minimum complexity';
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
        department,
        tenantName,
      });
      navigate('/dashboard');
    } catch {
      // Handled in context
    }
  };

  const getMeterColor = (score: number) => {
    if (score <= 1) return 'bg-red-500';
    if (score === 2) return 'bg-amber-500';
    if (score === 3) return 'bg-blue-600';
    return 'bg-emerald-600';
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-lg space-y-6 my-6">
        {/* Branding */}
        <div className="text-center space-y-1">
          <div className="inline-flex p-2.5 rounded-lg bg-blue-700 text-white shadow-xs mb-1">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Create Corporate Account</h2>
          <p className="text-xs text-slate-500">
            Join your organization's role-based enterprise knowledge network.
          </p>
        </div>

        <Card className="p-5 border-slate-200 shadow-xs">
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
                placeholder="e.g. Ramesh Chandra"
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftIcon={<User className="w-4 h-4" />}
                error={fieldErrors.name}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value as Department)}
                  className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                >
                  <option value="Finance">Finance Department</option>
                  <option value="Manufacturing">Manufacturing Department</option>
                  <option value="HR">Human Resources</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>
            </div>

            <Input
              label="Corporate Email Address"
              type="email"
              placeholder="name@demo-company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              error={fieldErrors.email}
            />

            <Input
              label="Organization / Company Name"
              placeholder="Apex Global Industries"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
              leftIcon={<Building2 className="w-4 h-4" />}
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

            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <div className="p-3 rounded-md bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Password Complexity:</span>
                  <span className="font-semibold text-slate-900">{passwordStrength.label}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden flex gap-0.5">
                  <div className={`h-full transition-all duration-300 ${getMeterColor(passwordStrength.score)}`} style={{ width: `${(passwordStrength.score / 4) * 100}%` }} />
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px] pt-1">
                  <div className={`flex items-center gap-1.5 ${passwordStrength.hasMinLength ? 'text-emerald-700' : 'text-slate-400'}`}>
                    {passwordStrength.hasMinLength ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3" />}
                    <span>Min 8 characters</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordStrength.hasUppercase ? 'text-emerald-700' : 'text-slate-400'}`}>
                    {passwordStrength.hasUppercase ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3" />}
                    <span>Uppercase letter</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordStrength.hasNumber ? 'text-emerald-700' : 'text-slate-400'}`}>
                    {passwordStrength.hasNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3" />}
                    <span>Number (0-9)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordStrength.hasSpecialChar ? 'text-emerald-700' : 'text-slate-400'}`}>
                    {passwordStrength.hasSpecialChar ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3" />}
                    <span>Special character</span>
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
              size="md"
              isLoading={isLoading}
              className="w-full mt-2"
            >
              Complete Registration
            </Button>
          </form>
        </Card>

        <p className="text-center text-xs text-slate-500">
          Already have an enterprise account?{' '}
          <Link to="/login" className="text-blue-700 font-semibold hover:underline">
            Sign in to existing account
          </Link>
        </p>
      </div>
    </div>
  );
};
