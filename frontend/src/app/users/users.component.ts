import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { UserService } from "../user.service";
import { User } from './../user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  name: string;
  age: number;
  mobile: any;
  password:any;
  email:any;
  selectedValue = null;
  users: any[];
  selectedItem: any = {};

  constructor(private http: HttpClient, private router: Router, public userService: UserService) {
    this.getAllUsers();
    // checking condition for logged in user if not logged in redirecting to login page;
    //we can handle it by AuthGaurd for every protected routes.
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.getAllUsers();// loading all users.
  }

/**
 * updating the selected user
 */
  edit(id) {
    this.router.navigate(['/edit-user/',id]);
  }
  /**
   * getting all created users from backend
   */

  getAllUsers() {
    return this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
    })
  }
  /**
   * creating user
   */
  add() {
    this.router.navigate(['/add-user']);
  }

  /**
   * deleting selected use list item and clearing field.
   */
  delete(id) {
    this.userService.deleteUser(id).subscribe(data => {
      console.log(data);
      this.getAllUsers();
    });
  }

  /*
  logout: clearing localstorage
  */
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

