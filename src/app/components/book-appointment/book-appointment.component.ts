import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/userService/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit {
  specializationList: any[] = [];
  doctorList: any[] = [];
  specialization: string = '';

  // Initialize bookAppointmentForm with a default value
  bookAppointmentForm: FormGroup = new FormGroup({});

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Properly initialize the form
    this.bookAppointmentForm = new FormGroup({
      ailment: new FormControl('', [Validators.required]),
      doctor_id: new FormControl('', [Validators.required]),
      specialization: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });

    // Fetch specialization list
    this.userService.getSpecializationApiCall().subscribe({
      next: (res: any) => {
        console.log('Specializations fetched:', res);
        this.specializationList = res.spArray.specializations;
      },
      error: (err: any) => {
        console.error('Error fetching specializations:', err);
      }
    });
  }

  // Handle specialization change
  onSpecializationChange(selectedSpecialization: string): void {
    this.specialization = selectedSpecialization;

    this.userService.getDoctorsApiCall({ specialization: this.specialization }).subscribe({
      next: (res: any) => {
        console.log('Doctors fetched:', res);
        this.doctorList = Array.isArray(res.doctors) ? res.doctors : [];
      },
      error: (err: any) => {
        console.error('Error fetching doctors:', err);
      }
    });
  }

  // Book an appointment
  BookAppointment(): void {
    if (this.bookAppointmentForm && this.bookAppointmentForm.valid) {
      const formData = this.bookAppointmentForm.value;
      console.log('Booking Appointment with data:', formData);

      const appointmentData = {
        ailment: formData.ailment,
        doctor_id: formData.doctor_id,
        specialization: formData.specialization,
      };

      this.userService.bookAppointmentApiCall(appointmentData).subscribe({
        next: (res: any) => {
          console.log('Appointment booked successfully', res);

          // Show success snackbar
          this.snackBar.open('Appointment booked successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });

          // Reset the form
          this.bookAppointmentForm.reset();
        },
        error: (err: any) => {
          console.error('Error booking appointment:', err);

          // Show error snackbar
          this.snackBar.open('Register and Login to continue', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      });
    } else {
      console.error('Form is not valid');

  }
}
}
