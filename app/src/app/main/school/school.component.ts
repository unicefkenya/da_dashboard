import {Component, OnInit, ElementRef} from '@angular/core';
import {AppModule} from '../../app.module';
import { NgForm } from '@angular/forms';
import { SchoolRegistration } from './school';
import { Response } from '@angular/http';
import {SchoolService} from './school.service';




@Component({
  selector: 'app-edit',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss'],
  providers: [SchoolService]
})


export class SchoolComponent implements OnInit{
  editing = {};
  rows = [];

  constructor(
    private _schoolRegistrationService: SchoolService
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


  public headTeachers: any[] = [];
  public schoolConstituency;
  public submitted: boolean =  true;
  public school: SchoolRegistration;

  ngOnInit(){
    //this.onSubmit;
    this.getHeadTeacherData();
    this.getSchoolConstituencies();
  }


  onSubmit(registerSchool: SchoolRegistration){
    if(!this.submitted){

      //edit
    }else{
      this.school = new SchoolRegistration(registerSchool.schoolName, registerSchool.headTeacherName,registerSchool.headTeacherPhone, registerSchool.schoolCode, registerSchool.emisCode, registerSchool.waterSource, registerSchool.constituency);

      this._schoolRegistrationService.sendData({
            school_name: registerSchool.schoolName,
            school_code: registerSchool.schoolCode,
            geo_cordinates: 0,
            emis_code: registerSchool.emisCode,
            constituency: registerSchool.constituency,
            source_of_water: registerSchool.waterSource,
            headteacher: registerSchool.headTeacherName,
            phone_no: registerSchool.headTeacherPhone
          })
          .subscribe(
            data => console.log(data)
          );
        }
  }

  getHeadTeacherData(){
    this._schoolRegistrationService.getHeadTeacherData()
      .subscribe(
        res=>{
          const teacher = [];
          for(let id in res){
            teacher.push(res[id]);
          }
          this.headTeachers = teacher;
          console.log(teacher);
        },
      (err) => console.log(err),
      ()=>console.log("Done")
    );
  }

  getSchoolConstituencies(){

    this._schoolRegistrationService.getConstituencies()
      .subscribe(
        (res)=>{
          const name = [];
          for (let constituency in res){
            name.push(res[constituency]);
          }
          this.schoolConstituency = name;
          console.log(name);
        },
      (err) => console.log(err),
      ()=>console.log("Done")
    );
  }


}
