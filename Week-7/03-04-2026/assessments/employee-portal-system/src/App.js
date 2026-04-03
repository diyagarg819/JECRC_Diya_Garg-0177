import React from 'react';
import { EmployeeProvider, useEmployees } from './context/EmployeeContext';
import { AuthProvider }                   from './context/AuthContext';
import AppRouter                          from './AppRouter';

/**
 * AuthBridge lives inside EmployeeProvider so it can read `employees`
 * and pass them into AuthProvider (which needs them for login validation).
 * This avoids a circular import between the two context files.
 */
function AuthBridge({ children }) {
  const { employees } = useEmployees();
  return <AuthProvider employees={employees}>{children}</AuthProvider>;
}

export default function App() {
  return (
    <EmployeeProvider>
      <AuthBridge>
        <AppRouter />
      </AuthBridge>
    </EmployeeProvider>
  );
}
