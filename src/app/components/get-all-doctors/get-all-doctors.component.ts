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
  
  constructor(private userService: UserServiceService, private router: Router) {}  

  ngOnInit(): void {
    this.fetchDoctors();
  }

  fetchDoctors() {
    this.userService.getAllDoctors().subscribe({
      next: (res) => {
        console.log(res);
        this.doctorDetails = res.doctors;
      }
    });
  }

  fetchAllAppointments(doctorId: string) {
    this.userService.getAllAppointments({ _id: doctorId }).subscribe({
      next: (res: any) => {
        this.appointments[doctorId] = res.data;  
      }
    });
  }

  toggleAppointments(doctorId: string) {
    if (this.expandedDoctor === doctorId) {
      this.expandedDoctor = null;  
    } else {
      this.expandedDoctor = doctorId;  
      if (!this.appointments[doctorId]) {
        this.fetchAllAppointments(doctorId);  
      }
    }
  }

  goToAddDoctor() {
    this.router.navigate(['addDoctor']);
  }
}
