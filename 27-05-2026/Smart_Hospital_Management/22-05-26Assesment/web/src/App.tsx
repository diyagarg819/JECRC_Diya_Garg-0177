import { FormEvent, useEffect, useMemo, useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { DashboardData, getJson, postJson, Session } from './lib/api';
import { checkSymptoms } from './lib/symptomChecker';
import { LoginPanel } from './components/LoginPanel';
import { MetricCard } from './components/MetricCard';

type Appointment = {
  id: string;
  patientId: string;
  doctorId: string;
  branchId: string;
  startsAt: string;
  isVideoConsultation: boolean;
  status: string;
  reason: string;
};

type EmergencyCase = {
  id: string;
  patientName: string;
  severity: string | number;
  location: string;
  status: string;
  reportedAt: string;
};

type Patient = {
  id: string;
  fullName: string;
  email: string;
};

type Prescription = {
  id: string;
  medications: string[];
  notes: string;
  issuedAt: string;
};

type LabReport = {
  id: string;
  testName: string;
  status: string;
  resultSummary?: string;
};

type Invoice = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  insuranceClaimStatus: string;
};

type PharmacyItem = {
  id: string;
  name: string;
  category: string;
  stockOnHand: number;
  reorderLevel: number;
};

type TelemedicineSession = {
  id: string;
  appointmentId: string;
  provider: string;
  roomUrl: string;
  startsAt: string;
};

type RealtimeState = 'offline' | 'connecting' | 'reconnecting' | 'connected';

const initialDashboard: DashboardData = {
  registeredPatients: 0,
  doctors: 0,
  appointmentsToday: 0,
  emergencyOpenCases: 0,
  pendingInvoices: 0,
  videoConsultations: 0,
  branchLoad: []
};

function toSeverityLabel(severity: string | number): string {
  if (typeof severity === 'string') {
    return severity;
  }

  switch (severity) {
    case 0:
      return 'Low';
    case 1:
      return 'Medium';
    case 2:
      return 'High';
    case 3:
      return 'Critical';
    default:
      return String(severity);
  }
}

function toSeverityClass(severity: string | number): string {
  return toSeverityLabel(severity).toLowerCase();
}

function toRealtimeLabel(state: RealtimeState): string {
  switch (state) {
    case 'connected':
      return 'Connected';
    case 'connecting':
      return 'Connecting';
    case 'reconnecting':
      return 'Reconnecting';
    default:
      return 'Offline';
  }
}

