# Employee Management System - Redux Documentation

This document provides a descriptive explanation of Redux as required by the assignment tasks.

## Task 1: What is Redux & When to Use It
**Redux** is a predictable state container for JavaScript applications. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.

### Why Use Redux?
- **Predictable State:** State changes are predictable because every update is handled by pure functions called reducers.
- **Large-Scale Applications:** As apps grow, passing data through multiple layers of components (prop drilling) becomes unmanageable. Redux provides a centralized "Store".
- **Complex Global State:** Ideal for data that needs to be accessed by many unrelated components (e.g., User Authentication, Theme, Shared Data).

### When NOT to Use Redux:
- **Small Applications:** If your app is simple and state is locally contained, `useState` or `useContext` is often sufficient.
- **Simple State:** If data doesn't need to be shared across many branches of the component tree, Redux adds unnecessary boilerplate.

---

## Task 2: Store, Actions, Reducers
### 1. Store
The **Store** is the single source of truth for the entire application. It holds the application's state tree. Instead of having state scattered across components, everything lives in one place.

### 2. Actions
**Actions** are plain JavaScript objects that describe *what happened* in the application. They must have a `type` property (a string) and can optionally carry a `payload` (data).
Example: `{ type: 'employees/addEmployee', payload: { name: 'John' } }`

### 3. Reducers
**Reducers** are pure functions that take the current `state` and an `action` as arguments and return a **new state**. They decide *how* the state should change in response to an action.
Example: `(state, action) => { if (action.type === 'increment') return state + 1; }`

---

## Task 3: Immutable State Principle
In Redux, **state is read-only**. You never mutate the state directly (e.g., `state.user = 'new name'` is forbidden).

### Why Immutability?
- **Predictability:** Since state never changes in place, you can always know exactly what the state was at any point in time.
- **Change Detection:** React can quickly check if the state has changed by comparing object references (`oldState === newState`). If you mutate, the reference stays the same, and React might not re-render.
- **Undo/Redo (Time Travel):** Immutability allows features like "undo" or "time-travel debugging" because previous versions of the state are preserved.

---

## Task 4: Redux Data Flow Cycle
Redux follows a **unidirectional data flow**:
1. **Component Dispatches Action:** A user clicks a button, triggering `dispatch(action)`.
2. **Action goes to Reducer:** The Store sends the current state and the action to the Root Reducer.
3. **Reducer Updates State:** The reducer returns a NEW state object based on the action.
4. **Store Updates:** The Store saves the new state.
5. **UI Re-renders:** All components subscribed to the Store receive the update and re-render with the new data.

---

## Task 5: Small Reducer Example
```javascript
const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}
```

---

## Task 6: Optimizing with Memoization (createSelector)
When a selector returns a new reference (like a new array from `.filter()`), it causes components to re-render even if the data hasn't changed.

### Why Memoize?
- **Performance:** Prevents expensive re-calculations on every state change.
- **Reference Equality:** `createSelector` ensures that if the input parameters haven't changed, the same reference is returned, preventing unnecessary React re-renders.
- **Enterprise Ready:** Essential for large-scale applications with frequent state updates.
