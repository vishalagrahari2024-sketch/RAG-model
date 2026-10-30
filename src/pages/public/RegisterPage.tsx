import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Alert } from '../../components/common/Alert';
<<<<<<< HEAD
import { Mail, Lock, User, Building2 } from 'lucide-react';
=======
>>>>>>> 107f6ad (final changes)
import type { Department } from '../../types/auth';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState<Department>('Finance');
  const tenantName = 'Apex Global Industries';
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
      errors.password = 'Password does not meet the minimum security requirements.';
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

<<<<<<< HEAD
  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-cream">
      <div className="w-full max-w-lg space-y-6 my-6">
        {/* Branding */}
        <div className="text-center space-y-2">
          <p className="eyebrow text-[11px] text-blue-600">Apex RAG</p>
          <h2 className="display-heading text-4xl text-[#121212]">Create your account</h2>
          <p className="text-sm text-slate-500">
            Join your organization's role-based enterprise knowledge network.
          </p>
        </div>

        <Card className="p-5 border-slate-200 shadow-sm rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
=======


  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-[#fafafa]">
      <div className="w-full max-w-sm space-y-4 my-4">
        {/* Title */}
        <div className="text-center space-y-1">
          <h2 className="text-lg font-bold text-gray-900">Register</h2>
          <p className="text-xs text-gray-500">
            Create an account to test role permissions
          </p>
        </div>

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
              label="Name"
              placeholder="e.g. Ramesh Chandra"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={fieldErrors.name}
            />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-800">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as Department)}
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:border-blue-600 cursor-pointer"
              >
                <option value="Finance">Finance</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="HR">Human Resources</option>
                <option value="Executive">Executive</option>
              </select>
            </div>

            <Input
              label="Email"
              type="email"
              placeholder="user@demo-company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={fieldErrors.email}
            />

<<<<<<< HEAD
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
=======
            <div>
              <Input
                label="Password"
                isPassword
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={fieldErrors.password}
              />
              <p className="text-xs text-gray-500 mt-1">
                Password must contain at least 1 capital letter.
              </p>
            </div>
>>>>>>> 107f6ad (final changes)

            <Input
              label="Confirm Password"
              isPassword
              placeholder="Confirm password"
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
              Register
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
