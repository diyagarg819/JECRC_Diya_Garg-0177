import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  products = [
    {name : "Laptop" , price : 50000},
    {name : "Car" , price : 150000},
    {name : "SmartPhone" , price : 20000},
  ]
}
