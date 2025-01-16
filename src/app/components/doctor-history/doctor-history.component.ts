import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/userService/user-service.service';

@Component({
  selector: 'app-doctor-history',
  templateUrl: './doctor-history.component.html',
  styleUrls: ['./doctor-history.component.scss'],
})
export class DoctorHistoryComponent implements OnInit {
  appointments: any[] = [];
  loading: boolean = true;

  constructor(private appointmentService: UserServiceService) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  // API call to fetch all appointments
  fetchAppointments(): void {
    this.appointmentService.getAppointmentsByDoctor().subscribe({
      next: (response: any) => {
        if (response.code === 200) {
          this.appointments = response.appointments; // No filter, fetching all
          console.log('All appointments:', this.appointments);
        } else {
          console.error('Unexpected response:', response.message);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
        this.loading = false;
      },
    });
  }
}
