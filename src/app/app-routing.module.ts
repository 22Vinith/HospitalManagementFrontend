import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { registerComponent } from './components/register/register.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PatientHistoryComponent } from './components/patient-history/patient-history.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { DoctorRegisterComponent } from './components/doctor-register/doctor-register.component';
import { DoctorLoginComponent } from './components/doctor-login/doctor-login.component';
import { DoctorHeaderComponent } from './components/doctor-header/doctor-header.component';
import { DoctorAppointmentsComponent } from './components/doctor-appointments/doctor-appointments.component';
import { UpdatePatientComponent } from './components/update-patient/update-patient.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { DoctorHistoryComponent } from './components/doctor-history/doctor-history.component';
import { AdminRegistrationComponent } from './components/admin-registration/admin-registration.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { GetAllDoctorsComponent } from './components/get-all-doctors/get-all-doctors.component';

const routes: Routes = [
  {
    path: '',
    component: registerComponent,
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'history',
    component: PatientHistoryComponent,
  },
  {
    path: 'invoice',
    component: InvoiceComponent,
  },
  {
    path: 'adminRegistration',
    component: AdminRegistrationComponent,
  },
  {
    path: 'adminLogin',
    component: AdminLoginComponent,
  },
  {
    path: 'addDoctor',
    component: AddDoctorComponent,
  },
  {
    path: 'getDoctor',
    component: GetAllDoctorsComponent,
  },
  {
    path: 'doctorRegister',
    component: DoctorRegisterComponent,
  },
  {
    path: 'doctorLogin',
    component: DoctorLoginComponent,
  },
  {
    path: 'doctorProfile',
    component: DoctorProfileComponent,
  },
  {
    path: 'update-status',
    component: UpdatePatientComponent,
  },
  {
    path: 'doctorHistory',
    component: DoctorHistoryComponent,
  },
  {
    path: 'Home-appointments',
    component: DoctorHeaderComponent,
    children: [
      {
        path: '',
        component: DoctorAppointmentsComponent,
      },
    ],
  },
  {
    path: 'home',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: BookAppointmentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
