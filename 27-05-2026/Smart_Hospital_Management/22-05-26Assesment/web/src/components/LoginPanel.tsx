import { FormEvent, useState } from 'react';
import { login, Session } from '../lib/api';

type Props = {
  onLogin: (session: Session) => void;
};

export function LoginPanel({ onLogin }: Props) {
  const [email, setEmail] = useState('admin@hospital.local');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');
    try {
      onLogin(await login(email, password));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  }

  return (
    <main className="login-shell">
      <section className="login-panel">
        <div>
          <p className="eyebrow">Multi-branch hospital platform</p>
          <h1>Central Hospital Platform</h1>
          <p className="muted">Use seeded accounts: admin@hospital.local, doctor@hospital.local, patient@hospital.local.</p>
        </div>
        <form onSubmit={submit} className="form-stack">
          <label>
            Email
            <input value={email} onChange={(event: any) => setEmail(event.target.value)} />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(event: any) => setPassword(event.target.value)} />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit">Sign in</button>
        </form>
      </section>
    </main>
  );
}
