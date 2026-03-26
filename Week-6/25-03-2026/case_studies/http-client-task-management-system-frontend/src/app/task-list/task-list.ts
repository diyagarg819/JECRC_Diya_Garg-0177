import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  isLoading = false;
  errorMessage = '';
  searchTerm = '';
  taskIdSearch: string | number | null = '';
  editingTaskId: number | null = null;
  editingTaskTitle = '';

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => {
        this.tasks = data;
        this.filteredTasks = [...this.tasks];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
        this.errorMessage = 'Failed to load tasks. Please try again later.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onTaskAdded(newTask: Task): void {
    // Add new task to the list
    if (newTask.id) {
      this.tasks.unshift(newTask);
      this.filteredTasks = [...this.tasks];
      this.cdr.detectChanges();
    }
  }

  deleteTask(id: number | undefined): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task.id !== id);
          this.filteredTasks = this.filteredTasks.filter(task => task.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error deleting task:', err);
          this.errorMessage = 'Failed to delete task. Please try again.';
          this.cdr.detectChanges();
        }
      });
    }
  }

  toggleTaskStatus(task: Task): void {
    if (task.id === undefined) return;

    this.taskService.updateTaskStatus(task.id, !task.completed).subscribe({
      next: (response: Task) => {
        const taskIndex = this.tasks.findIndex(t => t.id === task.id);
        if (taskIndex > -1) {
          this.tasks[taskIndex] = response;
          this.filteredTasks = [...this.tasks];
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error updating task:', err);
        this.errorMessage = 'Failed to update task. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }

  searchTasks(): void {
    if (!this.searchTerm.trim()) {
      this.filteredTasks = [...this.tasks];
      return;
    }

    this.filteredTasks = this.tasks.filter(task =>
      task.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getTaskById(): void {
    const rawTaskId = String(this.taskIdSearch ?? '').trim();

    if (!rawTaskId) {
      this.errorMessage = '';
      this.filteredTasks = [...this.tasks];
      this.cdr.detectChanges();
      return;
    }

    const id = Number(rawTaskId);

    if (!Number.isInteger(id) || id <= 0) {
      this.errorMessage = 'Enter a valid task ID.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.taskService.getTaskById(id).subscribe({
      next: (task: Task) => {
        this.filteredTasks = [task];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading task by ID:', err);
        this.errorMessage = `Task with ID ${id} was not found.`;
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  startEditingTask(task: Task): void {
    this.editingTaskId = task.id || null;
    this.editingTaskTitle = task.title;
  }

  saveEditedTask(task: Task): void {
    if (task.id === undefined) return;

    this.taskService.updatePartial(task.id, { title: this.editingTaskTitle }).subscribe({
      next: (response: Task) => {
        const taskIndex = this.tasks.findIndex(t => t.id === task.id);
        if (taskIndex > -1) {
          this.tasks[taskIndex] = response;
          this.filteredTasks = [...this.tasks];
        }
        this.editingTaskId = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error updating task:', err);
        this.errorMessage = 'Failed to update task. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }

  cancelEditing(): void {
    this.editingTaskId = null;
    this.editingTaskTitle = '';
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchTasks();
  }

  clearTaskIdSearch(): void {
    this.taskIdSearch = '';
    this.errorMessage = '';
    this.filteredTasks = [...this.tasks];
  }
}
