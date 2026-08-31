import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/guard/ProtectedRoute';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { ProtectedLayout } from './components/layout/ProtectedLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/public/ResetPasswordPage';

// Protected Pages
import { DashboardPage } from './pages/protected/DashboardPage';
import { KnowledgeBasePage } from './pages/protected/KnowledgeBasePage';
import { ChatPage } from './pages/protected/ChatPage';
import { AccessControlPage } from './pages/protected/AccessControlPage';
import { GuardrailsPage } from './pages/protected/GuardrailsPage';
import { MonitoringPage } from './pages/protected/MonitoringPage';
import { AuditLogsPage } from './pages/protected/AuditLogsPage';
import { SettingsPage } from './pages/protected/SettingsPage';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/access-control" element={<AccessControlPage />} />
            <Route path="/guardrails" element={<GuardrailsPage />} />
            <Route path="/monitoring" element={<MonitoringPage />} />
            <Route path="/audit-logs" element={<AuditLogsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
