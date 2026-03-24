import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from './course';
 
/**
 * CourseService is a singleton (providedIn: 'root') injected into any component.
 * This means all components share the SAME instance → same data, no duplication.
 *
 * Why services are reusable:
 *  - One service can be injected into CoursesComponent, CourseDetailComponent,
 *    DashboardComponent etc. without re-fetching or re-defining logic.
 *  - When you update data here, every consumer auto-reflects the change.
 *
 * How data is fetched:
 *  - Returns Observable<Course[]> / Observable<Course | undefined> via `of()`
 *    which simulates an HTTP call (swap `of(...)` for `this.http.get(...)` for real API).
 */
@Injectable({
  providedIn: 'root'   // <-- Single instance shared across the whole app
})
export class CourseService {
 
  /** Mock data – replace with HttpClient.get() for a real backend */
  private courses: Course[] = [
    {
      id: 1,
      title: 'Angular Fundamentals',
      instructor: 'Priya Sharma',
      duration: '8 weeks',
      category: 'Web Development',
      level: 'Beginner',
      description: 'Master the core concepts of Angular including components, directives, services, routing and forms. Build production-ready SPAs from scratch.',
      topics: ['Components & Templates', 'Data Binding', 'Directives', 'Services & DI', 'Routing', 'Forms', 'HTTP Client'],
      enrolled: 1240,
      rating: 4.8,
      thumbnail: 'angular'
    },
    {
      id: 2,
      title: 'React & Redux Mastery',
      instructor: 'Arjun Mehta',
      duration: '10 weeks',
      category: 'Web Development',
      level: 'Intermediate',
      description: 'Deep-dive into React hooks, context, and Redux Toolkit. Build scalable state management solutions for complex applications.',
      topics: ['React Hooks', 'Context API', 'Redux Toolkit', 'Async Thunks', 'RTK Query', 'Testing'],
      enrolled: 980,
      rating: 4.7,
      thumbnail: 'react'
    },
    {
      id: 3,
      title: 'Python for Data Science',
      instructor: 'Dr. Kavita Nair',
      duration: '12 weeks',
      category: 'Data Science',
      level: 'Beginner',
      description: 'From Python basics to pandas, NumPy, and Matplotlib. Analyze real datasets and build your first ML model.',
      topics: ['Python Basics', 'NumPy', 'Pandas', 'Data Visualization', 'Scikit-learn', 'Jupyter'],
      enrolled: 2100,
      rating: 4.9,
      thumbnail: 'python'
    },
    {
      id: 4,
      title: 'Node.js Backend Development',
      instructor: 'Rohan Verma',
      duration: '9 weeks',
      category: 'Backend',
      level: 'Intermediate',
      description: 'Build RESTful APIs, authentication systems and real-time applications with Node.js, Express and MongoDB.',
      topics: ['Express.js', 'REST APIs', 'MongoDB', 'JWT Auth', 'WebSockets', 'Deployment'],
      enrolled: 760,
      rating: 4.6,
      thumbnail: 'node'
    },
    {
      id: 5,
      title: 'UI/UX Design Principles',
      instructor: 'Sneha Pillai',
      duration: '6 weeks',
      category: 'Design',
      level: 'Beginner',
      description: 'Learn human-centered design, wireframing, prototyping and usability testing. Create beautiful, functional interfaces.',
      topics: ['Design Thinking', 'Wireframing', 'Figma', 'Prototyping', 'Usability Testing', 'Design Systems'],
      enrolled: 540,
      rating: 4.5,
      thumbnail: 'design'
    },
    {
      id: 6,
      title: 'Machine Learning Advanced',
      instructor: 'Prof. Anand Kumar',
      duration: '14 weeks',
      category: 'Data Science',
      level: 'Advanced',
      description: 'Supervised, unsupervised and reinforcement learning. Neural networks, CNNs, RNNs and transformer architectures.',
      topics: ['Supervised Learning', 'Neural Networks', 'CNN', 'RNN', 'Transformers', 'Model Deployment'],
      enrolled: 430,
      rating: 4.8,
      thumbnail: 'ml'
    }
  ];
 
  /**
   * Returns all courses as an Observable.
   * Any component can subscribe to this stream.
   * Swap `of(this.courses)` → `this.http.get<Course[]>('/api/courses')` for real API.
   */
  getAllCourses(): Observable<Course[]> {
    return of(this.courses);
  }
 
  /**
   * Returns a single course by ID.
   * Used by CourseDetailComponent via route param `:id`.
   */
  getCourseById(id: number): Observable<Course | undefined> {
    const course = this.courses.find(c => c.id === id);
    return of(course);
  }
 
  /**
   * Returns featured/top courses for the dashboard.
   * Reuses the same data array – no duplicate fetching.
   */
  getFeaturedCourses(): Observable<Course[]> {
    return of(this.courses.slice(0, 3));
  }
}
 