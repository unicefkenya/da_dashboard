import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ResetpasswordService} from './resetpassword.service';
//import { Partner } from './partner';


import { FormBuilder, FormGroup, Validators, FormControl,FormsModule,AbstractControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ResetPassword } from './resetpassword';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
  providers: [ResetpasswordService]
})

export class ResetpasswordComponent implements OnInit {
  public submitted: boolean = true;
  public changePsd: ResetpasswordService;
  public form: FormGroup;
  public psd: ResetPassword;
  public error: any;
  public success;
  public fail;
  public empty;

    constructor(
      private _changePasswordService: ResetpasswordService,
      private fb: FormBuilder
    ){
      //this.onSubmit;
      this.form = this.fb.group({
        username: [null, Validators.compose([Validators.required,])],
        newPassword: [null, Validators.compose([Validators.required])],
        confirmPassword: [null, Validators.compose([Validators.required])],
      }, {
      validator: this.MatchPassword // confirm password validation method
    });
    }

  ngOnInit(){}

  onSubmit(changePsd: ResetPassword){
    if(!this.submitted){

      //edit
    }else{

      this.psd = new ResetPassword(
        changePsd.username,
        changePsd.newPassword,
        changePsd.confirmPassword
      );

      this._changePasswordService.sendData({
                  username: changePsd.username,
                  new_password: changePsd.newPassword,
    })
    .subscribe(
      data => //console.log(data)
      {
        this.success = "Changed Password Successfully";
        this.form.reset();
      },
      error =>{
        if(error.old_password[0]){
          this.fail = 'Kindly input the correct password';
        }else{
          this.fail = 'Failed to change password. Kindly try again later';
        }
      }
    );

    }
  }

  resetButton(){
    this.form.reset()
  }

  //confirmPassword
  MatchPassword(AC: AbstractControl) {
   let password = AC.get('newPassword').value; // value of the new password
   let confirmPassword = AC.get('confirmPassword').value; // value of the confirm password
    if(password != confirmPassword) {
        //console.log('false');
        AC.get('confirmPassword').setErrors( {MatchPassword: true} )
    } else {
        //console.log('true');
        return null
    }
  }
}
