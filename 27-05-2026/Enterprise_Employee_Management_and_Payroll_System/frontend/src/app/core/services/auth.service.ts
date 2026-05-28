import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TenantService } from './tenant.service';
import { Observable, tap } from 'rxjs';

export interface UserSession {
  email: string;
  role: string;
  tenantId: string;
  token: string;
  tokenExpiry?: number; // Unix timestamp in seconds
}

export interface LoginResponse {
  data: {
    email: string;
    role: string;
    tenantId: string;
    token: string;
  };
}

interface JwtPayload {
  exp?: number;
  email?: string;
  role?: string;
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root' // Tells Angular to register this service globally at root level so it behaves as a singleton state manager
})
export class AuthService {
  // inject resolves standard Angular HTTP and Routing services dynamically without verbose constructors
  private http = inject(HttpClient);
  private router = inject(Router);
  private tenantService = inject(TenantService);

  // The base REST API URL pointing directly to the ASP.NET Core gateway container
  public readonly apiUrl = 'http://localhost:5000/api/v1';

  // We utilize Angular Signals (currentUser) to maintain reactive, low-overhead session states.
  // When the session changes, dependent views (like sidebars and templates) redraw instantly.
  public currentUser = signal<UserSession | null>(this.loadSession());

  // A computed signal that evaluates authentication status.
  // It automatically checks if a token exists and validates it against token expiration time boundaries,
  // preventing expired sessions from making failed queries.
  public isAuthenticated = computed(() => {
    const user = this.currentUser();
    if (!user) return false;
    
    // Checks if the Unix timestamp is in the past, reactively logging out the session if expired
    if (user.tokenExpiry && Date.now() / 1000 > user.tokenExpiry) {
      this.clearSession();
      return false;
    }
    return true;
  });

  // A computed signal resolving the active user's role (defaulting to Employee) to drive sidebar navigation visibility
  public userRole = computed(() => this.currentUser()?.role || 'Employee');

  // Performs HTTP POST requests to verify login credentials.
  // On success, parses the JWT to extract expiry, sets active storage flags, 
  // updates the active tenant, and sets the signal to transition the app state.
  public login(email: string, password: string, tenantId: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password, tenantId }).pipe(
      tap(res => {
        const tokenExpiry = this.extractTokenExpiry(res.data.token);
        const session: UserSession = {
          email: res.data.email,
          role: res.data.role,
          tenantId: res.data.tenantId,
          token: res.data.token,
          tokenExpiry
        };
        // Stores tokens in localStorage to preserve logged-in sessions across page reloads
        localStorage.setItem('token', session.token);
        localStorage.setItem('user_session', JSON.stringify(session));
        this.currentUser.set(session);
        this.tenantService.setTenant(session.tenantId);
      })
    );
  }

  // Clears storage credentials and navigates the browser to the login screen
  public logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  // Retrieves the active authentication token while verifying it has not expired in flight
  public getToken(): string | null {
    const user = this.currentUser();
    if (!user) return null;
    if (user.tokenExpiry && Date.now() / 1000 > user.tokenExpiry) {
      this.clearSession();
      return null;
    }
    return user.token;
  }

  // Evaluates role access. SuperAdmin bypasses all directory checks, 
  // giving the master administrator global privileges across all operations.
  public hasRole(roles: string[]): boolean {
    const role = this.userRole();
    return roles.includes(role) || role === 'SuperAdmin';
  }

  // Private helper that removes tokens and updates the reactive currentUser signal to null, logging out the user
  private clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user_session');
    this.currentUser.set(null);
  }

  // Parses browser localStorage on initial boot.
  // Validates standard parameters and checks if the cached JWT has expired,
  // ensuring clean initialization state transitions.
  private loadSession(): UserSession | null {
    const raw = localStorage.getItem('user_session');
    if (!raw) return null;
    try {
      const session = JSON.parse(raw) as UserSession;
      if (session.tokenExpiry && Date.now() / 1000 > session.tokenExpiry) {
        localStorage.removeItem('token');
        localStorage.removeItem('user_session');
        return null;
      }
      if (!session.email || !session.token || !session.role) {
        localStorage.removeItem('token');
        localStorage.removeItem('user_session');
        return null;
      }
      return session;
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('user_session');
      return null;
    }
  }

  // Parses the JWT token to retrieve standard expiry (`exp`) timestamps.
  // Resolves base64 padding adjustments correctly to prevent decoding crashes.
  private extractTokenExpiry(token: string): number | undefined {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return undefined;
      // Fix base64url padding
      let payload = parts[1];
      payload = payload.replace(/-/g, '+').replace(/_/g, '/');
      const pad = payload.length % 4;
      if (pad) {
        payload += '='.repeat(4 - pad);
      }
      const decoded = JSON.parse(atob(payload)) as JwtPayload;
      return decoded.exp;
    } catch {
      return undefined;
    }
  }
}
