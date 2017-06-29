import {Component, OnInit, ElementRef} from '@angular/core';
import {AppModule} from '../../app.module';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { SchoolRegistration } from './school';
import { Response } from '@angular/http';
import {AddSchoolService} from './addschool.service';

@Component({
  selector: 'add-school',
  templateUrl: './addschool.component.html',
  styleUrls: ['./addschool.component.scss'],
  providers: [AddSchoolService]
})


export class AddSchoolsComponent implements OnInit {
  editing = {};
  rows = [];

  constructor(
    private _schoolRegistrationService: AddSchoolService,
    private fb: FormBuilder
  ){
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.rows[row.$$index][cell] = event.target.value;
  }

  public success;
  public fail;
  public empty;
  public schoolConstituency;
  public schoolCounty;
  public submitted: boolean =  true;
  public school: SchoolRegistration;
  public form: FormGroup;

  ngOnInit(){
    //this.onSubmit;
    this.form = this.fb.group({
      schoolName: [null, Validators.compose([Validators.required,])],
      schoolCode: [null],
      emisCode: [null],
      county: [null, Validators.compose([Validators.required])],
      zone: [null, Validators.compose([Validators.required])],
      waterSource: [null, Validators.compose([Validators.required])],
      long_geo_cordinates: [null],
      lat_geo_cordinates: [null]
    });
    this.getSchoolCounties();
    this.getSchoolConstituencies();

  }


  onSubmit(registerSchool: SchoolRegistration){
    if(!this.submitted){

      //edit
    }else{
      this.school = new SchoolRegistration(registerSchool.schoolName, registerSchool.schoolCode, registerSchool.emisCode, registerSchool.long_geo_cordinates,registerSchool.lat_geo_cordinates,registerSchool.waterSource, registerSchool.zone,registerSchool.county);

      this._schoolRegistrationService.sendData({
            school_name: registerSchool.schoolName,
            school_code: registerSchool.schoolCode,
            geo_cordinates: (registerSchool.long_geo_cordinates)+","+(registerSchool.lat_geo_cordinates),
            emis_code: registerSchool.emisCode,
            zone: registerSchool.zone,
            county: registerSchool.county,
            source_of_water: registerSchool.waterSource
          })
          .subscribe(
            data => //console.log(data)
            {
              console.log("Added School Successfully"),
              this.success = "Added School Successfully";
              this.form.reset();
            },
            error =>{
              this.empty = "This field is required";
              this.fail = "Failed to save data";
            }
          );
        }
  }


  resetButton(){
    this.form.reset();
  }

  getSchoolCounties(){

    this._schoolRegistrationService.getCounties()
      .subscribe(
        (res)=>{
          const countyName = [];
          for (let county_name in res){
            countyName.push(res[county_name]);
          }
          this.schoolCounty = countyName;
          console.log(countyName);
        },
      (err) => console.log(err),
      ()=>console.log("Done")
    );
  }

  getSchoolConstituencies(){

    this._schoolRegistrationService.getConstituencies()
      .subscribe(
        (res)=>{
          const constituencyName = [];
          for (let constituency in res){
            constituencyName.push(res[constituency]);
          }
          this.schoolConstituency = constituencyName;
          console.log(constituencyName);
        },
      (err) => console.log(err),
      ()=>console.log("Done")
    );
  }
}
