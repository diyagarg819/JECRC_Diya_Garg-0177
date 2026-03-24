import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
 getProducts(): Product[] {
    return [
      { productID: 1, name: 'Laptop', price: 999.99 },
      { productID: 2, name: 'Smartphone', price: 499.99 },
      { productID: 3, name: 'Headphones', price: 199.99 },
    ];
  }
}
