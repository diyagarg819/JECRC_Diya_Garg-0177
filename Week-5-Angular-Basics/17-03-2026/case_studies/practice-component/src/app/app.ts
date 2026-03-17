import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hello } from "./hello/hello";
import { Home } from "./home/home";
import { User } from "./user/user";
import { Product } from "./product/product";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Hello, Home, User, Product],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('practice-component');
  
}
