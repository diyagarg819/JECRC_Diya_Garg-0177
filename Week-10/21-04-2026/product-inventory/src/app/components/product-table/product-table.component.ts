import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnChanges {
  @Input() products: Product[] = [];

  displayedProducts: Product[] = [];
  priceSortAsc: boolean | null = null;

  // Syncs displayed products when input changes and preserves active sort state.
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      this.displayedProducts = [...this.products];
      if (this.priceSortAsc !== null) {
        this.sortByPrice();
      }
    }
  }

  // Toggles between ascending and descending price sort orders.
  togglePriceSort(): void {
    this.priceSortAsc = !this.priceSortAsc;
    this.sortByPrice();
  }

  // Sorts displayed products by price using the current sort direction.
  private sortByPrice(): void {
    this.displayedProducts = [...this.displayedProducts].sort((a, b) =>
      this.priceSortAsc ? a.price - b.price : b.price - a.price
    );
  }

  // Maps a numeric stock value to a display status label.
  getStockStatus(stock: number): string {
    if (stock === 0) return 'out';
    if (stock <= 5) return 'low';
    return 'in';
  }

  // Returns the icon that represents the active sort state.
  getSortIcon(): string {
    if (this.priceSortAsc === null) return '↕';
    return this.priceSortAsc ? '↑' : '↓';
  }
}
