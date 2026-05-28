// src/app/core/guards/auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  // For demo purposes, always allow navigation
  // In production, check: inject(AuthService).isLoggedIn
  return true;
};
