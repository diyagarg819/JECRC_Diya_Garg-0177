import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Edge case: isAuthenticated() now checks token expiration internally
  if (authService.isAuthenticated()) {
    return true;
  }

  // Edge case: ensure stale sessions are fully cleared before redirect
  authService.logout();
  router.navigate(['/login']);
  return false;
};
