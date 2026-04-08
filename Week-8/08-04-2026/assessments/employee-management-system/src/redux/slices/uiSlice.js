import { createSlice } from '@reduxjs/toolkit';

/*
  ──────────────────────────────────────────────────────────
  UI Slice — Global UI State
  ──────────────────────────────────────────────────────────
  Manages application-wide UI state:
    • Theme (dark / light)
    • Loading indicators
    • Sidebar collapse
    • Notification messages
  ──────────────────────────────────────────────────────────
*/

const initialState = {
  theme: 'dark',
  isLoading: false,
  sidebarCollapsed: false,
  notification: null, // { type: 'success' | 'error' | 'info', message: '' }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    showNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  setLoading,
  toggleSidebar,
  showNotification,
  clearNotification,
} = uiSlice.actions;

export default uiSlice.reducer;
