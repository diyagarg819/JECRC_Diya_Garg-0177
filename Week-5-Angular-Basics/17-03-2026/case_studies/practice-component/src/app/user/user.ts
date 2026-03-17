import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  title = "My-app";
  
  users = [
    "John",
    "David",
    "Priya",
    "Anita",
  ]
  user = {
    name : "john",
    age : 30
  }
  getGreeting(){
    return "Welcome" + this.user.name;
  }
}
