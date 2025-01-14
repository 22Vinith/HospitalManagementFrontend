import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(private httpClient:HttpClient) { }

  postApiCall(endpoint: string, data: any, options: any = {}) {
    return this.httpClient.post(endpoint, data, options)
  }

  getAllApiCall(endpoint: string, options: any = {}): Observable<any>{
    return this.httpClient.get(endpoint,options)
  }

  putApiCall(endpoint: string,data:any, options: any = {}){
    return this.httpClient.put(endpoint,data,options)
  }
}
