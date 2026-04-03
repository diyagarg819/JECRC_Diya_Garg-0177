import React from 'react';
import { useAuth }    from './context/AuthContext';
import LoginPage      from './pages/LoginPage';
import AppLayout      from './components/layout/AppLayout';

export default function AppRouter() {
  const { user } = useAuth();
  return user ? <AppLayout /> : <LoginPage />;
}
