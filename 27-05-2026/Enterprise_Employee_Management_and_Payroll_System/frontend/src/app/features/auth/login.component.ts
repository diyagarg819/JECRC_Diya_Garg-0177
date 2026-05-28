import { Component, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../core/services/auth.service';
import { TenantService } from '../../core/services/tenant.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="h-screen w-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      <!-- Glow ambient background shapes -->
      <div class="absolute -top-40 -left-40 h-[600px] w-[600px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="absolute -bottom-40 -right-40 h-[600px] w-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="w-full max-w-md p-8 glass rounded-3xl shadow-2xl relative z-10 animate-fade-in border border-slate-800">
        <!-- Logo -->
        <div class="flex flex-col items-center mb-8">
          <div class="h-14 w-14 rounded-2xl bg-brand-600/10 border border-brand-500/30 flex items-center justify-center text-brand-400 mb-3">
            <span class="material-icons text-3xl">hub</span>
          </div>
          <h2 class="text-2xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
            <span class="text-brand-400">CORE</span> HRMS
          </h2>
          <p class="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Generic Multi-Tenant Platform</p>
        </div>

        <!-- Form -->
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-5">
          <!-- Tenant ID -->
          <div>
            <label for="tenantSelect" class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Tenant Organization</label>
            <select id="tenantSelect" formControlName="tenantId"
                    class="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition-all cursor-pointer">
              @for (t of tenantService.tenants; track t.id) {
                <option [value]="t.id">{{ t.name }} ({{ t.countryCode }})</option>
              }
            </select>
          </div>

          <!-- Email -->
          <div>
            <label for="emailInput" class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
            <input id="emailInput" type="email" formControlName="email" placeholder="e.g. hr.admin&#64;capgemini.com"
                   class="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600" />
            <!-- Edge case: Show validation errors -->
            @if (loginForm.get('email')?.touched && loginForm.get('email')?.hasError('required')) {
              <p class="text-red-400 text-xs mt-1">Email is required.</p>
            }
            @if (loginForm.get('email')?.touched && loginForm.get('email')?.hasError('email')) {
              <p class="text-red-400 text-xs mt-1">Please enter a valid email address.</p>
            }
          </div>

          <!-- Password -->
          <div>
            <label for="passwordInput" class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Security Password</label>
            <input id="passwordInput" type="password" formControlName="password" placeholder="••••••••"
                   class="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600" />
            @if (loginForm.get('password')?.touched && loginForm.get('password')?.hasError('required')) {
              <p class="text-red-400 text-xs mt-1">Password is required.</p>
            }
            @if (loginForm.get('password')?.touched && loginForm.get('password')?.hasError('minlength')) {
              <p class="text-red-400 text-xs mt-1">Password must be at least 6 characters.</p>
            }
          </div>

          <!-- Error Alert -->
          @if (errorMessage) {
            <div class="p-3 bg-red-900/20 border border-red-500/20 rounded-xl flex items-center space-x-2 text-red-400 text-xs animate-fade-in">
              <span class="material-icons text-sm">error</span>
              <span>{{ errorMessage }}</span>
            </div>
          }

          <!-- Submit Button -->
          <button id="loginSubmitBtn" type="submit" [disabled]="loginForm.invalid || loading"
                  class="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-brand-500/10">
            @if (loading) {
              <span class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            } @else {
              <span>Authenticate Session</span>
              <span class="material-icons text-sm">arrow_forward</span>
            }
          </button>
        </form>

        <div class="mt-8 pt-4 border-t border-slate-900 flex justify-between text-[10px] text-slate-500">
          <span>* Demo users: hr&#64;test.com | admin&#64;test.com</span>
          <span>Version 2.0 LTS</span>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  public tenantService = inject(TenantService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  public loginForm: FormGroup = this.fb.group({
    tenantId: [this.tenantService.tenants[0].id, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  public loading = false;
  public errorMessage = '';

  public onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    const { email, password, tenantId } = this.loginForm.value as {
      email: string;
      password: string;
      tenantId: string;
    };

    // Edge case fix: use takeUntilDestroyed to prevent memory leak
    // if component is destroyed while login request is in-flight
    this.authService.login(email, password, tenantId).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err: { error?: { message?: string } }) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Authentication failed. Please verify connection and credentials.';
      }
    });
  }
}
