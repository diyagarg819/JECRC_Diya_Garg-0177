import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface TransactionFilter {
  date?: string;
  type?: number; // 0=Credit, 1=Debit
  search?: string;
}

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-bar.component.html'
})
export class FilterBarComponent {
  @Output() filterApplied = new EventEmitter<TransactionFilter | null>();
  @Output() addClicked = new EventEmitter<void>();

  selectedDate: string = '';
  selectedType: string = ''; // '', '0', '1'
  searchText: string = '';

  get hasFilters(): boolean {
    return !!(this.selectedDate || this.selectedType !== '' || this.searchText);
  }

  onFilter(): void {
    const filter: TransactionFilter = {};
    if (this.selectedDate) filter.date = this.selectedDate;
    if (this.selectedType !== '') filter.type = Number(this.selectedType);
    if (this.searchText.trim()) filter.search = this.searchText.trim();
    this.filterApplied.emit(filter);
  }

  onClear(): void {
    this.selectedDate = '';
    this.selectedType = '';
    this.searchText = '';
    this.filterApplied.emit(null);
  }

  onAdd(): void {
    this.addClicked.emit();
  }
}
