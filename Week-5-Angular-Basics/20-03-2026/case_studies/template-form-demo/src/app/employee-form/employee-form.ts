import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  FormArray,
  FormRecord,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm {
  // FormControl (single field)
  name = new FormControl('', [Validators.required]);

  // FormGroup (Structured data)
  account = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  // FormArray (Dynamic list)
  skills = new FormArray([
    new FormControl('Angular'),
  ]);

  // FormRecord (Key-value pairs)
  preferences = new FormRecord({
    darkmode: new FormControl(true),
    notifications: new FormControl(false),
  });

  // Add Skill
  addSkill() {
    this.skills.push(new FormControl(''));
  }

  // Remove Skill
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  // Add preference dynamically
  addPreference() {
    const key = 'pref_' + Object.keys(this.preferences.value).length;
    this.preferences.addControl(key, new FormControl(false));
  }

  // Submit handler
  submit() {
    const employeeData = {
      name: this.name.value,
      account: this.account.value,
      skills: this.skills.value,
      preferences: this.preferences.value
    };
    console.log('Employee Data:', employeeData);
    alert(JSON.stringify(employeeData, null, 2));
  }
}