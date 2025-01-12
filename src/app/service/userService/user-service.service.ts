import { Injectable } from '@angular/core';
import {HttpserviceService} from '../httpService/httpservice.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpService:HttpserviceService) { }

  registerApiCall(data:any){
    return this.httpService.postApiCall("http://localhost:3000/api/v1/patient/register",data)
  }

  loginApiCall(data:any){
    return this.httpService.postApiCall("http://localhost:3000/api/v1/patient/login",data)
  }

  getSpecializationApiCall(data:any={}):Observable<any>{
   return this.httpService.getAllApiCall("http://localhost:3000/api/v1/patient/specializations",data)
  }
}
