import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-filter.component.html',
  styleUrls: ['./stock-filter.component.scss']
})
export class StockFilterComponent {
  @Output() stockFilterChange = new EventEmitter<boolean>();

  inStockOnly = false;

  // Emits the current in-stock toggle value to the parent component.
  onToggle(): void {
    this.stockFilterChange.emit(this.inStockOnly);
  }
}
