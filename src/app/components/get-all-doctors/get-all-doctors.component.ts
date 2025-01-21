import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/userService/user-service.service';

@Component({
  selector: 'app-get-all-doctors',
  templateUrl: './get-all-doctors.component.html',
  styleUrls: ['./get-all-doctors.component.scss']
})
export class GetAllDoctorsComponent implements OnInit {
  doctorDetails: any[] = [];
  appointments: any = {};  
  expandedDoctor: string | null = null;  

  // Breadcrumb navigation
  breadcrumb = [
    { label: 'Home', path: '/addDoctor' },
    { label: 'Doctors', path: '/doctors' }
  ];

  constructor(private userService: UserServiceService, private router: Router) {}

  ngOnInit(): void {
    this.fetchDoctors();
  }

  fetchDoctors(): void {
    this.userService.getAllDoctors().subscribe({
      next: (res) => {
        console.log(res);
        this.doctorDetails = res.doctors;
      },
      error: (err) => {
        console.error('Error fetching doctors:', err);
      }
    });
  }

  fetchAllAppointments(doctorId: string): void {
    this.userService.getAllAppointments({ _id: doctorId }).subscribe({
      next: (res: any) => {
        this.appointments[doctorId] = res.data;
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
      }
    });
  }

  toggleAppointments(doctorId: string): void {
    if (this.expandedDoctor === doctorId) {
      this.expandedDoctor = null;  
    } else {
      this.expandedDoctor = doctorId;  
      if (!this.appointments[doctorId]) {
        this.fetchAllAppointments(doctorId);  
      }
    }
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  goToAddDoctor(): void {
    this.router.navigate(['addDoctor']);
  }
}
