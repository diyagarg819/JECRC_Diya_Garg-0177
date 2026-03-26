import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskForm } from './task-form/task-form';
import { TaskList } from './task-list/task-list';

@Component({
  selector: 'app-root',
  imports: [CommonModule, TaskForm, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
