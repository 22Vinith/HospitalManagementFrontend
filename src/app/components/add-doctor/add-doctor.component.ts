import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/userService/user-service.service'; 

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {
  addDoctorForm!: FormGroup;
  successMessage!: string;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private doctorService: UserServiceService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addDoctorForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.addDoctorForm.invalid) return;
    const email = this.addDoctorForm.value.email;
    this.doctorService.addDoctorByEmail({email}).subscribe({
      next: (response) => {
        console.log(response);
        this.successMessage = 'Successfully added doctor.';
        this.errorMessage = ''; 
      },
      error: (error) => {
        this.errorMessage = 'Unable to add doctor.';
        this.successMessage = ''; 
      }
    });
  }
}
