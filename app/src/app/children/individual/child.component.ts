import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {ChildService} from './child.service';
import { ChildRegistration } from '../addchildren/children';
import {AddChildrenService} from '../addchildren/addchildren.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  providers: [ChildService, AddChildrenService]
})
export class ChildComponent {

  editProfile:boolean = false;
  public form: FormGroup;
  public currentDate = new Date();
  public success;
  public fail;
  public empty;
  public percentAttendance:any=0
  public schoolClasses;
  public submitted: boolean =  true;
  public school: ChildRegistration;

  constructor(private childService: ChildService,private route:ActivatedRoute,private fb: FormBuilder,  private _childRegistrationService: AddChildrenService) {
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
  }

  public sub;
  ngOnInit():void{
    //checks if the id param navigations have changed

    this.sub = this.route.params.subscribe(params => {
     let childId = +params['id'];
     //console.log(schoolId);
     this.getChildData(childId);
     this.getSchoolClasses();
     this.childAttendance(childId);
   });
}
  public firstname;
  public midname;
  public lastname;
  public childname;
  public class_;
  public emiscode;
  public gender;
  public mode_of_transport;
  public time_to_school;
  public schoolName;
  public staywith;
  public household;
  public meals;
  public dob;
  public enrolled;
  public enrolDate;
  public childType;
  public guardian;
  public phone;
  public previousClass;

  public attendancePercentage;
  public childStatus;
  public inSchool;

  public getChildData(id){
    this.childService.fetchChild(id).subscribe(
      (data)  =>
      {
        this.firstname = data.fstname;
        this.midname = data.midname;
        this.lastname = data.lstname;
        this.childname = data.midname+" "+data.lstname;
        this.emiscode = data.emis_code;
        this.mode_of_transport = data.mode_of_transport;
        this.previousClass = data.previous_class;
        this.time_to_school = data.time_to_school;
        this.schoolName = data.school_name;
        this.staywith = data.stay_with;
        this.household =data.household;
        this.meals = data.meals_per_day;
        this.dob = data.date_of_birth;
        this.class_ = data.class_name;
        this.enrolDate = data.date_enrolled;
        this.inSchool = data.not_in_school_before;
        data.guardian_name;
        this.phone = data.guardian_phone;

        if(data.newly_enrolled = "true"){
          this.enrolled = "New";
        }

        if(data.not_in_school_before = "false"){
          this.childType = "OOSC";
        }

        if(data.date_of_birth = "null"){
          this.dob = "N/A";
        }

        if(data.guardian_name = "null"){
          this.guardian = "N/A";
        }


        if(data.gender = "M"){
          this.gender = "Male";
        }
        else if(data.gender = "F"){
          this.gender = "Female";
        }


      },
      error =>{

        let errorSearch = 'Id  not found';
      }
    );
  }

  public childAttendance(id){
    this.childService.fetchChildAttendance(id).subscribe(
      (data)  =>
      {
        console.log(data.results[0]);
        let present=data.results[0]["present"]
        let total=data.results[0]["total"]
        let per=Math.round(present/total*100)
        this.percentAttendance=per
        console.log(per);
      });
  }
  getSchoolClasses(){

    this._childRegistrationService.getClass()
      .subscribe(
        (res)=>{
          const className = [];
          for (let class_name in res){
            className.push(res[class_name]);
          }
          this.schoolClasses = className;
          console.log(className);
        },
      (err) => console.log(err),
      ()=>console.log("Done")
    );
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

      this._childRegistrationService.editData({
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
              console.log("Edited Child Successfully"),
              this.success = "Edited Child Successfully";
            },
            error =>{
              this.empty = "This field is required";
              this.fail = "Failed to edit data";
            }
          );
          console.log("Edited Child Successfully");
          this.success = "Edited Child Successfully";

        }
  }

}
