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

const routes: Routes = [
  {
    path: '',
    component: registerComponent,
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'history',
    component:PatientHistoryComponent
  },
  {
    path:'invoice',
    component:InvoiceComponent
  },
  {
path:'doctorRegister',
component:DoctorRegisterComponent
  },
  {
path:'doctorLogin',
component:DoctorLoginComponent
  },
  {
path:'doctorHeader',
component:DoctorHeaderComponent
  },
  {
    path: 'home',
    component: HeaderComponent,
    children:[
      {
        path: '',
        component: BookAppointmentComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
