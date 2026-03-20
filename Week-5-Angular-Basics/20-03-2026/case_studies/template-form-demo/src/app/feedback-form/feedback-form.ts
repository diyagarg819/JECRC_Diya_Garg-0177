import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule , NgForm } from '@angular/forms';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-feedback-form',
  standalone  : true,
  imports: [FormsModule,CommonModule],
  templateUrl: './feedback-form.html',
  styleUrl: './feedback-form.css',
})
export class FeedbackForm {
  departments = ['Sales', 'Support', 'Marketing', 'HR'];

  allSkills = ['Angular', 'React', 'Vue', 'Svelte'];


  feedback = {
    name: '',
    email: '',
    department: '',
    rating : '',
    comments : '',
    skills : [] as string[]
  };

  submitForm(form: NgForm) {
    if (form.valid) {
      console.log('Feedback submitted:', this.feedback);
      alert(JSON.stringify(this.feedback, null, 2));
      form.resetForm();
      this.feedback.skills = [];

    }else {
      alert('Please fill out all required fields.');
    }
  }

  updateSkills(skill: string, isChecked: boolean) {
    if (isChecked) {
      this.feedback.skills.push(skill);
    } else {
      const index = this.feedback.skills.indexOf(skill);
      if (index >= 0) {
        this.feedback.skills.splice(index, 1);
      }
    }
  }
}
