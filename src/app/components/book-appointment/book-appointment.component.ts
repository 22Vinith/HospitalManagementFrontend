import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UserServiceService} from 'src/app/service/userService/user-service.service'

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent {
specializationList:any[]=[]
doctorList:any[]=[]

bookAppointmentForm!:FormGroup

constructor(private userService:UserServiceService,private router:Router ){}

ngOnInit(): void {

  this.bookAppointmentForm = new FormGroup({
    ailment: new FormControl('', [Validators.required]),
    doctor_id: new FormControl('', [Validators.required]) ,
    specialization:new FormControl('', [Validators.required]) 

  });
  this.userService.getSpecializationApiCall().subscribe({
    next: (res: any) => {
      console.log('Specializations fetched:', res);
      this.specializationList = res.spArray.specializations;
    },
    error: (err: any) => {
      console.error('Error fetching specializations:', err);
    },
  });
}

BookAppointment(){



}


}
