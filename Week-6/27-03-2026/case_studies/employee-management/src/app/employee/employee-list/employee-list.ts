import { Component } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule],
  template: ` 
  <h2>Employee List</h2>
  <ul>
    <li *ngFor="let employee of employees">
      {{ employee.name }} - {{ employee.role }}
    </li>
  </ul>
  `,
  styleUrl: './employee-list.css',
})
export class EmployeeList {
  employees: any[] = [];

  constructor(public employeeService: EmployeeService) {
    this.employees = this.employeeService.getEmployees();
}
}
