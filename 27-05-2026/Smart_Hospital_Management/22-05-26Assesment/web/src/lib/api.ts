export type Role =
  | 'Patient'
  | 'Doctor'
  | 'Nurse'
  | 'Pharmacist'
  | 'LabTechnician'
  | 'BillingOfficer'
  | 'BranchAdmin'
  | 'SuperAdmin';

export type Session = {
  accessToken: string;
  fullName: string;
  email: string;
  role: Role;
  branchId?: string;
};

export type DashboardData = {
  registeredPatients: number;
  doctors: number;
  appointmentsToday: number;
  emergencyOpenCases: number;
  pendingInvoices: number;
  videoConsultations: number;
  branchLoad: Array<{ id: string; name: string; activeEmergencies: number; upcomingAppointments: number }>;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export async function login(email: string, password: string): Promise<Session> {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  return response.json();
}

export async function getJson<T>(path: string, token: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export async function postJson<T>(path: string, token: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const error = await response.text();
    let message = error;
    try {
      const parsed = JSON.parse(error) as { message?: string };
      message = parsed.message || message;
    } catch {
      message = error;
    }
    throw new Error(message || `Request failed: ${response.status}`);
  }

  return response.json();
}
