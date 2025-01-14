import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/userService/user-service.service';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.scss']
})
export class PatientHistoryComponent implements OnInit {
  patientId: string = '';
  appointments: any[] = [];
  loading = true;

  constructor(private authService: UserServiceService, private userService:UserServiceService) {}

  ngOnInit(): void {
    this.fetchPatientId();
    this.fetchAppointments();
  }

  fetchPatientId(): void {
    this.patientId = this.authService.getUserId(); 
    console.log('Fetched Patient ID:', this.patientId);
  }

  fetchAppointments(): void {
    if (!this.patientId) {
      console.error('Patient ID not available.');
      this.loading = false;
      return;
    }

    const patientData = { _id: this.patientId };

    this.userService.getPatientAppointments(patientData).subscribe({
      next: (response: any) => {
        this.appointments = response.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
        this.loading = false;
      }
    });
  }
}