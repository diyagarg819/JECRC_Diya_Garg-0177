import { Component, signal } from '@angular/core';
import { Highlight } from './highlight';

@Component({
  selector: 'app-root',
  imports: [Highlight],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('custom-directive');
}
