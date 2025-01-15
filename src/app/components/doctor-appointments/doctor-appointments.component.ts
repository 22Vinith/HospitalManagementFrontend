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

  //api call to fetch all appointmnets
  fetchAppointments(): void {

    this.appointmentService.getAppointmentsByDoctor().subscribe({
      next: (response: any) => {
        if (response.code === 200) {
          this.appointments = response.appointments;
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
