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
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _signin: SigninService) {}

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    if(!this._signin.login(this.user)){
      this.errorMsg = 'Failed to login';
    }else{
  	   this.router.navigate(['/dashboard']);
    }
  }


}
