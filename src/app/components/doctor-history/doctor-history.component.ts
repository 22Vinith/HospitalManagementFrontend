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

  fetchAppointments(): void {
    this.appointmentService.getAppointmentsByDoctor().subscribe({
      next: (response: any) => {
        if (response.code === 200) {
          // Filter appointments where ailment_status is true (i.e., cured patients)
          this.appointments = response.appointments.filter(
            (appointment: any) => appointment.ailment_status === true
          );
          console.log('Cured appointments:', this.appointments);
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
