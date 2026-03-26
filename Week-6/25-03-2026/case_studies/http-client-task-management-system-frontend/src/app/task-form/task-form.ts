import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnInit {
  taskForm!: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  @Output() taskAdded = new EventEmitter<Task>();

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      completed: [false]
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const newTask: Task = this.taskForm.value;

    this.taskService.addTask(newTask).subscribe({
      next: (task: Task) => {
        this.successMessage = 'Task added successfully!';
        this.taskForm.reset({ completed: false });
        this.taskAdded.emit(task);
        this.isSubmitting = false;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        console.error('Error adding task:', err);
        this.errorMessage = 'Failed to add task. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

  get title() {
    return this.taskForm.get('title');
  }

  get completed() {
    return this.taskForm.get('completed');
  }

  resetForm(): void {
    this.taskForm.reset({ completed: false });
    this.successMessage = '';
    this.errorMessage = '';
  }
}
