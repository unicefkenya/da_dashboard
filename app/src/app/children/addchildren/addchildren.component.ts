import {Component, OnInit, ElementRef} from '@angular/core';
import {AppModule} from '../../app.module';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ChildRegistration } from './children';
import { Response } from '@angular/http';
import {AddChildrenService} from './addchildren.service';

@Component({
  selector: 'add-child',
  templateUrl: './addchildren.component.html',
  styleUrls: ['./addchildren.component.scss'],
  providers: [AddChildrenService]

})


export class AddChildrenComponent implements OnInit {
  editing = {};
  rows = [];
  cl:any;
  public currentDate = new Date();

  constructor(
    private _childRegistrationService: AddChildrenService,
    private fb: FormBuilder
  ){
    this.form = this.fb.group({
      firstName: [null, Validators.compose([Validators.required,])],
      maidenName: [null],
      lastName: [null, Validators.compose([Validators.required,])],
      gender: [null, Validators.compose([Validators.required])],
      admNo: [null, Validators.compose([Validators.required])],
      enrolDate: [null, Validators.compose([Validators.required, CustomValidators.date, CustomValidators.maxDate(this.currentDate)])],
      dateOfBirth: [null, Validators.compose([Validators.required, CustomValidators.date, CustomValidators.maxDate(this.currentDate)])],
      className: [null, Validators.compose([Validators.required])],
      previousClass: [null, Validators.compose([Validators.required, CustomValidators.number])],
      notInSchool: [null, Validators.compose([Validators.required])],
      modeOfTransport: [null, Validators.compose([Validators.required])],
      timeToSchool: [null, Validators.compose([Validators.required])],
      stayWith: [null],
      householdNumber: [null],
      mealsInDay: [null, Validators.compose([Validators.required, CustomValidators.number])]
    });
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
  public schoolClasses;
  public submitted: boolean =  true;
  public school: ChildRegistration;
  public form: FormGroup;
  schoolId:number;
  ngOnInit(){
    //this.onSubmit;
    this.schoolId = JSON.parse(localStorage.getItem("schoolId"));
    this.getSchoolClasses(this.schoolId);
  }

  onSubmit(registerChild: ChildRegistration){
    if(!this.submitted){

      //edit
    }else{
      this.school = new ChildRegistration(
                            registerChild.firstName,
                            registerChild.maidenName,
                            registerChild.lastName,
                            registerChild.admNo,
                            registerChild.enrolDate,
                            registerChild.gender,
                            registerChild.dateOfBirth,
                            registerChild.className,
                            registerChild.previousClass,
                            registerChild.notInSchool,
                            registerChild.modeOfTransport,
                            registerChild.timeToSchool,
                            registerChild.stayWith,
                            registerChild.householdNumber,
                            registerChild.mealsInDay
                          );

      this._childRegistrationService.sendData({
                  fstname: registerChild.firstName,
                  midname: registerChild.maidenName,
                  lstname: registerChild.lastName,
                  admission_no: registerChild.admNo,
                  date_enrolled: registerChild.enrolDate,
                  gender: registerChild.gender,
                  date_of_birth: registerChild.dateOfBirth,
                  class_id: registerChild.className,
                  previous_class: registerChild.previousClass,
                  not_in_school_before: registerChild.notInSchool,
                  mode_of_transport: registerChild.modeOfTransport,
                  time_to_school: registerChild.timeToSchool,
                  stay_with: registerChild.stayWith,
                  household: registerChild.householdNumber,
                  meals_per_day: registerChild.mealsInDay
          })
          .subscribe(
            data => //console.log(data)
            {
              //console.log("Added Child Successfully"),
              this.success = "Added Child Successfully";
              this.form.reset();
            },
            error =>{
              this.empty = "This field is required";
              this.fail = "Failed to save data";
            }
          );
          //console.log("Added Child Successfully");
          this.success = "Added Child Successfully";

        }
  }

  resetButton(){
    this.form.reset();
  }

  getSchoolClasses(id){

    this._childRegistrationService.getClass(id)
      .subscribe(
        (res)=>{
          res = res.results
          const className = [];
          for (let i = 0;i < res.length;i++){
            this.cl = {}
            this.cl.class_name=res[i].class_name
            this.cl.id=res[i].id
            className.push(this.cl)
          }
          this.schoolClasses = className;
        },
      (err) => console.log(err),
    );
  }
}
