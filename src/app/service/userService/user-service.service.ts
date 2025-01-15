import { Injectable } from '@angular/core';
import {HttpserviceService} from '../httpService/httpservice.service'
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpService:HttpserviceService) { }

  getAuthHeader() {
    const header = new HttpHeaders({ Authorization : `Bearer ${localStorage.getItem('authToken')}` || "" })
    console.log(header);
    return header
  }
  getUserId(): string {
    const token = localStorage.getItem('authToken'); // Replace 'authToken' with your token key
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      return payload.id; // Adjust this based on your token structure
    }
    return '';
  }


  registerApiCall(data:any){
    return this.httpService.postApiCall("http://localhost:3000/api/v1/patient/register",data)
  }

  loginApiCall(data:any){
    return this.httpService.postApiCall("http://localhost:3000/api/v1/patient/login",data)
  }

  getSpecializationApiCall(data:any={}):Observable<any>{
   return this.httpService.getAllApiCall("http://localhost:3000/api/v1/patient/specializations")
  }

  getDoctorsApiCall(data:any={}):Observable<any>{
    return this.httpService.postApiCall("http://localhost:3000/api/v1/patient/doctors",data)
  }

  bookAppointmentApiCall(data:any={}){
    return this.httpService.postApiCall("http://localhost:3000/api/v1/patient/appointment",data,{headers: this.getAuthHeader()})
  }

  getPatientInfo(data:any={}){
    return this.httpService.getAllApiCall(`http://localhost:3000/api/v1/patient/${data._id}/patientInfo`,{headers: this.getAuthHeader()})
  }

  updatePatientInfo(data:any={}){
    return this.httpService.putApiCall(`http://localhost:3000/api/v1/patient/${data._id}/updatePatientInfo`,data,{headers: this.getAuthHeader()})
  }
  getPatientAppointments(data:any={}){
    return this.httpService.getAllApiCall(`http://localhost:3000/api/v1/patient/${data._id}/appointments`,{headers: this.getAuthHeader()})
  }
  getBillDetails(data:any={}){
    return this.httpService.getAllApiCall(`http://localhost:3000/api/v1/patient/${data._id}/bill`,{headers: this.getAuthHeader()})
  }
  registerDoctor(data:any={}){
    return this.httpService.putApiCall(`http://localhost:3000/api/v1/doctor/register`,data)
  }
  doctorLoginApiCall(data:any={}){
    return this.httpService.postApiCall("http://localhost:3000/api/v1/doctor/login",data)
  }
}
