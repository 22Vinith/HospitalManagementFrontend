import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/userService/user-service.service';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.scss'],
})
export class DoctorAppointmentsComponent implements OnInit {
  appointments: any[] = []; 
  
  constructor(private appointmentService: UserServiceService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  // API call to fetch all appointments
  fetchAppointments(): void {
    this.appointmentService.getAppointmentsByDoctor().subscribe({
      next: (response: any) => {
        if (response.code === 200) {
          // Filter appointments where ailment_status is false
          this.appointments = response.appointments.filter((appointment: any) => !appointment.ailment_status);
          console.log('Filtered appointments:', this.appointments);
        } else {
          console.error('Unexpected response:', response.message);
        }
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
      },
    });
  }

  // Handle Attend Button
  attendAppointment(appointment: any): void {
    this.router.navigate(['update-status'], { state: { appointment } });
  }
}
