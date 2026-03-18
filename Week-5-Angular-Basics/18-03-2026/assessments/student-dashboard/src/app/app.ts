import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] 
})
export class App {   

  students = [
    { name: 'Diya', marks: 92 },
    { name: 'Rahul', marks: 75 },
    { name: 'Anita', marks: 45 },
    { name: 'Karan', marks: 60 },
    { name: 'Priya', marks: 88 }
  ];

  getGrade(marks: number) {
    if (marks >= 90) return 'A';
    else if (marks >= 75) return 'B';
    else if (marks >= 50) return 'C';
    else return 'F';
  }

}