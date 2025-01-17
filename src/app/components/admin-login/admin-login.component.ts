import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/service/userService/user-service.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  adminLoginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserServiceService,private router:Router) {
    this.adminLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onLogin(): void {
    if (this.adminLoginForm.valid) {
      const loginData = this.adminLoginForm.value;

      // Call your login service
      this.userService.adminLogin(loginData).subscribe({
        next: (response: any) => {
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['addDoctor'])
          console.log('Login Success:', response);
        },
        error: (err) => {
          console.error('Error during admin login:', err);
          this.errorMessage = err.error?.message || 'Failed to login. Please try again later.';
        },
      });
    }
  }
}
