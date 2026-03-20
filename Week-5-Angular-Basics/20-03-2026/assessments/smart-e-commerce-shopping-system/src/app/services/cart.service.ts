import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: any[] = [];

  addToCart(product: any, qty: number) {
    const existing = this.items.find(i => i.id === product.id);

    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({ ...product, qty });
    }
  }

  getCart() {
    return this.items;
  }

  increase(item: any) {
    item.qty++;
  }

  decrease(item: any) {
    if (item.qty > 1) item.qty--;
  }

  remove(id: number) {
    this.items = this.items.filter(i => i.id !== id);
  }

  clear() {
    this.items = [];
  }

  total() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }
}