import {Component, OnInit, ElementRef} from '@angular/core';
import {DatePipe} from '@angular/common';
import { Router } from '@angular/router';

import { TeachersRoutes } from './../teachers.routing';
import {AppModule} from '../../app.module';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { TeacherRegistration } from './teacher';
import { Response } from '@angular/http';
import {AddTeacherService} from './addteacher.service';

@Component({
  selector: 'add-school',
  templateUrl: './addteacher.component.html',
  styleUrls: ['./addteacher.component.scss'],
  providers: [AddTeacherService, DatePipe]

})


export class AddTeachersComponent implements OnInit {
  editing = {};
  rows = [];

  constructor(
    private _teacherRegistrationService: AddTeacherService,
    public datepipe:DatePipe,
    public _router: Router,
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
  public date;
  public isVisible;
  public schoolName;
  public currentDate = new Date();
  public submitted: boolean =  true;
  public teacher: TeacherRegistration;
  public form: FormGroup ;

  ngOnInit(){
    //this.onSubmit;
    this.form = this.fb.group({
      schoolName: [null, Validators.compose([Validators.required,])],
      gender: [null, Validators.compose([Validators.required])],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required, CustomValidators.phone('nb-NO')])],
      birthday: [null, Validators.compose([Validators.required, CustomValidators.date])],
      teacher_type: [null, Validators.compose([Validators.required])],
      qualifications: [null, Validators.compose([Validators.required])],
      tsc_no: [null, Validators.compose([Validators.required])],
      bom_no: [null, Validators.compose([Validators.required])],
      dateStarted: [null, Validators.compose([Validators.required, CustomValidators.date])],
      joinedCurrent: [null, Validators.compose([Validators.required, CustomValidators.date, CustomValidators.maxDate(this.currentDate)])],

    });
    this.getSchoolNames();

  }


  onSubmit(registerTeacher: TeacherRegistration, form){
    var joinedCurrent = this._teacherRegistrationService.transformDate(registerTeacher.joinedCurrent);

    if(!this.submitted){

      //edit
    }else{
      this.teacher = new TeacherRegistration(
                        registerTeacher.schoolName,
                        registerTeacher.firstName,
                        registerTeacher.lastName,
                        registerTeacher.phoneNumber,
                        registerTeacher.birthday,
                        registerTeacher.teacher_type,
                        registerTeacher.tsc_no,
                        registerTeacher.bom_no,
                        registerTeacher.qualifications,
                        registerTeacher.dateStarted,
                        registerTeacher.joinedCurrent,
                        registerTeacher.gender
                      );
      this._teacherRegistrationService.sendData({username:  registerTeacher.phoneNumber,"details":{

                  school: registerTeacher.schoolName,
                  phone_no: registerTeacher.phoneNumber,
                  fstname:   registerTeacher.firstName,
                  lstname:   registerTeacher.lastName,
                  birthday:  registerTeacher.birthday,
                  teacher_type:registerTeacher.teacher_type,
                  qualifications: registerTeacher.qualifications,
                  tsc_no: registerTeacher.tsc_no,
                  bom_no: registerTeacher.bom_no,
                  subjects: [1],
                  date_started_teaching: registerTeacher.dateStarted,
                  joined_current_school:  registerTeacher.joinedCurrent,
                  gender: registerTeacher.gender
          }})
          .subscribe(
            data => //console.log(data)
            {
              console.log("Added Teacher Successfully"),
              this.success = "Added Teacher Successfully";
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

  showInput(){
    this.isVisible = this.isVisible ? false : true;
  }

  getSchoolNames(){

    this._teacherRegistrationService.getSchools()
      .subscribe(
        (res)=>{
          const schoolName = [];
          for (let schoolname in res){
            schoolName.push(res[schoolname]);
          }
          this.schoolName = schoolName;
          console.log(schoolName);
        },
      (err) => console.log(err),
      ()=>console.log("Done")
    );
  }

}
