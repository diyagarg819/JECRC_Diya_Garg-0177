import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showProducts = true;

  products = [
    {
      name : "Laptop",
      price : 60000,
      status : "available",
    },
    {
      name : "Mobile",
      price : 20000,
      status : "out",
    },
    {
      name : "Tablet",
      price : 60000,
      status : "limited",
    }
  ]
}
