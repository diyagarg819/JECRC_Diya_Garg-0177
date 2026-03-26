# Task Management System - Implementation Guide

## Project Overview

This is an Angular-based Task Management System with HTTP client services, REST API integration, and full CRUD operations. The application uses JSONPlaceholder as a demo API backend and includes Swagger UI documentation for testing all endpoints.

## Features Implemented

### 1. **HTTP Services (task.service.ts)**
- ✅ GET all tasks (`getTasks()`)
- ✅ GET task by ID (`getTaskById(id)`)
- ✅ POST new task (`addTask(task)`)
- ✅ PUT update task completely (`updateTask(id, task)`)
- ✅ PATCH partial update (`updatePartial(id, data)`)
- ✅ PATCH update status only (`updateTaskStatus(id, completed)`)
- ✅ DELETE task (`deleteTask(id)`)
- ✅ SEARCH tasks by title (`searchTasks(term)`)

### 2. **Task Form Component (task-form.ts & .html)**
- ✅ Reactive form with validation
- ✅ Form controls for title and completed status
- ✅ Real-time validation feedback
- ✅ Success/error messages
- ✅ Submit and reset buttons
- ✅ Error handling and user feedback
- ✅ Event emission for task creation

### 3. **Task List Component (task-list.ts & .html)**
- ✅ Display all tasks in a responsive table
- ✅ Search functionality to filter tasks
- ✅ Toggle task completion status
- ✅ Edit task titles inline
- ✅ Delete tasks with confirmation
- ✅ Loading and empty states
- ✅ Task count display
- ✅ Error handling

### 4. **Styling**
- ✅ Professional CSS for forms and tables
- ✅ Responsive design
- ✅ Animations and transitions
- ✅ Color-coded status badges
- ✅ Hover effects and visual feedback

### 5. **API Documentation (Swagger/OpenAPI)**
- ✅ OpenAPI 3.0 specification
- ✅ All endpoints documented
- ✅ Request/response examples
- ✅ Parameter descriptions
- ✅ Error response codes
- ✅ Swagger UI interface for testing

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v11 or higher)
- Angular CLI (v21 or higher)

### Installation

1. **Navigate to the project directory**
   ```bash
   cd http-client-task-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify dependencies installed**
   ```bash
   npm list swagger-ui-dist
   ```

### Running the Application

#### Development Server
```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The page will automatically reload if you change any source files.

### Accessing the Application

1. **Main Application**: http://localhost:4200/
   - Task form on the left
   - Task list on the right
   - Full task management interface

2. **Swagger API Documentation**: http://localhost:4200/swagger.html
   - Interactive API documentation
   - Try out all endpoints
   - See request/response examples
   - View all error codes


## API Endpoints Documentation

### Swagger UI
The Swagger UI provides an interactive interface to test all API endpoints. Access it at:
```
http://localhost:4200/swagger.html
```

### Available Endpoints

#### GET /todos
- **Description**: Get all tasks
- **Response**: Array of Task objects
- **Example**: 
  ```json
  [
    {
      "id": 1,
      "title": "Sample Task",
      "completed": false
    }
  ]
  ```

#### GET /todos/{id}
- **Description**: Get a specific task by ID
- **Parameters**: `id` (path parameter)
- **Response**: Single Task object

#### POST /todos
- **Description**: Create a new task
- **Request Body**: 
  ```json
  {
    "title": "New Task",
    "completed": false
  }
  ```
- **Response**: Created Task object with ID

#### PUT /todos/{id}
- **Description**: Update entire task
- **Parameters**: `id` (path parameter)
- **Request Body**: Complete Task object
- **Response**: Updated Task object

#### PATCH /todos/{id}
- **Description**: Partial update (update specific fields)
- **Parameters**: `id` (path parameter)
- **Request Body**: 
  ```json
  {
    "completed": true
  }
  ```
- **Response**: Updated Task object

#### DELETE /todos/{id}
- **Description**: Delete a task
- **Parameters**: `id` (path parameter)
- **Response**: 200 success or 404 not found

#### GET /todos?title_like={searchTerm}
- **Description**: Search tasks by title
- **Query Parameters**: `title_like` (search term)
- **Response**: Array of matching Task objects

## Project Structure

```
src/
├── app/
│   ├── task.ts                 # Task interface definition
│   ├── task.service.ts         # HTTP service for API calls
│   ├── task-form/
│   │   ├── task-form.ts       # Form component
│   │   ├── task-form.html     # Form template
│   │   ├── task-form.css      # Form styles
│   │   └── task-form.spec.ts  # Form tests
│   ├── task-list/
│   │   ├── task-list.ts       # List component
│   │   ├── task-list.html     # List template
│   │   ├── task-list.css      # List styles
│   │   └── task-list.spec.ts  # List tests
│   ├── swagger-ui/
│   │   └── swagger-ui.component.ts  # Swagger component
│   ├── app.ts                 # Main app component
│   ├── app.html               # App template
│   └── app.css                # App styles
├── index.html
├── main.ts
└── styles.css
public/
├── swagger.html               # Swagger UI page
└── openapi.json              # OpenAPI specification
```

