import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product.html',
  styleUrls: ['./product.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Initialize products with some sample data
    this.products = this.productService.getProducts();
  }
}

  

