import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TransactionService } from '../../core/services/transaction.service';
import { Transaction } from '../../core/models/transaction.model';
import { FilterBarComponent, TransactionFilter } from '../filter-bar/filter-bar.component';
import { TransactionTableComponent } from '../transaction-table/transaction-table.component';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    CommonModule,
    FilterBarComponent,
    TransactionTableComponent,
    DeleteConfirmComponent
  ],
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  txToDelete: Transaction | null = null;
  activeFilter: TransactionFilter | null = null;

  constructor(
    private txService: TransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(filter?: TransactionFilter): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.txService.getTransactions(filter).subscribe({
      next: (data) => {
        this.transactions = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  onFilterApplied(filter: TransactionFilter | null): void {
    this.activeFilter = filter;
    this.loadTransactions(filter ?? undefined);
  }

  onAddClicked(): void {
    this.router.navigate(['/transactions/new']);
  }

  onEditClicked(tx: Transaction): void {
    this.router.navigate(['/transactions', tx.id, 'edit']);
  }

  onDeleteClicked(tx: Transaction): void {
    this.txToDelete = tx;
  }

  onDeleteConfirmed(): void {
    if (!this.txToDelete?.id) return;
    this.txService.deleteTransaction(this.txToDelete.id).subscribe({
      next: () => {
        this.txToDelete = null;
        this.loadTransactions(this.activeFilter ?? undefined);
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.txToDelete = null;
      }
    });
  }

  onDeleteCancelled(): void {
    this.txToDelete = null;
  }
}
