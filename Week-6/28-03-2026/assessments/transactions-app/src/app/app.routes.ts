import { Routes } from '@angular/router';
import { confirmLeaveGuard } from './core/guards/confirm-leave.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'transactions',
    pathMatch: 'full'
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./features/transaction-list/transaction-list.component').then(
        (m) => m.TransactionListComponent
      )
  },
  {
    path: 'transactions/new',
    loadComponent: () =>
      import('./features/transaction-form/transaction-form.component').then(
        (m) => m.TransactionFormComponent
      ),
    canDeactivate: [confirmLeaveGuard]
  },
  {
    path: 'transactions/:id/edit',
    loadComponent: () =>
      import('./features/transaction-form/transaction-form.component').then(
        (m) => m.TransactionFormComponent
      ),
    canDeactivate: [confirmLeaveGuard]
  },
  { path: '**', redirectTo: 'transactions' }
];
