import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { AuthService } from "../auth.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  serviceErrors: any = {};
  registered = false;
  submitted = false
  error=null;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public authService: AuthService
  ) {}

  invalidName() {
    return this.submitted && this.userForm.controls.name.errors != null;
  }

  invalidLastName() {
    return this.submitted && this.userForm.controls.last_name.errors != null;
  }

  invalidEmail() {
    return this.submitted && this.userForm.controls.email.errors != null;
  }

  invalidAge() {
    return this.submitted && this.userForm.controls.age.errors != null;
  }
  invalidMobile() {
    return this.submitted && this.userForm.controls.age.errors != null;
  }

  invalidPassword() {
    return this.submitted && this.userForm.controls.password.errors != null;
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      _id: [],
      name: ["", [Validators.required, Validators.maxLength(50)]],
      age: ["", [Validators.required, Validators.maxLength(50)]],
      mobile: ["", [Validators.required, Validators.maxLength(10)]],
      email: [
        "",
        [Validators.required, Validators.email, Validators.maxLength(75)],
      ],
      password: ["", [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    //Calling validate phone function
    if(this.ValidatePhoneNo(this.userForm.controls.mobile)==false){
      return;
    }

    if (this.userForm.invalid == true) {
      return;
    }
    this.authService.register(this.userForm.value).subscribe((data) => {
      this.registered = true;
      this.router.navigate(["/login"]);
    });
  }

  
  //To do need to move in some common place;keeping for now;
  ValidatePhoneNo(phoneNo) {

    if (phoneNo.value == "" || phoneNo.value == null) {
      this.error = "Please enter your Mobile No.";
      return false;
    }
    if (phoneNo.value.length < 10 || phoneNo.value.length > 10) {
      this.error = "Mobile No. is not valid, Please Enter 10 Digit Mobile No.";
      return false;
    }
    return true;
  }
}
