import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';

const AuthContext = createContext(null);

// Demo users for login
const DEMO_USERS = [
  { id: 1, username: 'admin', password: 'admin123', name: 'Diya Garg', role: 'Admin', avatar: 'PS', department: 'Management' },
  { id: 2, username: 'employee', password: 'emp123', name: 'Rahul Verma', role: 'Employee', avatar: 'RV', department: 'Engineering' },
  { id: 3, username: 'manager', password: 'mgr123', name: 'Anjali Gupta', role: 'Manager', avatar: 'AG', department: 'HR' },
];

// Action types
const AUTH_ACTIONS = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  loginTime: null,
};

// Reducer
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
        loginTime: new Date().toISOString(),
      };
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload,
      };
    case AUTH_ACTIONS.LOGOUT:
      return { ...initialState };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}

// Provider component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback((username, password) => {
    const user = DEMO_USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: userWithoutPassword });
      return true;
    } else {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: 'Invalid username or password' });
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  }, []);

  const value = useMemo(() => ({
    ...state,
    login,
    logout,
    clearError,
  }), [state, login, logout, clearError]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
