import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate(): boolean;
}

export const confirmLeaveGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  if (!component.canDeactivate || component.canDeactivate()) return true;
  return window.confirm('You have unsaved changes. Are you sure you want to leave?');
};
