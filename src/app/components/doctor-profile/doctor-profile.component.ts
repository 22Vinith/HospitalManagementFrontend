import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/service/userService/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = true;

  // Breadcrumb navigation
  breadcrumb = [
    { label: 'Home', path: 'appointments' },
    { label: 'Profile', path: 'doctorProfile' }
  ];

  constructor(
    private fb: FormBuilder,
    private doctorService: UserServiceService,
    private authService: UserServiceService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      doctorId: [{ value: '', disabled: true }],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      specialization: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.fetchDoctorInfo();
  }

  // Fetch doctor information
  fetchDoctorInfo(): void {
    const doctorId = this.authService.getUserId();
    console.log(doctorId);

    this.doctorService.getDoctorInfo({ _id: doctorId }).subscribe({
      next: (response: any) => {
        console.log(response);
        const { _id, name, email, specialization } = response.data;
        this.profileForm.patchValue({ doctorId: _id, name, email, specialization });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching doctor info:', err);
        this.loading = false;
      }
    });
  }

  // Navigate to breadcrumb paths
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  // Handle profile update
  onSubmit(): void {
    if (this.profileForm.valid) {
      const { doctorId, name } = this.profileForm.getRawValue();
      const updatePayload = { _id: doctorId, doctor_name: name };

      this.doctorService.updateDoctorInfo(updatePayload).subscribe({
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
}
