import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * ProfileComponent  –  Route: /profile
 *
 * Displays student information.
 * In a real app this data would come from an AuthService or UserService.
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html'
})
export class ProfileComponent {

  student = {
    name:     'Diya Garg',
    email:    'diya.garg@student.edu',
    phone:    '+91 98765 43210',
    city:     'Jaipur, Rajasthan',
    joinDate: 'January 2026',
    avatar:   'DG'
  };

  enrolledCourses = [
    { title: 'Angular Fundamentals',    progress: 60, status: 'In Progress' },
    { title: 'Python for Data Science', progress: 30, status: 'In Progress' },
    { title: 'UI/UX Design Principles', progress: 100, status: 'Completed'  }
  ];
}