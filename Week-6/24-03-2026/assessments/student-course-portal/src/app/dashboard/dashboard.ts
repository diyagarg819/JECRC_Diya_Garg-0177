import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../course';
import { CommonModule } from '@angular/common';

/**
 * DashboardComponent  –  Route: /dashboard
 *
 * Displays a welcome banner + top 3 featured courses.
 * Reuses CourseService.getFeaturedCourses() — same service,
 * same data, no duplicate HTTP calls.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {

  studentName  = 'Diya Garg';
  featuredCourses: Course[] = [];

  constructor(
    private courseService: CourseService,  // Injected shared service
    private router: Router
  ) {}

  ngOnInit(): void {
    /**
     * HOW DATA IS FETCHED:
     * subscribe() triggers the Observable returned by the service.
     * For mock data it resolves immediately.
     * For real HTTP it waits for the server response.
     */
    this.courseService.getFeaturedCourses().subscribe((courses: Course[]) => {
      this.featuredCourses = courses;
    });
  }

  /** Navigate to course detail page programmatically */
  viewCourse(id: number): void {
    this.router.navigate(['/course', id]);
  }

  /** Navigate to full course list */
  goToCourses(): void {
    this.router.navigate(['/courses']);
  }
}