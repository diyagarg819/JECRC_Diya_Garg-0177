// ─── Initial seed data ────────────────────────────────────────────────────────
export const SEED_EMPLOYEES = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@corp.io',
    dept: 'HR',
    position: 'HR Director',
    salary: 95000,
    joined: '2019-03-15',
    phone: '+1 (415) 555-0101',
    location: 'San Francisco, CA',
  },
  {
    id: 2,
    username: 'john',
    password: 'john123',
    role: 'employee',
    name: 'John Harrington',
    email: 'john.h@corp.io',
    dept: 'Engineering',
    position: 'Senior Developer',
    salary: 92000,
    joined: '2021-07-01',
    phone: '+1 (415) 555-0202',
    location: 'Austin, TX',
  },
  {
    id: 3,
    username: 'priya',
    password: 'priya123',
    role: 'employee',
    name: 'Priya Kapoor',
    email: 'priya.k@corp.io',
    dept: 'Design',
    position: 'UX Lead',
    salary: 84000,
    joined: '2020-11-20',
    phone: '+1 (415) 555-0303',
    location: 'New York, NY',
  },
  {
    id: 4,
    username: 'marcus',
    password: 'marcus123',
    role: 'employee',
    name: 'Marcus Osei',
    email: 'marcus.o@corp.io',
    dept: 'Marketing',
    position: 'Brand Manager',
    salary: 74000,
    joined: '2022-01-10',
    phone: '+1 (415) 555-0404',
    location: 'Chicago, IL',
  },
  {
    id: 5,
    username: 'elena',
    password: 'elena123',
    role: 'employee',
    name: 'Elena Vasquez',
    email: 'elena.v@corp.io',
    dept: 'Finance',
    position: 'Financial Analyst',
    salary: 78000,
    joined: '2021-04-05',
    phone: '+1 (415) 555-0505',
    location: 'Miami, FL',
  },
  {
    id: 6,
    username: 'david',
    password: 'david123',
    role: 'employee',
    name: 'David Chen',
    email: 'david.c@corp.io',
    dept: 'Engineering',
    position: 'DevOps Engineer',
    salary: 88000,
    joined: '2020-06-15',
    phone: '+1 (415) 555-0606',
    location: 'Seattle, WA',
  },
];

// ─── Departments ──────────────────────────────────────────────────────────────
export const DEPARTMENTS = [
  'Engineering',
  'Design',
  'Marketing',
  'HR',
  'Finance',
  'Sales',
  'Operations',
  'Legal',
];

// ─── Color maps ───────────────────────────────────────────────────────────────
export const DEPT_COLORS = {
  Engineering: { bg: 'rgba(59,130,246,0.12)',  text: '#60a5fa' },
  Design:      { bg: 'rgba(167,139,250,0.12)', text: '#a78bfa' },
  Marketing:   { bg: 'rgba(52,211,153,0.12)',  text: '#34d399' },
  HR:          { bg: 'rgba(251,191,36,0.12)',  text: '#fbbf24' },
  Finance:     { bg: 'rgba(251,113,133,0.12)', text: '#fb7185' },
  Sales:       { bg: 'rgba(99,102,241,0.12)',  text: '#818cf8' },
  Operations:  { bg: 'rgba(20,184,166,0.12)',  text: '#2dd4bf' },
  Legal:       { bg: 'rgba(245,158,11,0.12)',  text: '#f59e0b' },
};

export const ROLE_COLORS = {
  admin:    { bg: 'rgba(251,191,36,0.12)',  text: '#fbbf24' },
  employee: { bg: 'rgba(52,211,153,0.12)',  text: '#34d399' },
};

export const AVATAR_PALETTE = [
  '#5c6ee8', '#7c3aed', '#0891b2', '#059669',
  '#d97706', '#dc2626', '#9333ea', '#0369a1',
  '#065f46', '#92400e',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export const getAvatarBg   = (id) => AVATAR_PALETTE[(id || 0) % AVATAR_PALETTE.length];
export const getDeptColor  = (dept) => DEPT_COLORS[dept] || { bg: 'rgba(113,113,122,0.12)', text: '#a1a1aa' };
export const getRoleColor  = (role) => ROLE_COLORS[role] || ROLE_COLORS.employee;
export const getInitials   = (name = '') =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
export const formatSalary  = (n) => '$' + Number(n).toLocaleString();
export const formatDate    = (d) => {
  if (!d) return '—';
  try { return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }); }
  catch { return d; }
};
