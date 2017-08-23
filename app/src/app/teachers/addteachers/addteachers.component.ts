import {Directive, EventEmitter, Input,Output,Component, OnInit,ElementRef} from '@angular/core';
import {DatePipe} from '@angular/common';
import { Router } from '@angular/router';

import { TeachersRoutes } from './../teachers.routing';
import {AppModule} from '../../app.module';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { TeacherRegistration } from './teacher';
import { Response } from '@angular/http';
import {AddTeacherService} from './addteacher.service';

/*
@Directive({
  selector: '[focus]'
})*/


@Component({
  selector: 'add-school',
  templateUrl: './addteacher.component.html',
  styleUrls: ['./addteacher.component.scss'],
  providers: [AddTeacherService, DatePipe],
  //directives: [FocusDirective]

})


export class AddTeachersComponent implements OnInit {
  editing = {};
  rows = [];
  tr:any;
  schoolId:number;
  partnerId:number;
  public success;
  public fail;
  public empty;
  public date;
  public isVisible;
  public schoolName;
  public t_type;
  public currentDate = new Date();
  public submitted: boolean =  true;
  public teacher: TeacherRegistration;
  public form: FormGroup ;
  public subjects = [
    {subject:'Mathematics', value:'1'},
    {subject:'English', value:'2'},
    {subject:'Kiswahili', value:'3'},
    {subject:'Science', value:'4'},
    {subject:'Social Studies', value:'5'},
    {subject:'C.R.E', value:'6'}
  ]


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



  ngOnInit(){
    //this.onSubmit;
    this.form = this.fb.group({
      schoolName: [null, Validators.compose([Validators.required,])],
      gender: [null, Validators.compose([Validators.required])],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required, CustomValidators.number])],
      birthday: [null, Validators.compose([Validators.required, CustomValidators.date, CustomValidators.maxDate(this.currentDate)])],
      teacher_type: [null, Validators.compose([Validators.required])],
      qualifications: [null],
      tsc_no: [null],
      bom_no: [null],
      dateStarted: [null, Validators.compose([Validators.required, CustomValidators.date, CustomValidators.maxDate(this.currentDate)])],
      joinedCurrent: [null, Validators.compose([Validators.required, CustomValidators.date, CustomValidators.maxDate(this.currentDate)])],

    });
    this.schoolId = JSON.parse(localStorage.getItem("schoolId"));
    this.partnerId = JSON.parse(localStorage.getItem("partnerId"));
    if(this.partnerId){
      this.getSchoolNames(this.partnerId);
    }else if(this.schoolId){
      this.getSchoolName(this.schoolId);
    }

  }
customForm:any;
  onCheckboxChange(event) {
    //We want to get back what the name of the checkbox represents, so I'm intercepting the event and
    //manually changing the value from true to the name of what is being checked.

    //check if the value is true first, if it is then change it to the name of the value
    //this way when it's set to false it will skip over this and make it false, thus unchecking
    //the box
    if(this.customForm.get(event.target.id).value) {
        this.customForm.patchValue({[event.target.id] : event.target.id}); //make sure to have the square brackets
    }
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
              console.log(error)
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

  getTeacherType(){
    var tsc = "TSC";
    var bom = "BOM";
    const teacherType = [tsc,bom];
    //console.log(teacherType);
  }

  getSchoolNames(id){

    this._teacherRegistrationService.getSchools(id)
      .subscribe(
        (res)=>{
          res = res.results
          const schoolName = [];
          for (let i = 0;i < res.length;i++){
            this.tr = {}
            this.tr.school_name=res[i].school_name
            this.tr.id=res[i].id
            schoolName.push(this.tr)
          }
          this.schoolName = schoolName;
          //console.log(schoolName);
        },
      (err) => console.log(err)
    );
  }

  getSchoolName(id){
    this._teacherRegistrationService.getSchoolName(id).subscribe((data)=>{
      this.schoolName = data.results[0].school_name
    })
  }

}
