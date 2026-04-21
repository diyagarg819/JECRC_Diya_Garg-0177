import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './services/product.service';
import { Product } from './models/product.model';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { StockFilterComponent } from './components/stock-filter/stock-filter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ProductTableComponent,
    CategoryFilterComponent,
    StockFilterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];

  private selectedCategory = '';
  private inStockOnly = false;

  constructor(private productService: ProductService) {}

  // Loads products and category metadata when the app starts.
  ngOnInit(): void {
    this.allProducts = this.productService.getProducts();
    this.categories = this.productService.getCategories();
    this.applyFilters();
  }

  // Applies a selected category and refreshes the visible product list.
  onCategoryFilter(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  // Applies the stock-only flag and refreshes the visible product list.
  onStockFilter(inStockOnly: boolean): void {
    this.inStockOnly = inStockOnly;
    this.applyFilters();
  }

  // Combines current filter criteria to build the final displayed list.
  private applyFilters(): void {
    let result = [...this.allProducts];
    if (this.selectedCategory) {
      result = result.filter(p => p.category === this.selectedCategory);
    }
    if (this.inStockOnly) {
      result = result.filter(p => p.stock > 0);
    }
    this.filteredProducts = result;
  }

  // Returns the total number of products loaded from the service.
  get totalProducts(): number { return this.allProducts.length; }
  // Returns how many products currently have stock available.
  get inStockCount(): number { return this.allProducts.filter(p => p.stock > 0).length; }
  // Returns how many products are currently out of stock.
  get outOfStockCount(): number { return this.allProducts.filter(p => p.stock === 0).length; }
}
