import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-component.html',
  styleUrls: ['./product-component.css']
})
export class ProductComponent {

  search = '';
  category = '';
  qty: any = {};

  products = [
    { id: 1, name: 'Laptop', price: 60000, category: 'Electronics', rating: 4, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Shoes', price: 2000, category: 'Fashion', rating: 3, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Phone', price: 30000, category: 'Electronics', rating: 5, image: 'https://via.placeholder.com/150' }
  ];

  constructor(public cartService: CartService) {}

  addToCart(product: any) {
    this.cartService.addToCart(product, this.qty[product.id] || 1);
  }
}