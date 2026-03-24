import { Component, signal } from '@angular/core';
import { RxjsDemo } from './rxjs-demo/rxjs-demo';   

@Component({
  selector: 'app-root',
  imports: [RxjsDemo],
  template: `<app-rxjs-demo></app-rxjs-demo>`,
  styleUrl: './app.css'
})
export class App {
  
}
