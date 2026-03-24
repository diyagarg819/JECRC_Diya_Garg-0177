import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../course';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
/**
 * CourseDetailComponent  –  Route: /course/:id
 *
 * HOW DYNAMIC ROUTE PARAMS WORK:
 *  Angular passes the :id segment via ActivatedRoute.
 *  We read it with snapshot.paramMap.get('id'), convert to number,
 *  then call getCourseById(id) on the shared service.
 *
 * NAVIGATION FLOW:
 *   /courses  ──(click card)──►  /course/3  ──(back btn)──►  /courses
 *   /dashboard ──(click card)──►  /course/1
 */
@Component({
  selector: 'app-course-detail',
  imports: [CommonModule,FormsModule],
  templateUrl: './course-details.html'
})
export class CourseDetailComponent implements OnInit {
 
  course: Course | undefined;
  loading = true;
  enrolled = false;
 
  constructor(
    private route: ActivatedRoute,    // Gives access to :id param
    private router: Router,
    private courseService: CourseService
  ) {}
 
  ngOnInit(): void {
    // Step 1: Read :id from the current URL  e.g. /course/3  → '3'
    const idParam = this.route.snapshot.paramMap.get('id');
    const id      = Number(idParam);
 
    // Step 2: Fetch course from service using the id
    // Same CourseService instance – no extra network call
    this.courseService.getCourseById(id).subscribe(course => {
      this.course = course;
      this.loading = false;
    });
  }
 
  enroll(): void {
    this.enrolled = true;
  }
 
  /** Go back to the courses list */
  goBack(): void {
    this.router.navigate(['/courses']);
  }
}