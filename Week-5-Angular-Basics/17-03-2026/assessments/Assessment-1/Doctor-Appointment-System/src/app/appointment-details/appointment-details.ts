import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'appointment-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-details.html',
  styleUrls: ['./appointment-details.css']
})
export class AppointmentDetails {

  // Form Fields
  patientName = '';
  doctor = '';
  appointmentDate = '';
  consultationType = '';
  symptoms = '';

  // Derived Data
  fee = 0;
  confirmationMessage = '';

  // Disable past dates
  minDate: string = new Date().toISOString().split('T')[0];

  // Auto update fee (called on change)
  calculateFee() {
    if (this.consultationType === 'Online') {
      this.fee = 300;
    } else if (this.consultationType === 'Offline') {
      this.fee = 500;
    } else {
      this.fee = 0;
    }
  }

  // Submit
  

showPopup = false;

bookAppointment() {
  if (!this.patientName || !this.doctor || !this.appointmentDate || !this.consultationType) {
    alert("❌ Please fill all required fields!");
    return;
  }

  this.showPopup = true;
}

closePopup() {
  this.showPopup = false;
}
}