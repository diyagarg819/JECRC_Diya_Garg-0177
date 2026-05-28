// src/app/modules/auth/login/login.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <div class="login-card">
        <div class="login-brand">
          <span class="brand-icon">🚚</span>
          <h1>LogiTrack</h1>
          <p>Logistics & Supply Chain Management</p>
        </div>

        <div class="login-form">
          <h2>Sign In</h2>

          <div class="form-group">
            <label>Email</label>
            <input [(ngModel)]="email" type="email" class="form-input" placeholder="admin@logitrack.com" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input [(ngModel)]="password" type="password" class="form-input" placeholder="••••••••" (keyup.enter)="login()" />
          </div>

          <div class="error-msg" *ngIf="error()">{{ error() }}</div>

          <button class="btn-login" (click)="login()" [disabled]="loading()">
            {{ loading() ? 'Signing in...' : 'Sign In' }}
          </button>

          <div class="demo-creds">
            <span>Demo credentials:</span>
            <code>admin@logitrack.com / admin123</code>
          </div>
        </div>
      </div>

      <div class="login-bg">
        <div class="bg-stat"><span>2,367</span>Active Shipments</div>
        <div class="bg-stat"><span>96</span>Fleet Vehicles</div>
        <div class="bg-stat"><span>94.2%</span>On-Time Delivery</div>
      </div>
    </div>
  `,
  styles: [`
    .login-page { min-height: 100vh; display: grid; grid-template-columns: 480px 1fr; font-family: 'Inter', sans-serif; }

    .login-card { background: white; padding: 48px; display: flex; flex-direction: column; justify-content: center; }
    .login-brand { text-align: center; margin-bottom: 40px; }
    .brand-icon { font-size: 48px; }
    .login-brand h1 { font-size: 28px; font-weight: 700; color: #0f172a; margin: 8px 0 4px; }
    .login-brand p { color: #64748b; font-size: 14px; margin: 0; }
    .login-form h2 { font-size: 22px; font-weight: 700; margin: 0 0 24px; color: #0f172a; }

    .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
    .form-group label { font-size: 13px; font-weight: 600; color: #374151; }
    .form-input { border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 12px 14px; font-size: 15px; outline: none; transition: border-color 0.2s; }
    .form-input:focus { border-color: #3b82f6; }

    .error-msg { background: #fef2f2; color: #dc2626; border-radius: 8px; padding: 10px 14px; font-size: 14px; margin-bottom: 12px; }

    .btn-login { width: 100%; background: #1d4ed8; color: white; border: none; padding: 14px; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s; margin-top: 4px; }
    .btn-login:hover { background: #1e40af; }
    .btn-login:disabled { opacity: 0.6; cursor: not-allowed; }

    .demo-creds { margin-top: 16px; text-align: center; font-size: 13px; color: #94a3b8; }
    .demo-creds code { display: block; margin-top: 4px; background: #f8fafc; padding: 6px 12px; border-radius: 6px; color: #374151; }

    .login-bg { background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 32px; }
    .bg-stat { text-align: center; color: white; }
    .bg-stat span { display: block; font-size: 48px; font-weight: 700; color: #60a5fa; margin-bottom: 4px; }
    .bg-stat { font-size: 16px; color: #94a3b8; }
  `]
})
export class LoginComponent {
  private router = inject(Router);
  email = 'admin@logitrack.com';
  password = 'admin123';
  loading = signal(false);
  error = signal('');

  login() {
    this.loading.set(true);
    this.error.set('');
    // For demo: skip real auth, just navigate
    setTimeout(() => {
      if (this.email && this.password) {
        localStorage.setItem('token', 'demo-token');
        this.router.navigate(['/dashboard']);
      } else {
        this.error.set('Please enter email and password');
        this.loading.set(false);
      }
    }, 800);
  }
}
