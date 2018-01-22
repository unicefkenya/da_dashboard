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
  ){}


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
    //this.getSchoolConstituencies();

  }
subcountyForm:boolean = false;
  onSelect(event, data){
    console.log(event,data, 'wewe');
    this.subcountyForm = true;
    this.getSchoolConstituencies(data);
  }

  onSubmit(registerSchool: SchoolRegistration){
    if(!this.submitted){

      //edit
    }else{
      console.log(registerSchool.zone, 'This is the zone');
      this.school = new SchoolRegistration(registerSchool.schoolName, registerSchool.schoolCode, registerSchool.emisCode, registerSchool.long_geo_cordinates,registerSchool.lat_geo_cordinates,registerSchool.waterSource, registerSchool.zone,registerSchool.county);

      this._schoolRegistrationService.sendData({
            school_name: registerSchool.schoolName,
            school_code: registerSchool.schoolCode,
            geo_cordinates: (registerSchool.long_geo_cordinates)+","+(registerSchool.lat_geo_cordinates),
            emis_code: registerSchool.emisCode,
            zone_id: registerSchool.zone,
            county: registerSchool.county,
            source_of_water: registerSchool.waterSource
          })
          .subscribe(
            data => //console.log(data)
            {
              //console.log("Added School Successfully"),
              this.success = "Added School Successfully";
              this.form.reset();
            },
            error =>{
              console.log(error);
              this.empty = "This field is required";
              this.fail = "Failed to save data";
            }
          );
        }
  }


  resetButton(){
    this.form.reset();
  }
countyName:any;
county:any;
  getSchoolCounties(){

    this._schoolRegistrationService.getCounties()
      .subscribe(res=>{

          res = res.results;
          this.countyName = [];
          for(let i =0; i<res.length;i++){
            this.county = {};
            this.county.county_name = res[i].county_name;
            this.county.id = res[i].id;
            this.county.sub_counties = res[i].subcounties;
            this.countyName.push(this.county);
          }
           //console.log(this.countyName);
        });


  }
subcounties:any;
zones:any;
  getSchoolConstituencies(data){
    console.log(this.countyName[data].sub_counties, 'Data again', this.countyName[data-1].sub_counties);
    if(data == 1){
      this.subcounties = this.countyName[data-1].sub_counties;
    }{
      this.subcounties = this.countyName[data].sub_counties;
    }


    //console.log(data,this.subcounties, 'yeah');
  }
}
