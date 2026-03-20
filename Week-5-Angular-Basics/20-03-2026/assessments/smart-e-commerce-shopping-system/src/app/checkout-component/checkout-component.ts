import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout-component.html',
  styleUrls: ['./checkout-component.css']
})
export class CheckoutComponent {

  user = {
    name: '',
    address: '',
    email: '',
    phone: '',
    zip: '',
    gender: '',
    deliveryType: '',
    city: '',
    state: '',
    country: '',
    deliveryDate: '',
    instructions: '',
    terms: false,
    subscribe: false,
    payment: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    upi: ''
  };

  addresses: string[] = [''];
  paymentMethods: string[] = [''];
}