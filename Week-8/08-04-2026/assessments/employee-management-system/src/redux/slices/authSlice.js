import { createSlice } from '@reduxjs/toolkit';

/*
  ──────────────────────────────────────────────────────────
  Auth Slice — Login / Logout State Management
  ──────────────────────────────────────────────────────────
  Manages user authentication state globally via Redux.
  
  Actions:
    • login  → Sets user data + isAuthenticated = true
    • logout → Clears user data + isAuthenticated = false
  ──────────────────────────────────────────────────────────
*/

const initialState = {
  isAuthenticated: false,
  user: null,
  loginError: null,
};

// Simulated user database
const MOCK_USERS = [
  { username: 'admin', password: 'admin123', name: 'Admin User', role: 'Administrator', avatar: '' },
  { username: 'manager', password: 'manager123', name: 'Project Manager', role: 'Manager', avatar: '' },
  { username: 'hr', password: 'hr123', name: 'HR Executive', role: 'HR', avatar: '' },
];

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const user = MOCK_USERS.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        state.isAuthenticated = true;
        state.user = { username: user.username, name: user.name, role: user.role, avatar: user.avatar };
        state.loginError = null;
      } else {
        state.isAuthenticated = false;
        state.user = null;
        state.loginError = 'Invalid username or password';
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loginError = null;
    },
    clearError: (state) => {
      state.loginError = null;
    },
  },
});

export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
