import { Injectable } from '@angular/core';

@Injectable()
export class CartService {
 private items: string [] = [];

 addToCart(item: string) {
   this.items.push(item);
 }

 getItems() {
   return this.items;
 }

 clearCart() {
   this.items = [];
 }
}

