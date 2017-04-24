import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  public fail;
  public status;
  public form: FormGroup;
  public userLogin: User;
  returnUrl: string;
  loading =false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private _signin: SigninService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
    //reset login status
    this._signin.logout();

    //get return url from route parameters or default to '/home'
    this.returnUrl = this.activatedRouter.snapshot.queryParams['returnUrl'] || '/home';
  }

  onSubmit(){
    var email = this.form.value.email;
    var password = this.form.value.password;

    this.user = new User(email,password);
    this.status  = true;

    this._signin.login(
      "username="+email+"&password="+password+"&grant_type=password&client_id=dnFhSdWfy2XjFqTzpSLMbYqRKOgGei2eG7hUnNDS"
    ).subscribe(
      data => //console.log(data),
      {
        this.success = "Logged In Successfully";
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.fail = "Wrong Username/ Password combination";
        this.form.reset();
      }

    );
    //console.log("Login Successfully");

  }

  }
