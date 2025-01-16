import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/service/userService/user-service.service';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.scss'],
})
export class AdminRegistrationComponent implements OnInit {
  adminRegistrationForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserServiceService) {
    this.adminRegistrationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.adminRegistrationForm.valid) {
      const adminData = this.adminRegistrationForm.value;
  
      this.userService.adminSignUp(adminData).subscribe({
        next: (response: any) => {
          console.log('Response:', response); // Debug response structure
          if (response.code === 201) {
            this.successMessage = response.message;
            this.errorMessage = null;
            this.adminRegistrationForm.reset();
          } else {
            this.errorMessage = response.message || 'Unexpected error occurred.';
          }
        },
        error: (err) => {
          console.error('Error during admin registration:', err);
          const errMessage =
            err.error?.message || 'Failed to register admin. Please try again later.';
          this.errorMessage = errMessage;
          this.successMessage = null;
        },
      });
    }
  }
  
}
