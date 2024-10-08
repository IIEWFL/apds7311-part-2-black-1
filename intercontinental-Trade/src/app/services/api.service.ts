import { Injectable } from '@angular/core';
import { environment } from '../environments/environments.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverUrl = environment.nodeApiUrl

  constructor(private shared: SharedService, private http:HttpClient) { }

  //login endpoint
  register(endpoint:any, body:any) {
    return this.http.post(this.serverUrl + endpoint, body)
  }

  //register enpoint
  login(body:any) {
    return this.http.post(`${this.serverUrl}/login`, body)
  }

  // generic post endpoint
  genericPost(endpoint:any, body:any) {
    const headers = this.getAuthHeaders();
    return this.http.post(this.serverUrl + endpoint, body, {headers})
  }

  //get endpoint
  genericGet(){
    return this.http.get(`${this.serverUrl}/get-transactions`)
  }

  //find endpoint
  findTransaction(endpoint:any) {
    return this.http.get(this.serverUrl + endpoint)
  }

  //update endpoint
  update(endpoint:any, body:any) {
    return this.http.put(this.serverUrl + endpoint, body)
  }


  // private function to get the users token
  private getAuthHeaders(): HttpHeaders {
    const token = this.shared.get('session', 'token')  // Retrieve JWT from localStorage or another storage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

}
