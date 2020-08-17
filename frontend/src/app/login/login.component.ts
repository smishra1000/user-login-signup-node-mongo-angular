import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registered = false;
  submitted = false;
  error=null;

  constructor(private formBuilder: FormBuilder,private http: HttpClient, private router: Router) {
    //checking condition if user logged in then redirect to users page directly;
    //need to implement authGaurd for better understanding
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser && currentUser.token) {
      this.router.navigate(['/users']);
    }else {
      this.router.navigate(['/login']);//if not then redirect ot login page/
    }
   }


   invalidEmail()
  {
  	return (this.submitted && this.loginForm.controls.email.errors != null);
  }

  invalidPassword()
  {
  	return (this.submitted && this.loginForm.controls.password.errors != null);
  }
  ngOnInit()
  {
  	this.loginForm = this.formBuilder.group({
  
  		email: ['', [Validators.required, Validators.email, Validators.maxLength(75)]],
  		password: ['', [Validators.required, Validators.minLength(3)]],
  	});
  }


  onSubmit() {
    this.submitted = true;
    this.error=null;

  	if(this.loginForm.invalid == true)
  	{
  		return;
  	}
    let data: any = Object.assign({}, this.loginForm.value);
    //need to move in auth service file.
    this.http.post('http://localhost:3000/auth/login', data).subscribe((data: any) => {
      this.registered = true;
      if(data.status==="error") {
        this.error = data.message;
        this.router.navigate(['/login']);
      }else{
        if(data.data.token) {
          localStorage.setItem('currentUser', JSON.stringify({ token: data.data.token }));// setting token in localstorage .
        }
        this.router.navigate(['/users']);//after successful login redirecting to users page
      }
    
    }, error => {
      this.error = error.message;
      this.router.navigate(['/login']);
    });
  }

}
