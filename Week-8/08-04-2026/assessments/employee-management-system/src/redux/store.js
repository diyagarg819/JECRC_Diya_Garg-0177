import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slices/employeeSlice';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

// ─── Logger Middleware ───────────────────────────────────────────
// Logs every dispatched action and state changes to the console
const loggerMiddleware = (store) => (next) => (action) => {
  console.group(`%c Redux Action: ${action.type}`, 'color: #6366f1; font-weight: bold;');
  console.log('%c Previous State:', 'color: #9ca3af;', store.getState());
  console.log('%c Action Payload:', 'color: #f59e0b;', action.payload);
  const result = next(action);
  console.log('%c Next State:', 'color: #10b981;', store.getState());
  console.groupEnd();
  return result;
};

// ─── localStorage Persistence ────────────────────────────────────
// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('employeeAppState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      employees: state.employees,
      auth: state.auth,
      ui: { theme: state.ui.theme }, // persist only theme
    });
    localStorage.setItem('employeeAppState', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

const preloadedState = loadState();

// ─── Store Configuration ─────────────────────────────────────────
// Single source of truth for the entire application state
const store = configureStore({
  reducer: {
    employees: employeeReducer,
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
  preloadedState,
});

// Subscribe to store changes and persist to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
