import {Directive, EventEmitter, Input,Output,Component, OnInit,ElementRef} from '@angular/core';
import {DatePipe} from '@angular/common';
import { Router } from '@angular/router';

import { PartnersRoutes } from '../partners.routing';
import {AppModule} from '../../app.module';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { Response } from '@angular/http';
import { AddPartnerService} from '../addpartner/addpartner.service';
import { PartnerRegistration} from '../partners';

/*
@Directive({
  selector: '[focus]'
})*/

@Component({
  selector: 'add-school',
  templateUrl: './addpartner.component.html',
  styleUrls: ['./addpartner.component.scss'],
  providers: [AddPartnerService],

})


export class AddPartnerComponent implements OnInit {
  editing = {};
  rows = [];

  constructor(
    private partnerService: AddPartnerService,
    public _router: Router,
    private fb: FormBuilder
  ){}

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.rows[row.$$index][cell] = event.target.value;
  }

  public success;
  public fail;
  public empty;
  public date;
  public isVisible;
  public submitted: boolean =  true;
  public form: FormGroup;
  public partner;

  ngOnInit(){
    //this.onSubmit;
    this.form = this.fb.group({
      partner_name: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      
    });
  }

  onSubmit(registerPartner: PartnerRegistration, form){

    if(!this.submitted){

    }else{
      this.partner = new PartnerRegistration(
                    registerPartner.partner_name,
                    registerPartner.phone,
                    registerPartner.email
                  );

      this.partnerService.sendData({

              	name: registerPartner.partner_name,
              	phone: registerPartner.phone,
              	email: registerPartner.email 

          }).subscribe(
            data => //console.log(data)
            {
              console.log("Added Classes Successfully"),
              this.success = "Added Classes Successfully";
              this.resetButton();
            },
            error => {
              this.empty = "This field is required";
              this.fail = "Failed to save data";
            }
          );
        }
  }

  resetButton(){
    this.form.reset();
  }

  showInput(){
    this.isVisible = this.isVisible ? false : true;
  }

}
