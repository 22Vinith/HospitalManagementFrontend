import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/service/userService/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = true;

  // Breadcrumb navigation
  breadcrumb = [
    { label: 'Home', path: '' },
    { label: 'Patient Profile', path: 'profile' }
  ];

  constructor(
    private fb: FormBuilder,
    private patientService: UserServiceService,
    private authService: UserServiceService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      patientId: [{ value: '', disabled: true }],
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      phno: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  ngOnInit(): void {
    this.fetchPatientInfo();
  }

  fetchPatientInfo(): void {
    const patientId = this.authService.getUserId(); 
    console.log(patientId);

    this.patientService.getPatientInfo({ _id: patientId }).subscribe({
      next: (response: any) => {
        const { _id, name, age, email, phno } = response.data;
        this.profileForm.patchValue({ patientId: _id, name, age, email, phno });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching patient info:', err);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const { name, age, email, phno } = this.profileForm.value;
      const patientId = this.profileForm.get('patientId')?.value;

      const updatePayload = { _id: patientId, name, age, email, phno };

      this.patientService.updatePatientInfo(updatePayload).subscribe({
        next: (response: any) => {
          console.log('Update response:', response);
          alert('Profile updated successfully!');
        },
        error: (err) => {
          console.error('Error updating profile:', err);
          alert('Failed to update profile.');
        }
      });
    }
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
