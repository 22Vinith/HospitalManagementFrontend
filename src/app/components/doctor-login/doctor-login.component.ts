// doctor-login.component.ts
import { Component, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/userService/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.scss']
})
export class DoctorLoginComponent implements OnInit {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  isLogin = true;
  error = '';

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    @Optional() public dialogRef: MatDialogRef<DoctorLoginComponent>
  ) {}

  ngOnInit() {
    this.initializeForms();
  }

  initializeForms() {
    // Login Form
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    // Signup Form
    this.signupForm = new FormGroup({
      doctor_name: new FormControl('', [Validators.required]),
      specialization: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  handleToggle(isLogin: boolean): void {
    this.isLogin = isLogin;
    this.error = '';
  }

  handleSubmit(): void {
    if (this.isLogin) {
      this.submitLogin();
    } else {
      this.submitSignup();
    }
  }

  submitLogin(): void {
    if (this.loginForm.invalid) {
      this.error = 'Please fill all required fields correctly.';
      return;
    }

    const { email, password } = this.loginForm.value;

    this.userService.doctorLoginApiCall({ email, password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('authToken', res.token);
        this.router.navigate(['appointments']);
        this.showSnackBar('Login successful!');
        if (this.dialogRef) {
          this.dialogRef.close();
        }
      },
      error: (err: any) => {
        console.error(err);
        this.showSnackBar('Login failed. Please check your credentials.');
      }
    });
  }

  submitSignup(): void {
    if (this.signupForm.invalid) {
      this.error = 'Please fill all required fields correctly.';
      return;
    }

    const { doctor_name, specialization, email, password } = this.signupForm.value;

    this.userService.registerDoctor({ doctor_name, specialization, email,  password }).subscribe({
      next: (res: any) => {
        this.showSnackBar('Registration successful! Please login.');
        this.isLogin = true;
      },
      error: (err: any) => {
        console.error(err);
        this.showSnackBar('Registration failed. Please try again or not registered by admin');
      }
    });
  }


  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}