export function App() {
  const [session, setSession] = useState<Session | null>(() => {
    const stored = localStorage.getItem('hospital.session');
    return stored ? JSON.parse(stored) : null;
  });
  const [dashboard, setDashboard] = useState<DashboardData>(initialDashboard);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [emergencies, setEmergencies] = useState<EmergencyCase[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [labReports, setLabReports] = useState<LabReport[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [pharmacy, setPharmacy] = useState<PharmacyItem[]>([]);
  const [videoSessions, setVideoSessions] = useState<TelemedicineSession[]>([]);
  const [notification, setNotification] = useState('No realtime notifications yet.');
  const [realtimeState, setRealtimeState] = useState<RealtimeState>('offline');
  const [symptoms, setSymptoms] = useState('fever and cough');
  const [triage, setTriage] = useState(checkSymptoms(symptoms));
  const [bookingMessage, setBookingMessage] = useState('');

  const canSeeAdmin = session?.role === 'SuperAdmin' || session?.role === 'BranchAdmin';
  const isPatient = session?.role === 'Patient';

  useEffect(() => {
    if (!session) {
      return;
    }

    localStorage.setItem('hospital.session', JSON.stringify(session));

    async function loadRoleScopedData() {
      const patients = isPatient
        ? await getJson<Patient[]>('/api/patients', session!.accessToken)
        : [];
      const patientId = patients.at(0)?.id;
      const patientQuery = patientId ? `?patientId=${patientId}` : '';

      getJson<Appointment[]>(`/api/appointments${patientQuery}`, session!.accessToken).then(setAppointments);
      getJson<Prescription[]>(`/api/clinical/prescriptions${patientQuery}`, session!.accessToken).then(setPrescriptions);
      getJson<LabReport[]>(`/api/clinical/lab-reports${patientQuery}`, session!.accessToken).then(setLabReports);
      getJson<Invoice[]>(`/api/billing/invoices${patientQuery}`, session!.accessToken).then(setInvoices);
      getJson<TelemedicineSession[]>('/api/telemedicine/sessions', session!.accessToken).then(setVideoSessions);

      if (!isPatient) {
        getJson<EmergencyCase[]>('/api/emergency/cases', session!.accessToken).then(setEmergencies);
        getJson<PharmacyItem[]>('/api/pharmacy/inventory', session!.accessToken).then(setPharmacy);
      } else {
        setEmergencies([]);
        setPharmacy([]);
      }
    }

    loadRoleScopedData();

    if (canSeeAdmin) {
      getJson<DashboardData>('/api/admin/analytics', session.accessToken).then(setDashboard);
    }
  }, [session, canSeeAdmin, isPatient]);

  useEffect(() => {
    if (!session) {
      setRealtimeState('offline');
      return;
    }

    setRealtimeState('connecting');

    const connection = new HubConnectionBuilder()
      .withUrl('/hubs/hospital', { accessTokenFactory: () => session.accessToken })
      .configureLogging(LogLevel.None)
      .withAutomaticReconnect()
      .build();

    let isDisposed = false;

    connection.on('appointment.created', appointment => {
      setAppointments(current => (current.some(item => item.id === appointment.id) ? current : [appointment, ...current]));
      setNotification(`Appointment created for ${new Date(appointment.startsAt).toLocaleString()}`);
    });

    connection.on('emergency.reported', emergency => {
      setEmergencies(current => (current.some(item => item.id === emergency.id) ? current : [emergency, ...current]));
      setNotification(`Emergency reported: ${emergency.severity} at ${emergency.location}`);
    });

    connection.onreconnecting(() => {
      if (!isDisposed) {
        setRealtimeState('reconnecting');
        setNotification('Reconnecting to realtime updates...');
      }
    });

    connection.onreconnected(() => {
      if (!isDisposed) {
        setRealtimeState('connected');
        setNotification('Realtime updates restored.');
      }
    });

    connection.onclose(() => {
      if (!isDisposed) {
        setRealtimeState('offline');
      }
    });

    async function startRealtime() {
      const maxAttempts = 3;
      for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        try {
          await connection.start();
          if (isDisposed) {
            return;
          }
          await connection.invoke('JoinBranch', session.branchId ?? '11111111-1111-1111-1111-111111111111');
          setRealtimeState('connected');
          return;
        } catch {
          if (isDisposed) {
            return;
          }

          if (attempt < maxAttempts) {
            setRealtimeState('connecting');
            setNotification('Realtime connection retrying...');
            await new Promise(resolve => setTimeout(resolve, 500 * 2 ** attempt));
            continue;
          }

          setRealtimeState('offline');
          setNotification('Realtime updates are temporarily unavailable.');
        }
      }
    }

    startRealtime();

    return () => {
      isDisposed = true;
      connection.stop().catch(() => undefined);
    };
  }, [session]);

  const currentBranchLoad = useMemo(() => dashboard.branchLoad.at(0), [dashboard]);

  if (!session) {
    return <LoginPanel onLogin={setSession} />;
  }

  const consultationId = window.location.pathname.startsWith('/consultation/')
    ? window.location.pathname.split('/').at(-1)
    : null;

  if (consultationId) {
    const consultation = videoSessions.find(item => item.appointmentId === consultationId);
    return (
      <main className="consultation-room">
        <header className="topbar">
          <div>
            <p className="eyebrow">Telemedicine</p>
            <h1>Secure Video Consultation</h1>
          </div>
          <button onClick={() => window.history.back()}>Back</button>
        </header>
        <section className="video-stage">
          <div className="video-pane">
            <strong>{consultation?.provider ?? 'Secure video room'}</strong>
            <span>Camera preview</span>
          </div>
          <div className="video-pane secondary">
            <strong>Care team</strong>
            <span>Waiting for participant</span>
          </div>
        </section>
        <section className="call-controls">
          <button>Mute</button>
          <button>Camera</button>
          <button>Share report</button>
          <button className="danger-button" onClick={() => window.history.back()}>End call</button>
        </section>
      </main>
    );
  }

  function logout() {
    localStorage.removeItem('hospital.session');
    setSession(null);
  }

  async function createDemoBooking(event: FormEvent) {
    event.preventDefault();
    setBookingMessage('');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);

    try {
      const created = await postJson<Appointment>('/api/appointments', session!.accessToken, {
        patientId: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        doctorId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        branchId: '11111111-1111-1111-1111-111111111111',
        startsAt: tomorrow.toISOString(),
        durationMinutes: 30,
        isVideoConsultation: true,
        reason: 'Online follow-up consultation'
      });
      setAppointments(current => (current.some(item => item.id === created.id) ? current : [created, ...current]));
      setBookingMessage('Appointment booked.');
    } catch (error) {
      setBookingMessage(error instanceof Error ? error.message : 'Booking failed');
    }
  }

  async function runSymptomCheck() {
    try {
      const result = await postJson<{ level: string; recommendation: string }>('/api/telemedicine/symptom-check', session!.accessToken, { symptoms });
      setTriage(`${result.level}: ${result.recommendation}`);
    } catch {
      setTriage(checkSymptoms(symptoms));
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Central Hospital Platform</p>
          <h1>{session.role} Dashboard</h1>
        </div>
        <div className="user-chip">
          <span>{session.fullName}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <section className="alert-band">
        <span className={`realtime-badge ${realtimeState}`}>{toRealtimeLabel(realtimeState)}</span>
        <strong>Realtime:</strong> {notification}
      </section>

      {canSeeAdmin && (
        <section className="metrics-grid">
          <MetricCard label="Patients" value={dashboard.registeredPatients} />
          <MetricCard label="Doctors" value={dashboard.doctors} />
          <MetricCard label="Appointments today" value={dashboard.appointmentsToday} />
          <MetricCard label="Video consults" value={dashboard.videoConsultations} />
          <MetricCard label="Pending invoices" value={dashboard.pendingInvoices} />
          <MetricCard label="Open emergencies" value={dashboard.emergencyOpenCases} tone="danger" />
        </section>
      )}

      <section className="layout-grid">
        <article className="panel">
          <div className="panel-heading">
            <h2>Appointment Scheduler</h2>
            <form onSubmit={createDemoBooking}>
              <button type="submit">Book demo video consult</button>
            </form>
          </div>
          {bookingMessage && <p className="notice">{bookingMessage}</p>}
          <div className="table-list">
            {appointments.map(appointment => (
              <div key={appointment.id} className="list-row">
                <div>
                  <strong>{new Date(appointment.startsAt).toLocaleString()}</strong>
                  <span>{appointment.reason}</span>
                </div>
                <span className="pill">{appointment.status}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <h2>AI Symptom Checker</h2>
          <textarea value={symptoms} onChange={(event: any) => setSymptoms(event.target.value)} />
          <button onClick={runSymptomCheck}>Check symptoms</button>
          <p className="triage">{triage}</p>
        </article>

        <article className="panel">
          <h2>Emergency Tracking</h2>
          <div className="table-list">
            {emergencies.map(item => (
              <div key={item.id} className="list-row">
                <div>
                  <strong>{item.patientName}</strong>
                  <span>{item.location}</span>
                </div>
                <span className={`pill severity-${toSeverityClass(item.severity)}`}>{toSeverityLabel(item.severity)}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <h2>Branch Operations</h2>
          {currentBranchLoad ? (
            <div className="branch-load">
              <strong>{currentBranchLoad.name}</strong>
              <span>{currentBranchLoad.upcomingAppointments} upcoming appointments</span>
              <span>{currentBranchLoad.activeEmergencies} active emergencies</span>
            </div>
          ) : (
            <p className="muted">Branch analytics are available to branch admins and super admins.</p>
          )}
        </article>

        <article className="panel">
          <h2>Lab & Prescriptions</h2>
          <div className="table-list">
            {labReports.slice(0, 3).map(report => (
              <div key={report.id} className="list-row">
                <div>
                  <strong>{report.testName}</strong>
                  <span>{report.resultSummary ?? 'Awaiting result summary'}</span>
                </div>
                <span className="pill">{report.status}</span>
              </div>
            ))}
            {prescriptions.slice(0, 2).map(prescription => (
              <div key={prescription.id} className="list-row">
                <div>
                  <strong>{prescription.medications.join(', ')}</strong>
                  <span>{prescription.notes}</span>
                </div>
                <span className="pill">Rx</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <h2>Billing & Insurance</h2>
          <div className="table-list">
            {invoices.map(invoice => (
              <div key={invoice.id} className="list-row">
                <div>
                  <strong>
                    {invoice.currency} {invoice.amount}
                  </strong>
                  <span>Insurance: {invoice.insuranceClaimStatus}</span>
                </div>
                <span className="pill">{invoice.status}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <h2>Pharmacy</h2>
          <div className="table-list">
            {pharmacy.map(item => (
              <div key={item.id} className="list-row">
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.category}</span>
                </div>
                <span className={item.stockOnHand <= item.reorderLevel ? 'pill severity-high' : 'pill'}>
                  {item.stockOnHand} in stock
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <h2>Telemedicine</h2>
          <div className="table-list">
            {videoSessions.map(sessionItem => (
              <div key={sessionItem.id} className="list-row">
                <div>
                  <strong>{sessionItem.provider}</strong>
                  <span>{new Date(sessionItem.startsAt).toLocaleString()}</span>
                </div>
                <a className="action-link" href={sessionItem.roomUrl}>
                  Join
                </a>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
