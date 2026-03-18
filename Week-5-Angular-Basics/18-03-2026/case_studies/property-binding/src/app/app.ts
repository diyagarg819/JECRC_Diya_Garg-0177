import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { get } from 'http';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  //Data
  productName = 'Laptop';
  price = 50000;
  quantity = 1;
  isAvailabele = true;

  // isDisabled = false;
  imageUrl = 'https://picsum.photos/150';

  //Two way binding fields
  customerName = '';
  address = '';

  //Method (Event Binding)
  incrreaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    } 
}

  toggleAvailability() {
        this.isAvailabele = !this.isAvailabele;
      }

    getTotalPrice() {
      return this.price * this.quantity;
    }

  }

