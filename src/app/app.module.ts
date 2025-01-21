import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import { ProfileComponent } from './components/profile/profile.component';
import { PatientHistoryComponent } from './components/patient-history/patient-history.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { DoctorHeaderComponent } from './components/doctor-header/doctor-header.component';
import { DoctorLoginComponent } from './components/doctor-login/doctor-login.component';
import { DoctorAppointmentsComponent } from './components/doctor-appointments/doctor-appointments.component';
import { UpdatePatientComponent } from './components/update-patient/update-patient.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { DoctorHistoryComponent } from './components/doctor-history/doctor-history.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { GetAllDoctorsComponent } from './components/get-all-doctors/get-all-doctors.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { MatCardModule } from "@angular/material/card"



@NgModule({
  declarations: [
    AppComponent,
    BookAppointmentComponent,
    HeaderComponent,
    LoginComponent,
    ProfileComponent,
    PatientHistoryComponent,
    InvoiceComponent,
    DoctorHeaderComponent,
    DoctorLoginComponent,
    DoctorAppointmentsComponent,
    UpdatePatientComponent,
    DoctorProfileComponent,
    DoctorHistoryComponent,
    AdminLoginComponent,
    AddDoctorComponent,
    GetAllDoctorsComponent,
    AdminHeaderComponent

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatExpansionModule,
    MatIconModule, 
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
