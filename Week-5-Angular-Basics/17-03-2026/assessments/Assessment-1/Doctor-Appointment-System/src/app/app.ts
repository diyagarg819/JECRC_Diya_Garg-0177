import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppointmentDetails } from './appointment-details/appointment-details';

@Component({
  selector: 'app-root',
  imports: [AppointmentDetails],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Doctor-Appointment-System');
}
