import {Component, OnInit, ElementRef} from '@angular/core';
import {DatePipe} from '@angular/common';
import { Router } from '@angular/router';
import {AppModule} from '../../app.module';
import { FormsModule,NgForm } from '@angular/forms';
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
    public router: Router
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
  public date;
  public schoolName;
  public submitted: boolean =  true;
  public teacher: TeacherRegistration;
  form: NgForm;

  ngOnInit(){
    //this.onSubmit;
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
            data => console.log(data)
          );
          console.log("Added Teacher Successfully", registerTeacher.joinedCurrent );
          this.success = "Added Teacher Successfully";
          

        }
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
