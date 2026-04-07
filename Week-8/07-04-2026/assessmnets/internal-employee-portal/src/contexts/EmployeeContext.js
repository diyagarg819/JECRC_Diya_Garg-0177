import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';

const EmployeeContext = createContext(null);

// Initial employee data
const initialEmployees = [
  { id: 1, name: 'Aarav Patel', email: 'aarav.patel@company.com', department: 'Engineering', position: 'Senior Developer', salary: 95000, status: 'Active', joinDate: '2022-03-15', phone: '+91 98765 43210' },
  { id: 2, name: 'Sneha Iyer', email: 'sneha.iyer@company.com', department: 'Design', position: 'UI/UX Lead', salary: 88000, status: 'Active', joinDate: '2021-07-20', phone: '+91 87654 32109' },
  { id: 3, name: 'Vikram Singh', email: 'vikram.singh@company.com', department: 'Marketing', position: 'Marketing Manager', salary: 82000, status: 'Active', joinDate: '2023-01-10', phone: '+91 76543 21098' },
  { id: 4, name: 'Meera Reddy', email: 'meera.reddy@company.com', department: 'HR', position: 'HR Specialist', salary: 72000, status: 'Active', joinDate: '2022-11-05', phone: '+91 65432 10987' },
  { id: 5, name: 'Arjun Nair', email: 'arjun.nair@company.com', department: 'Engineering', position: 'Full Stack Developer', salary: 90000, status: 'Active', joinDate: '2023-06-12', phone: '+91 54321 09876' },
  { id: 6, name: 'Kavya Sharma', email: 'kavya.sharma@company.com', department: 'Finance', position: 'Financial Analyst', salary: 78000, status: 'On Leave', joinDate: '2021-09-01', phone: '+91 43210 98765' },
  { id: 7, name: 'Rohan Mehta', email: 'rohan.mehta@company.com', department: 'Engineering', position: 'DevOps Engineer', salary: 92000, status: 'Active', joinDate: '2022-05-18', phone: '+91 32109 87654' },
  { id: 8, name: 'Divya Kapoor', email: 'divya.kapoor@company.com', department: 'Sales', position: 'Sales Executive', salary: 68000, status: 'Active', joinDate: '2023-02-28', phone: '+91 21098 76543' },
  { id: 9, name: 'Siddharth Das', email: 'siddharth.das@company.com', department: 'Engineering', position: 'Backend Developer', salary: 86000, status: 'Inactive', joinDate: '2020-12-15', phone: '+91 10987 65432' },
  { id: 10, name: 'Ananya Joshi', email: 'ananya.joshi@company.com', department: 'Design', position: 'Graphic Designer', salary: 70000, status: 'Active', joinDate: '2023-08-22', phone: '+91 09876 54321' },
];

// Action types
const EMP_ACTIONS = {
  ADD_EMPLOYEE: 'ADD_EMPLOYEE',
  UPDATE_EMPLOYEE: 'UPDATE_EMPLOYEE',
  DELETE_EMPLOYEE: 'DELETE_EMPLOYEE',
  SET_SEARCH: 'SET_SEARCH',
  SET_FILTER: 'SET_FILTER',
};

// Initial state
const initialState = {
  employees: initialEmployees,
  searchTerm: '',
  filterDepartment: 'All',
  filterStatus: 'All',
  nextId: 11,
};

// Reducer
function employeeReducer(state, action) {
  switch (action.type) {
    case EMP_ACTIONS.ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, { ...action.payload, id: state.nextId }],
        nextId: state.nextId + 1,
      };
    case EMP_ACTIONS.UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp.id === action.payload.id ? { ...emp, ...action.payload } : emp
        ),
      };
    case EMP_ACTIONS.DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter((emp) => emp.id !== action.payload),
      };
    case EMP_ACTIONS.SET_SEARCH:
      return { ...state, searchTerm: action.payload };
    case EMP_ACTIONS.SET_FILTER:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
}

// Provider
export function EmployeeProvider({ children }) {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  const addEmployee = useCallback((employee) => {
    dispatch({ type: EMP_ACTIONS.ADD_EMPLOYEE, payload: employee });
  }, []);

  const updateEmployee = useCallback((employee) => {
    dispatch({ type: EMP_ACTIONS.UPDATE_EMPLOYEE, payload: employee });
  }, []);

  const deleteEmployee = useCallback((id) => {
    dispatch({ type: EMP_ACTIONS.DELETE_EMPLOYEE, payload: id });
  }, []);

  const setSearchTerm = useCallback((term) => {
    dispatch({ type: EMP_ACTIONS.SET_SEARCH, payload: term });
  }, []);

  const setFilter = useCallback((key, value) => {
    dispatch({ type: EMP_ACTIONS.SET_FILTER, payload: { key, value } });
  }, []);

  // Filtered employees (derived state)
  const filteredEmployees = useMemo(() => {
    return state.employees.filter((emp) => {
      const matchSearch =
        emp.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        emp.position.toLowerCase().includes(state.searchTerm.toLowerCase());
      const matchDept = state.filterDepartment === 'All' || emp.department === state.filterDepartment;
      const matchStatus = state.filterStatus === 'All' || emp.status === state.filterStatus;
      return matchSearch && matchDept && matchStatus;
    });
  }, [state.employees, state.searchTerm, state.filterDepartment, state.filterStatus]);

  // Department stats (derived state)
  const departmentStats = useMemo(() => {
    const stats = {};
    state.employees.forEach((emp) => {
      if (!stats[emp.department]) {
        stats[emp.department] = { count: 0, totalSalary: 0 };
      }
      stats[emp.department].count += 1;
      stats[emp.department].totalSalary += emp.salary;
    });
    return stats;
  }, [state.employees]);

  const departments = useMemo(() => {
    return ['All', ...new Set(state.employees.map((e) => e.department))];
  }, [state.employees]);

  const value = useMemo(() => ({
    employees: state.employees,
    filteredEmployees,
    searchTerm: state.searchTerm,
    filterDepartment: state.filterDepartment,
    filterStatus: state.filterStatus,
    departmentStats,
    departments,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    setSearchTerm,
    setFilter,
  }), [state, filteredEmployees, departmentStats, departments, addEmployee, updateEmployee, deleteEmployee, setSearchTerm, setFilter]);

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
}

export default EmployeeContext;
