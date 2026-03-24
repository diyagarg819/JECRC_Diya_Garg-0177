import { CourseDetailComponent } from "./course-details/course-details";
import { CoursesComponent } from "./courses/courses";
import { DashboardComponent } from "./dashboard/dashboard";
import { ProfileComponent } from "./profile/profile";
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',           redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'courses',    component: CoursesComponent },
  { path: 'course/:id', component: CourseDetailComponent },
  { path: 'profile',    component: ProfileComponent },
  { path: '**',         redirectTo: 'dashboard' }   // wildcard fallback
];