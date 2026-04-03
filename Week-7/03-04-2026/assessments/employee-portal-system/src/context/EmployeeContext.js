import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';
import { SEED_EMPLOYEES, getInitials } from '../utils/data';

// ─── Reducer ──────────────────────────────────────────────────────────────────
let nextId = SEED_EMPLOYEES.length + 1;

function employeeReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const emp = {
        ...action.payload,
        id: nextId++,
        salary: Number(action.payload.salary),
      };
      return [...state, emp];
    }
    case 'UPDATE': {
      return state.map((e) =>
        e.id === action.payload.id
          ? { ...e, ...action.payload, salary: Number(action.payload.salary) }
          : e
      );
    }
    case 'DELETE': {
      return state.filter((e) => e.id !== action.payload);
    }
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const EmployeeContext = createContext(null);

export function EmployeeProvider({ children }) {
  const [employees, dispatch] = useReducer(employeeReducer, SEED_EMPLOYEES);

  const addEmployee = useCallback((data) => {
    dispatch({ type: 'ADD', payload: data });
  }, []);

  const updateEmployee = useCallback((data) => {
    dispatch({ type: 'UPDATE', payload: data });
  }, []);

  const deleteEmployee = useCallback((id) => {
    dispatch({ type: 'DELETE', payload: id });
  }, []);

  const getEmployeeById = useCallback(
    (id) => employees.find((e) => e.id === id) || null,
    [employees]
  );

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, updateEmployee, deleteEmployee, getEmployeeById }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  const ctx = useContext(EmployeeContext);
  if (!ctx) throw new Error('useEmployees must be used within EmployeeProvider');
  return ctx;
}
