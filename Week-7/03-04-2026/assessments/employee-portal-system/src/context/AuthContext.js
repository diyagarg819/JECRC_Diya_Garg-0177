import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

/**
 * AuthProvider receives `employees` as a prop (passed down from App.js)
 * so there is no circular dependency with EmployeeContext.
 */
export function AuthProvider({ employees, children }) {
  const [user, setUser] = useState(null);

  const login = useCallback(
    (username, password) => {
      const found = employees.find(
        (e) => e.username === username && e.password === password
      );
      if (found) { setUser(found); return { success: true }; }
      return { success: false };
    },
    [employees]
  );

  /** Sync session when admin edits the currently-logged-in user's record. */
  const syncUser = useCallback(
    (updatedEmployees) => {
      if (!user) return;
      const refreshed = updatedEmployees.find((e) => e.id === user.id);
      if (refreshed) setUser(refreshed);
    },
    [user]
  );

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, logout, syncUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
