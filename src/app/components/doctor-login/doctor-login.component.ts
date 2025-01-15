import { Component, Optional } from '@angular/core';
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
export class DoctorLoginComponent {
  loginForm!: FormGroup;

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    @Optional() public dialogRef: MatDialogRef<DoctorLoginComponent>
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  handleLogin(): void {
    if (this.loginForm.invalid) {
      this.snackBar.open('Please enter valid email and password!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    }

    const { email, password } = this.loginForm.value;

    this.userService.doctorLoginApiCall({ email, password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('authToken', res.token);
        // this.router.navigate(['home']);
        this.snackBar.open('Login successful!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });

        if (this.dialogRef) {
          this.dialogRef.close();
        }
      },
      error: (err: any) => {
        console.error(err);
        this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
    });
  }

  handleRegister(): void {
    this.router.navigate(['doctorRegister']);
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
