import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickBlockDirective } from './click-block-directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ClickBlockDirective],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  allowClick = false;

  toggle() {
    this.allowClick = !this.allowClick;
  }

  buttonClicked(name: string) {
    alert(name + ' clicked!');
  }
}