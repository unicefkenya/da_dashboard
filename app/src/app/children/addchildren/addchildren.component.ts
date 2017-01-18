import {Component, OnInit, ElementRef} from '@angular/core';
import {AppModule} from '../../app.module';
import { FormsModule,NgForm } from '@angular/forms';
import { ChildRegistration } from './children';
import { Response } from '@angular/http';
import {AddChildrenService} from './addchildren.service';

@Component({
  selector: 'add-school',
  templateUrl: './addchildren.component.html',
  styleUrls: ['./addchildren.component.scss'],
  providers: [AddChildrenService]

})


export class AddChildrenComponent implements OnInit {
  editing = {};
  rows = [];

  constructor(
    private _childRegistrationService: AddChildrenService
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
  public schoolConstituency;
  public schoolCounty;
  public submitted: boolean =  true;
  public school: ChildRegistration;

  ngOnInit(){
    //this.onSubmit;
    this.getSchoolCounties();
    this.getSchoolConstituencies();

  }


  onSubmit(registerChild: ChildRegistration){
    if(!this.submitted){

      //edit
    }else{
      this.school = new ChildRegistration(registerChild.schoolName, registerChild.schoolCode, registerChild.emisCode, registerChild.geo_cordinates,registerChild.waterSource, registerChild.headTeacherName, registerChild.headTeacherPhone,registerChild.zone,registerChild.county);

      this._childRegistrationService.sendData({
            school_name: registerChild.schoolName,
            school_code: registerChild.schoolCode,
            geo_cordinates: registerChild.geo_cordinates,
            emis_code: registerChild.emisCode,
            zone: registerChild.zone,
            county: registerChild.county,
            source_of_water: registerChild.waterSource
          })
          .subscribe(
            data => console.log(data)
          );
          console.log("Added School Successfully");
          this.success = "Added School Successfully";
        }
  }

  getSchoolCounties(){

    this._childRegistrationService.getCounties()
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

    this._childRegistrationService.getConstituencies()
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
