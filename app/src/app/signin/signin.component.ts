import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule,NgForm,FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { SigninService } from './signin.service';
import { User } from './user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [SigninService]
})


export class SigninComponent implements OnInit {

  public user = new User('','');
  public errorMsg = '';
  public success;
  public form: FormGroup;
  public userLogin: User;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _signin: SigninService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit(){
    var email = this.form.value.email;
    var password = this.form.value.password;

    console.log(email, password);
    this.user = new User(email,password);


    this._signin.login(
      "username="+email+"&password="+password+"&grant_type=password&client_id=dnFhSdWfy2XjFqTzpSLMbYqRKOgGei2eG7hUnNDS"
    ).subscribe(
      data => console.log(data),

    );
    console.log("Login Successfully");
    this.success = "Logged In Successfully";


    if(!(this.user)){
      this.router.navigate(['/signin']);
      this.errorMsg = 'Failed to login';
      console.log(this.errorMsg);
    }else{
       this.router.navigate(['/home']);
    }
  }

  }
