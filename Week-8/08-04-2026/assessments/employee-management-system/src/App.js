import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import LoadingSpinner from './components/LoadingSpinner';
import Notification from './components/Notification';

/*
  ══════════════════════════════════════════════════════════════
  APP COMPONENT — Root of the React + Redux Application
  ══════════════════════════════════════════════════════════════

  ┌─────────────────────────────────────────────────────────┐
  │  WHAT IS REDUX & WHEN TO USE IT                         │
  ├─────────────────────────────────────────────────────────┤
  │                                                         │
  │  Redux is a PREDICTABLE STATE CONTAINER for JavaScript  │
  │  applications. It provides a centralized store that     │
  │  holds the entire application state, making it easier   │
  │  to manage, debug, and test.                            │
  │                                                         │
  │  USE REDUX WHEN:                                        │
  │  ✓ Large-scale applications with complex state          │
  │  ✓ Multiple components need access to shared state      │
  │  ✓ State needs to be predictable and traceable          │
  │  ✓ Team collaboration requires clear state patterns     │
  │  ✓ You need middleware (logging, async, etc.)           │
  │  ✓ Time-travel debugging is valuable                    │
  │                                                         │
  │  DON'T USE REDUX WHEN:                                  │
  │  ✗ Small apps with simple, local state                  │
  │  ✗ State is only used by one or two components          │
  │  ✗ React's useState/useContext is sufficient            │
  │  ✗ Overhead of boilerplate outweighs benefits           │
  │                                                         │
  └─────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │  REDUX DATA FLOW CYCLE                                  │
  ├─────────────────────────────────────────────────────────┤
  │                                                         │
  │    ┌──────────┐   dispatch()   ┌──────────┐            │
  │    │   VIEW   │ ──────────────>│  ACTION  │            │
  │    │ (React)  │                │ (Object) │            │
  │    └──────────┘                └──────────┘            │
  │         ▲                           │                   │
  │         │                           ▼                   │
  │    ┌──────────┐                ┌──────────┐            │
  │    │  STORE   │<───────────────│ REDUCER  │            │
  │    │ (State)  │   new state    │ (Pure fn)│            │
  │    └──────────┘                └──────────┘            │
  │                                                         │
  │  1. Component dispatches an action                      │
  │  2. Action goes to the reducer                          │
  │  3. Reducer computes new state (immutably)              │
  │  4. Store updates with new state                        │
  │  5. React UI re-renders with new data                   │
  │                                                         │
  └─────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │  STORE, ACTIONS, REDUCERS                               │
  ├─────────────────────────────────────────────────────────┤
  │                                                         │
  │  STORE (src/redux/store.js):                            │
  │    → Single source of truth for application state       │
  │    → Created with configureStore from Redux Toolkit     │
  │    → Contains: employees, auth, ui slices               │
  │                                                         │
  │  ACTIONS (in each slice):                               │
  │    → Plain JavaScript objects with { type, payload }    │
  │    → Describe WHAT happened (not HOW to update state)   │
  │    → e.g., { type: 'employees/addEmployee',            │
  │              payload: { name: 'John', ... } }           │
  │                                                         │
  │  REDUCERS (in each slice):                              │
  │    → Pure functions: (state, action) => newState        │
  │    → Decide HOW to update state based on action type    │
  │    → Must return NEW state objects (immutability)        │
  │    → Redux Toolkit uses Immer for easier syntax         │
  │                                                         │
  └─────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │  IMMUTABLE STATE PRINCIPLE                              │
  ├─────────────────────────────────────────────────────────┤
  │                                                         │
  │  WHY NOT MUTATE STATE?                                  │
  │  • Redux relies on reference equality checks            │
  │  • Mutations break change detection → UI won't update   │
  │  • Makes debugging impossible (no history)              │
  │  • Breaks time-travel debugging and DevTools            │
  │                                                         │
  │  WRONG: state.list.push(newItem)  // mutates!           │
  │  RIGHT: return [...state.list, newItem]  // new array   │
  │                                                         │
  │  Redux Toolkit uses Immer internally, allowing          │
  │  "mutating" syntax that actually produces immutable     │
  │  updates under the hood. This is a major DX win.        │
  │                                                         │
  └─────────────────────────────────────────────────────────┘

  This application demonstrates all the above concepts:
    - Employee CRUD → employeeSlice (Add, Edit, Delete)
    - Auth state    → authSlice (Login, Logout)
    - UI state      → uiSlice (Theme, Loading, Sidebar)
    - Middleware     → Logger middleware in store.js
    - Persistence   → localStorage save/load in store.js
*/

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const theme = useSelector((state) => state.ui.theme);

  // Synchronize theme with body element for global background styling
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app-main-wrapper" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', transition: 'background-color 0.3s' }}>
      <LoadingSpinner />
      <Notification />
      {isAuthenticated ? <Dashboard /> : <LoginPage />}
    </div>
  );
}

export default App;
