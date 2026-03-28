import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  template: `
  <nav>
    <a routerLink="/employees">Employees</a>
    <a routerLink="/login">Login</a>
  </nav>
  `,
  styleUrl: './navbar.css',
})
export class NavbarComponent {
 
}
