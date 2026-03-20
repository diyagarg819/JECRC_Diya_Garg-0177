import { Component } from '@angular/core';
import { ProductComponent } from './product-component/product-component';
import { CartComponent } from './cart-component/cart-component';
import { CheckoutComponent } from './checkout-component/checkout-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductComponent, CartComponent, CheckoutComponent],
  templateUrl: './app.html'
})
export class App {}