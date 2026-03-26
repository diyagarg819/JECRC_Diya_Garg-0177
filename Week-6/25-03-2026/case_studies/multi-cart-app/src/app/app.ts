import { Component, signal } from '@angular/core';
import { Products } from './products/products';
import { Cart } from './cart/cart';

@Component({
  selector: 'app-root',
  imports: [Products, Cart],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('multi-cart-app');
}
