import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  //getting from session storage
  get(sessionType:any, key:any) {
    const data = sessionType == 'session' ? sessionStorage.getItem(key) : localStorage.getItem(key)
    return data ? JSON.parse(data) : data
  }

  //setting to session storage service
  set(sessionType:any, key:any, value:any) {
    const data = sessionType == 'session' ? sessionStorage.setItem(key, JSON.stringify(value)) : localStorage.setItem(key, JSON.stringify(value))
    return data 
  }
}
