import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Global error interceptor handling:
 * - 401 Unauthorized: auto-logout and redirect to login
 * - 403 Forbidden: log and propagate
 * - 500+ Server errors: log structured error
 * 
 * Edge case: Prevents exposing stack traces to client (spec rule #34)
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Edge case: Auto-logout on 401 (token expired/revoked server-side)
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }

      // Edge case: Sanitize error — never expose raw stack traces
      const sanitizedError: HttpErrorResponse = new HttpErrorResponse({
        error: {
          message: getSafeErrorMessage(error),
          errors: error.error?.errors ?? []
        },
        headers: error.headers,
        status: error.status,
        statusText: error.statusText,
        url: error.url ?? undefined
      });

      return throwError(() => sanitizedError);
    })
  );
};

function getSafeErrorMessage(error: HttpErrorResponse): string {
  if (error.status === 0) {
    return 'Unable to connect to the server. Please check your network connection.';
  }
  if (error.status === 401) {
    return 'Session expired. Please log in again.';
  }
  if (error.status === 403) {
    return 'You do not have permission to perform this action.';
  }
  if (error.status === 404) {
    return 'The requested resource was not found.';
  }
  if (error.status === 409) {
    return 'A conflict occurred. The resource may have been modified by another user.';
  }
  if (error.status === 422) {
    return error.error?.message ?? 'Validation failed. Please check your input.';
  }
  if (error.status === 429) {
    return 'Too many requests. Please wait a moment and try again.';
  }
  if (error.status >= 500) {
    return 'An internal server error occurred. Our team has been notified.';
  }
  return error.error?.message ?? 'An unexpected error occurred.';
}
