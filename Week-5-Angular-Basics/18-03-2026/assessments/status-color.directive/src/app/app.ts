import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusColorDirective } from './status-color-directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StatusColorDirective],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  students = [
    { name: 'Diya', marks: 78 },
    { name: 'Rahul', marks: 45 },
    { name: 'Priya', marks: 90 },
    { name: 'Amit', marks: 30 }
  ];
}