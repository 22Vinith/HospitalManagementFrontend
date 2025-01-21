import { Component, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/service/userService/user-service.service'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
   loginForm!: FormGroup;
    signupForm!: FormGroup;
    isLogin = true;
    error = '';
  
    constructor(
      private userService: UserServiceService,
      private router: Router,
      private snackBar: MatSnackBar,
      @Optional() public dialogRef: MatDialogRef<AdminLoginComponent>
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
        name: new FormControl('', [Validators.required]),
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
  
      this.userService.adminLogin({ email, password }).subscribe({
        next: (res: any) => {
          localStorage.setItem('authToken', res.token);
          this.router.navigate(['/addDoctor']);
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
  console.log(this.signupForm.value);
  
      const { name, email, password } = this.signupForm.value;
  
      this.userService.adminSignUp({ name, email,  password }).subscribe({
        next: (res: any) => {
          console.log(res);
          this.showSnackBar('Registration successful! Please login.');
          this.isLogin = true;
        },
        error: (err: any) => {
          console.error(err);
          this.showSnackBar('Registration failed. Please try again');
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
