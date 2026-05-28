import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TenantService } from '../services/tenant.service';
import { AuthService } from '../services/auth.service';

export const tenantInterceptor: HttpInterceptorFn = (req, next) => {
  const tenantService = inject(TenantService);
  const authService = inject(AuthService);

  const tenantId = tenantService.currentTenantId();
  // Edge case fix: read token from AuthService signal (includes expiry check)
  // instead of raw localStorage to prevent stale/expired tokens
  const token = authService.getToken();

  let headers = req.headers;

  if (tenantId) {
    headers = headers.set('X-Tenant-Id', tenantId);
  }

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const authReq = req.clone({ headers });
  return next(authReq);
};
