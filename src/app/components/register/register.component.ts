import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/userService/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class registerComponent {
  registerForm!: FormGroup;
  constructor(
    private userService: UserServiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(150),
      ]),
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

  handleRegister(): void {
    console.log(this.registerForm.value);

    const { name, age, email, phno, password } = this.registerForm.value;

    // Check if form is invalid
    if (this.registerForm.status === 'INVALID') {
      // Show a snackbar for invalid form
      this.snackBar.open('Please fill out all fields correctly!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    }

    // Register API call
    this.userService
      .registerApiCall({ name, age, email, phno, password })
      .subscribe({
        next: (res: any) => {
          console.log(res);
          // Show success snackbar
          this.snackBar.open('Registration successful!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });

          // Navigate to login
          this.router.navigate(['login']);
        },
        error: (err) => {
          console.log(err);

          // Show error snackbar
          this.snackBar.open(
            'Registration failed. Please try again.',
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            }
          );
        },
      });
  }

  handleLogin() {
    this.router.navigate(['login']);
  }
}
