import React from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginPage from '../../pages/LoginPage';
import { AccessDenied } from '../ui';

/**
 * ProtectedRoute — wraps any page that requires authentication.
 * If `adminOnly` is true, non-admin users see <AccessDenied />.
 */
export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();

  if (!user) return <LoginPage />;
  if (adminOnly && user.role !== 'admin') return <AccessDenied />;

  return children;
}
