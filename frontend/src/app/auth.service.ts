import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  register(user){
    return this.http.post(this.apiURL+ '/auth/register', user);
  }
}
