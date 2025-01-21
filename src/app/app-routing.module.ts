import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PatientHistoryComponent } from './components/patient-history/patient-history.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { DoctorLoginComponent } from './components/doctor-login/doctor-login.component';
import { DoctorHeaderComponent } from './components/doctor-header/doctor-header.component';
import { DoctorAppointmentsComponent } from './components/doctor-appointments/doctor-appointments.component';
import { UpdatePatientComponent } from './components/update-patient/update-patient.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { DoctorHistoryComponent } from './components/doctor-history/doctor-history.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { GetAllDoctorsComponent } from './components/get-all-doctors/get-all-doctors.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';

const routes: Routes = [
 
  {
    path:'login',
component:LoginComponent
  },
  
  {
      path: '',
      component: HeaderComponent,
      children:[
        {
          path:'',
          component:BookAppointmentComponent
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
      ]
    },
   

    {
      path:'doctorLogin',
      component:DoctorLoginComponent
    },
    {
      path:'',
      component:DoctorHeaderComponent,
      children:[{ path:'appointments',
        component:DoctorAppointmentsComponent
      },
        {path:'updatePatient',
        component:UpdatePatientComponent
      },
      {
        path:'doctorProfile',
        component:DoctorProfileComponent
      },
      {
        path:'doctorHistory',
        component:DoctorHistoryComponent
      },]
    },
    
    
    {
      path:'adminLogin',
      component:AdminLoginComponent
    },
    {
      path:'',
      component:AdminHeaderComponent,
      children:[{path:'addDoctor',
        component:AddDoctorComponent
      }, 
      {
        path:'getAllDoctors',
        component:GetAllDoctorsComponent
      },]
    },
   

    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
