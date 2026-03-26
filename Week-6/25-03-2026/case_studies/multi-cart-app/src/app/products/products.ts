import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Cart } from '../cart/cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
  providers: [CartService]
})
export class Products {
  products = [
    {id : 1, name: 'Phone', price: 799},
    {id : 2, name: 'Laptop', price: 999},
    {id : 3, name: 'Tablet', price: 499}
  ];

  constructor(private cartService: CartService) {}

  addToCart(product: any) {
    this.cartService.addToCart(product.name);
  }

  getCartItems() {
    return this.cartService.getItems();
  }


}
