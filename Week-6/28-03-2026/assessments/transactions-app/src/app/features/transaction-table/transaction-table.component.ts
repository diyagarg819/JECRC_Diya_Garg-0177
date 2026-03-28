import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction, SortDirection } from '../../core/models/transaction.model';

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-table.component.html'
})
export class TransactionTableComponent implements OnChanges {
  @Input() transactions: Transaction[] = [];
  @Output() editClicked = new EventEmitter<Transaction>();
  @Output() deleteClicked = new EventEmitter<Transaction>();

  displayedTransactions: Transaction[] = [];
  sortDirection: SortDirection = 'asc';
  isSortedByAmount = false;

  ngOnChanges(): void {
    this.displayedTransactions = [...this.transactions];
    if (this.isSortedByAmount) this.sortByAmount();
  }

  sortByAmount(): void {
    this.isSortedByAmount = true;
    this.displayedTransactions = [...this.transactions].sort(
      (a, b) => a.amount - b.amount
    );
  }

  onAmountHeaderClick(): void {
    this.sortByAmount();
  }

  onEdit(tx: Transaction): void {
    this.editClicked.emit(tx);
  }

  onDelete(tx: Transaction): void {
    this.deleteClicked.emit(tx);
  }

  getTypeLabel(type: 0 | 1): string {
    return type === 0 ? 'Credit' : 'Debit';
  }
}
