import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../course';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
/**
 * CoursesComponent  –  Route: /courses
 *
 * Displays ALL available courses in a searchable, filterable grid.
 * Injects the SAME CourseService instance used by DashboardComponent.
 *
 * WHY SERVICES ARE REUSABLE:
 *  - CourseService is declared `providedIn: 'root'` — Angular creates exactly
 *    ONE instance for the entire app.
 *  - Both DashboardComponent and CoursesComponent inject it and receive the
 *    same data without any duplication of fetch logic.
 *
 * HOW MULTIPLE COMPONENTS USE THE SAME DATA:
 *  DashboardComponent  ──┐
 *  CoursesComponent    ──┤──► CourseService (singleton) ──► courses[]
 *  CourseDetailComponent ┘
 */
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './courses.html'
})
export class CoursesComponent implements OnInit {
 
  allCourses: Course[]      = [];
  filteredCourses: Course[] = [];
  searchTerm   = '';
  selectedLevel = 'All';
  levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
 
  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    // Fetch all courses from the shared service
    this.courseService.getAllCourses().subscribe(courses => {
      this.allCourses      = courses;
      this.filteredCourses = courses;
    });
  }
 
  /** Filter by search term and selected level */
  applyFilters(): void {
    this.filteredCourses = this.allCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const matchesLevel  = this.selectedLevel === 'All' ||
        course.level === this.selectedLevel;
      return matchesSearch && matchesLevel;
    });
  }
 
  onSearch(): void     { this.applyFilters(); }
  onLevelChange(): void { this.applyFilters(); }
 
  /** Navigate to /course/:id */
  viewDetail(id: number): void {
    this.router.navigate(['/course', id]);
  }
}