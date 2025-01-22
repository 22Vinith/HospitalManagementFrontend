import { Component, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/userService/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  isLogin = true;
  error = '';

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    @Optional() public dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit() {
    this.initializeForms();
  }

  initializeForms() {
    // Login Form
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    // Signup Form
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(1)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phno: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'), 
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
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

    this.userService.loginApiCall({ email, password }).subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem('authToken', res.token);
        this.showSnackBar('Login successful!');
        if (this.dialogRef) {
          this.dialogRef.close();
        }
      },
      error: (err: any) => {
        console.error(err);
        this.showSnackBar('Login failed. Please check your credentials.');
      },
    });
  }

  submitSignup(): void {
    if (this.signupForm.invalid) {
      this.error = 'Please fill all required fields correctly.';
      return;
    }

    const { name, age, email, phno, password } = this.signupForm.value;

    this.userService
      .registerApiCall({ name, age, email, phno, password })
      .subscribe({
        next: (res: any) => {
          this.showSnackBar('Registration successful! Please login.');
          this.isLogin = true;
        },
        error: (err: any) => {
          console.error(err);
          this.showSnackBar('Registration failed. Please try again.');
        },
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
