import { createSlice, createSelector } from '@reduxjs/toolkit';

/*
  ──────────────────────────────────────────────────────────
  Employee Slice — Redux Toolkit (createSlice)
  ──────────────────────────────────────────────────────────
  
  Core Redux Concepts Demonstrated:
  
  ▸ Store  → Single source of truth. All employee data lives in one place.
  ▸ Actions → Plain JS objects describing what happened 
              (e.g., { type: 'employees/addEmployee', payload: {...} })
  ▸ Reducers → Pure functions that take current state + action 
               and return NEW state (never mutate directly).
  
  Immutable State Principle:
  Redux Toolkit uses Immer internally, so we can write "mutating" syntax 
  (state.push(...)) but under the hood it produces a new immutable state.
  This ensures:
    • Predictable state updates
    • Easy debugging with time-travel
    • Efficient change detection for React re-renders
  
  Redux Data Flow Cycle:
    1. Component dispatches action → dispatch(addEmployee(data))
    2. Action goes to reducer → employeeSlice handles it
    3. Reducer updates state → returns new state immutably
    4. Store updates → single source of truth is refreshed
    5. UI re-renders → React components reflect new state
  ──────────────────────────────────────────────────────────
*/

const initialState = {
  list: [
    {
      id: '1',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@company.com',
      department: 'Engineering',
      role: 'Senior Developer',
      salary: 95000,
      status: 'Active',
      joinDate: '2023-03-15',
      avatar: '',
    },
    {
      id: '2',
      name: 'Priya Patel',
      email: 'priya.patel@company.com',
      department: 'Design',
      role: 'UI/UX Lead',
      salary: 88000,
      status: 'Active',
      joinDate: '2022-08-01',
      avatar: '',
    },
    {
      id: '3',
      name: 'Rohan Gupta',
      email: 'rohan.gupta@company.com',
      department: 'Marketing',
      role: 'Marketing Manager',
      salary: 82000,
      status: 'Active',
      joinDate: '2023-01-20',
      avatar: '',
    },
    {
      id: '4',
      name: 'Sneha Reddy',
      email: 'sneha.reddy@company.com',
      department: 'HR',
      role: 'HR Specialist',
      salary: 72000,
      status: 'On Leave',
      joinDate: '2021-11-10',
      avatar: '',
    },
    {
      id: '5',
      name: 'Vikram Singh',
      email: 'vikram.singh@company.com',
      department: 'Engineering',
      role: 'DevOps Engineer',
      salary: 91000,
      status: 'Active',
      joinDate: '2022-05-22',
      avatar: '',
    },
  ],
  searchQuery: '',
  filterDepartment: 'All',
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    // ── Add Employee ─────────────────────────────────
    addEmployee: (state, action) => {
      // Immer lets us "push" – it produces a NEW array under the hood
      state.list.push({
        ...action.payload,
        id: Date.now().toString(),
      });
    },

    // ── Edit Employee ────────────────────────────────
    editEmployee: (state, action) => {
      const index = state.list.findIndex((emp) => emp.id === action.payload.id);
      if (index !== -1) {
        // Immer: looks like mutation, but creates new immutable state
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    },

    // ── Delete Employee ──────────────────────────────
    deleteEmployee: (state, action) => {
      // Filter returns a new array — immutable update pattern
      state.list = state.list.filter((emp) => emp.id !== action.payload);
    },

    // ── Search & Filter ──────────────────────────────
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilterDepartment: (state, action) => {
      state.filterDepartment = action.payload;
    },
  },
});

// Export action creators
export const {
  addEmployee,
  editEmployee,
  deleteEmployee,
  setSearchQuery,
  setFilterDepartment,
} = employeeSlice.actions;

// Selectors
const selectEmployeeList = (state) => state.employees.list;
const selectSearchQuery = (state) => state.employees.searchQuery;
const selectFilterDepartment = (state) => state.employees.filterDepartment;

/**
 * Memoized Selector: selectFilteredEmployees
 * Optimized to re-calculate only when the underlying data or filters change.
 */
export const selectFilteredEmployees = createSelector(
  [selectEmployeeList, selectSearchQuery, selectFilterDepartment],
  (list, searchQuery, filterDepartment) => {
    return list.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept =
        filterDepartment === 'All' || emp.department === filterDepartment;
      return matchesSearch && matchesDept;
    });
  }
);

/**
 * Memoized Selector: selectDepartments
 */
export const selectDepartments = createSelector(
  [selectEmployeeList],
  (list) => {
    const depts = [...new Set(list.map((emp) => emp.department))];
    return ['All', ...depts];
  }
);

/**
 * Memoized Selector: selectEmployeeStats
 * Calculates all dashboard metrics in one optimized selector.
 */
export const selectEmployeeStats = createSelector(
  [selectEmployeeList],
  (list) => {
    const totalEmployees = list.length;
    const activeCount = list.filter((e) => e.status === 'Active').length;
    const onLeaveCount = list.filter((e) => e.status === 'On Leave').length;
    const departmentsCount = [...new Set(list.map((e) => e.department))].length;
    const totalSalary = list.reduce((sum, e) => sum + (e.salary || 0), 0);
    const avgSalary = totalEmployees > 0 ? Math.round(totalSalary / totalEmployees) : 0;

    return {
      totalEmployees,
      activeCount,
      onLeaveCount,
      departmentsCount,
      totalSalary,
      avgSalary,
    };
  }
);

// Export reducer
export default employeeSlice.reducer;
