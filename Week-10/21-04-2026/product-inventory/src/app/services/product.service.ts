import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 850.50, stock: 10 },
    { id: 2, name: 'Wireless Mouse', category: 'Electronics', price: 29.99, stock: 50 },
    { id: 3, name: 'Desk Chair', category: 'Furniture', price: 349.00, stock: 5 },
    { id: 4, name: 'Standing Desk', category: 'Furniture', price: 599.99, stock: 0 },
    { id: 5, name: 'Running Shoes', category: 'Sports', price: 124.95, stock: 20 },
    { id: 6, name: 'Yoga Mat', category: 'Sports', price: 45.00, stock: 0 },
    { id: 7, name: 'Mechanical Keyboard', category: 'Electronics', price: 189.00, stock: 15 },
    { id: 8, name: 'Bookshelf', category: 'Furniture', price: 210.00, stock: 8 },
    { id: 9, name: 'Protein Powder', category: 'Health', price: 54.99, stock: 30 },
    { id: 10, name: 'Resistance Bands', category: 'Sports', price: 19.99, stock: 0 },
    { id: 11, name: 'Noise-Cancelling Headphones', category: 'Electronics', price: 299.00, stock: 7 },
    { id: 12, name: 'Vitamin C Supplements', category: 'Health', price: 14.99, stock: 100 },
  ];

  // Returns a copy of the product list to keep internal state immutable.
  getProducts(): Product[] {
    return [...this.products];
  }

  // Returns sorted unique category names extracted from products.
  getCategories(): string[] {
    return [...new Set(this.products.map(p => p.category))].sort();
  }
}
