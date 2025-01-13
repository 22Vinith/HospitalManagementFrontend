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
}
