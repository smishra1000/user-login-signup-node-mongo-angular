import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { UserService } from "../user.service";
import { User } from './../user.interface';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  userId:any;
  submitted = false;

  constructor(private activatedRoute: ActivatedRoute,private formBuilder: FormBuilder,private http: HttpClient, private router: Router, public userService: UserService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
    });
    this.getUser();
      this.userForm = this.formBuilder.group({
        _id: [],
        name: ['', [Validators.required, Validators.maxLength(50)]],
        age: ['', [Validators.required, Validators.maxLength(50)]],
        mobile: ['', [Validators.required, Validators.maxLength(10)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(75)]],
        password: ['', [Validators.required, Validators.minLength(3)]],
      });
  }

  invalidName()
  {
  	return (this.submitted && this.userForm.controls.name.errors != null);
  }

  invalidLastName()
  {
  	return (this.submitted && this.userForm.controls.last_name.errors != null);
  }

  invalidEmail()
  {
  	return (this.submitted && this.userForm.controls.email.errors != null);
  }

  invalidAge()
  {
  	return (this.submitted && this.userForm.controls.age.errors != null);
  }
  invalidMobile()
  {
  	return (this.submitted && this.userForm.controls.age.errors != null);
  }

  invalidPassword()
  {
  	return (this.submitted && this.userForm.controls.password.errors != null);
  }

  getUser() {
    this.userService.getUserById(this.userId).subscribe( res => {
      this.userForm.patchValue({
        name: res.name, 
        age: res.age, 
        mobile: res.mobile, 
        email: res.email, 
      });
    });
  }

  onSubmit() {
    this.userService.updateUser(this.userId,this.userForm.value)
      .subscribe( data => {
        this.router.navigate(['/users']);
      });
  }
  cancel(){
    this.router.navigate(['/users']);
  }

}
