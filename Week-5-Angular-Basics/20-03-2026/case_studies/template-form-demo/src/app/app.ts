import { Component, signal } from '@angular/core';

import { FeedbackForm } from './feedback-form/feedback-form';
import { CommonModule } from '@angular/common';
import { EmployeeForm } from './employee-form/employee-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ FeedbackForm , EmployeeForm, CommonModule],
  template : `
    <h1 style="text-align:center;">Angular 21 Template-driven Demo</h1>


      <div style="flex:1; min-width:300px; border:1px solid #ccc; padding:10px;">
        <h2>Employee Feedback</h2>
        <app-feedback-form></app-feedback-form>
      </div>

      <div style="flex:1; min-width:300px; border:1px solid #ccc; padding:10px;">
        <h2>Employee Form</h2>
        <app-employee-form></app-employee-form>
      </div>
      `
})
export class App {
  protected readonly title = signal('template-form-demo');
}
