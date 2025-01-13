import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { registerComponent } from './components/register/register.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';

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
    path: 'header',
    component: HeaderComponent,
    children:[
      {
        path: 'book-appointment',
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
