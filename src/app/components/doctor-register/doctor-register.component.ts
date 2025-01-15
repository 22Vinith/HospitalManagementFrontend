import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/service/userService/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.component.html',
  styleUrls: ['./doctor-register.component.scss']
})
export class DoctorRegisterComponent implements OnInit {
  registerForm: FormGroup;
  registrationMessage: string = '';
  isRegistering: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private router:Router
  ) {
    this.registerForm = this.fb.group({
      doctor_name: ['', [Validators.required, Validators.minLength(3)]],
      specialization: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  // Handle Doctor Registration
  handleRegister(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.isRegistering = true;

      // Call the register API
      this.userService.registerDoctor(formData).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.code === 201) {
            // Success case
            this.registrationMessage = 'Doctor registered successfully!';
            this.registerForm.reset();
          } else {
            // Unexpected success response handling
            this.registrationMessage = 'Unexpected response from the server.';
          }
          this.isRegistering = false;
        },
        error: (err) => {
          // Handle error case
          if (err.error.code === 500 && err.error.message === 'Doctor not registered by admin') {
            this.registrationMessage = 'Doctor email not approved by admin.';
          } else {
            this.registrationMessage = 'An unexpected error occurred during registration.';
          }
          console.error('Registration error:', err);
          this.isRegistering = false;
        }
      });
    } else {
      this.registrationMessage = 'Please fill out the form correctly.';
    }
  }

  // Redirect to Login
  handleLogin(): void {
    this.router.navigate(['doctorLogin']);
  }
}
