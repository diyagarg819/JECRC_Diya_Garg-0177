import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,CommonModule],
  template: ` 
  <h1>Angular Router Demo</h1>
  <nav>
    <a routerLink="/">Home</a>
    <a routerLink="/contact">Contact</a>
    <a routerLink="/product">Product</a>
  </nav>
  <hr>

  <router-outlet></router-outlet> 
  `
})
export class App {
  protected readonly title = signal('routing-demo');
}
