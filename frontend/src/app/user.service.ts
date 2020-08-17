import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  getAllUsers() {
    return this.http.get<User[]>(this.apiURL + '/users/getAll')
  }

  createUser(user: User){
    return this.http.post(this.apiURL+ '/users/create', user);
  }

  getUserById(id: string){
    return this.http.get<User>(this.apiURL + '/users' + '/' + id);
  }

  deleteUser(id){
    return this.http.delete(this.apiURL + '/users/'+id+'/delete', this.httpOptions)
  }

  updateUser(userId:string,user: User){
    return this.http.put(this.apiURL + '/users/'+ userId+'/update', user);
  }
}
