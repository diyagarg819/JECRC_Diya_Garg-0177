import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-checkout',
  standalone: true, 
  imports: [CommonModule,FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  form = {
    name: '',
    email: '',
    address: '',
    paymentMethod: ''
  };

  submit(){
    alert(`Order placed successfully !`);
    console.log(this.form);
  }
}
