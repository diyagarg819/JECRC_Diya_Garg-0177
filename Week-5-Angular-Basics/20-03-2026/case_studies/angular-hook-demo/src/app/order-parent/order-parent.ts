import { Component } from '@angular/core';
import { OrderChild } from '../order-child/order-child';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-parent',
  standalone : true,
  imports: [OrderChild , CommonModule],
  templateUrl: './order-parent.html',
  styleUrl: './order-parent.css',
})
export class OrderParent {

  order = {
    id : 101,
    product : 'Laptop',
    status : 'Pending',
    price : 50000
  };

  updateOrder(){
    this.order = {
      ...this.order,
      status : this.order.status === 'Pending' ? 'Delivered' : 'Pending'
    };
  }

  destroyChild = true;

  toggleChild(){
    this.destroyChild = !this.destroyChild;
  }
}