## Component Details

### TaskForm Component
**Selector**: `app-task-form`

**Features**:
- Reactive forms with FormBuilder
- Title validation (required, min 3 chars)
- Completed checkbox
- Real-time validation messages
- Success notification after submission
- Form reset capability
- Submit and reset buttons

**Usage**:
```html
<app-task-form (taskAdded)="onTaskAdded($event)"></app-task-form>
```

### TaskList Component
**Selector**: `app-task-list`

**Features**:
- Display tasks in table format
- Search filter
- Toggle completion status
- Inline editing
- Delete with confirmation
- Responsive design
- Task count display

**Usage**:
```html
<app-task-list></app-task-list>
```

### TaskService
**Features**:
- Dependency injection via Angular
- HTTPClient for API calls
- Observable-based responses
- Error handling
- Type-safe with Task interface

**Example Usage**:
```typescript
import { TaskService } from './task.service';

constructor(private taskService: TaskService) {}

this.taskService.getTasks().subscribe(
  (tasks) => console.log(tasks),
  (error) => console.error(error)
);
```

## Testing

### Running Unit Tests
```bash
npm test
# or
ng test
```

Tests are located in:
- `src/app/task.service.spec.ts`
- `src/app/task-form/task-form.spec.ts`
- `src/app/task-list/task-list.spec.ts`

### Building for Production
```bash
npm run build
# or
ng build --configuration production
```

Build artifacts will be stored in the `dist/` directory.

## Development Tips

### Using the Swagger UI for Testing

1. Go to `http://localhost:4200/swagger.html`
2. Expand an endpoint (click on the endpoint)
3. Click "Try it out"
4. Fill in the required parameters
5. Click "Execute" to test the endpoint
6. View the response in the "Response" section

### Common Tasks

#### Add a new task
1. Use the form on the main page
2. Enter task title (min 3 characters)
3. Optionally mark as completed
4. Click "Add Task"
5. Success message will appear

#### Search tasks
1. Enter search term in the search box
2. Results filter in real-time

#### Edit a task
1. Click "Edit" button on the task row
2. Modify the title
3. Click "Save" or "Cancel"

#### Update task status
1. Click the checkbox in the "Status" column
2. Task status toggles immediately

#### Delete a task
1. Click "Delete" button
2. Confirm deletion in the dialog
3. Task is removed from list

## API Server Information

**Demo Backend**: JSONPlaceholder
- **Base URL**: `http://jsonplaceholder.typicode.com`
- **API**: Free, no authentication required
- **Limitations**: Fixed dataset of 200 tasks
- **Operations**: All CRUD operations supported but data resets after 5 minutes

## Troubleshooting

### Application doesn't load
- Check if port 4200 is available
- Clear browser cache (Ctrl+Shift+Delete)
- Restart ng serve

### Tasks not appearing
- Check browser console for errors (F12)
- Verify internet connection for API calls
- Check if JSONPlaceholder API is accessible

### Swagger UI not loading
- Verify `public/swagger.html` exists
- Check `public/openapi.json` is valid
- Ensure swagger-ui-dist is installed (`npm install`)

### Form validation errors
- Title must be at least 3 characters
- Check browser console for specific errors

## Technologies Used

- **Framework**: Angular 21.2.0
- **Language**: TypeScript 5.9.2
- **HTTP Client**: @angular/common/http
- **Forms**: @angular/forms (Reactive Forms)
- **Testing**: Vitest 4.0.8
- **API**: JSONPlaceholder (Placeholder REST API)
- **Documentation**: OpenAPI 3.0 / Swagger UI
- **Styling**: CSS3 with responsive design

## Future Enhancements

- [ ] Add authentication/authorization
- [ ] Implement local backend server
- [ ] Add database persistence
- [ ] Implement pagination
- [ ] Add task categories/tags
- [ ] Add task priority levels
- [ ] Add due dates
- [ ] Add task comments
- [ ] Implement undo/redo
- [ ] Add dark mode
- [ ] Add export to CSV/PDF
- [ ] Add multi-language support

## License

This is part of the Capgemini Training Program - 2026

## Support

For issues or questions, contact the training coordinator.

---

**Last Updated**: March 25, 2026  
**Angular Version**: 21.2.0  
**Status**: ✅ Complete and Ready for Testing
