import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {ChildService} from './child.service';
import { ChildRegistration } from '../addchildren/children';
import {AddChildrenService} from '../addchildren/addchildren.service';
import {ActivatedRoute} from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  providers: [ChildService, AddChildrenService]
})
export class ChildComponent implements OnInit{

  dialogRef: MdDialogRef<EditProfileDialog>;
  lastCloseResult: string;
  config: MdDialogConfig = {
    disableClose: false,
    width: '',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };


    constructor(private childService: ChildService,private route:ActivatedRoute,private fb: FormBuilder,public dialog: MdDialog) {}

    ngOnInit():void{
      //checks if the id param navigations have changed

      this.sub = this.route.params.subscribe(params => {
       let childId = +params['id'];
       //console.log(schoolId);
       this.getChildData(childId);
       //this.getSchoolClasses();
       this.childAttendance(childId);
       this.dailyChildAttendance(childId);
     });
  }

  open() {
    this.dialogRef = this.dialog.open(EditProfileDialog, this.config);
    this.dialogRef.afterClosed().subscribe(result => {
      this.lastCloseResult = result;
      this.dialogRef = null;
    });
  }

  public sub;
  public form: FormGroup;
  public percentAttendance:any=0
  public schoolClasses;


  public globalChartOptions: any = {
    responsive: true,
    legend: {
      display: false,
      position: 'bottom'
    }
  }
  public lineChartColors: Array < any > = [{ // grey
    backgroundColor: "#7986cb",
    borderColor: "#3f51b5",
    pointBackgroundColor: "#3f51b5",
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, { // dark grey
    backgroundColor: "#eeeeee",
    borderColor: "#e0e0e0",
    pointBackgroundColor: "#e0e0e0",
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }, { // grey
    backgroundColor: 'rgba(148,159,177,0.2)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];

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
  row: number [] = [];
  public attendancePercentage;
  public childStatus;
  public inSchool;
  public nonattendant;
  public attendant;

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
        let present=data.results[0]["present"]
        let total=data.results[0]["total"]
        if(total !=0 && present !=0){
          let per=Math.round(present/total*100)
            this.percentAttendance=per
        }
      });
  }


    // Bar
    public barChartLabels: string[] = [];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    public barChartData: any[] = [{}];

    public barChartOptions: any = Object.assign({
      scaleShowVerticalLines: false,
      scales: {
        xAxes: [{
          gridLines: {
            color: 'rgba(0,0,0,0.02)',
            zeroLineColor: 'rgba(0,0,0,0.02)'
          }
        }],
        yAxes: [{
          gridLines: {
            color: 'rgba(0,0,0,0.02)',
            zeroLineColor: 'rgba(0,0,0,0.02)'
          },
          position: 'left',
          ticks: {
            beginAtZero: true,
            suggestedMax: this.row
          }
        }]
      }
    }, this.globalChartOptions);

    public dailyChildAttendance(id){
      this.childService.fetchWeeklyAttendance(id).subscribe(
        (data)  =>
        {

          data=data.results;
          if(data != ""){
              this.attendant = data;
              console.log(data);
              let columns: string[] = [];
              let absents: number[] = [];
              let presents: number[] = [];

              let subset = data.slice(Math.max(data.length - 3, 0));

              for(let i=0; i< subset.length; i++){

                let date = new Date(subset[i].value);

                columns.push(date.toLocaleDateString());
                this.row = subset[i].total;
                presents.push(subset[i].present);
                absents.push(subset[i].absent);
              }

              this.barChartLabels = columns;

              this.barChartData = [{
                //display data for boys ranging from class 1 to 7
                //presents
                data: presents,
                label: 'Present Number of Days',
                borderWidth: 0
              }, {
                //absents
                data: absents,
                label: 'Absent Number of Days',
                borderWidth: 0
              }];
            }else{
              this.nonattendant = "hasn't been coming to school";
            }
          });

            }
/*
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
  }*/

}



  @Component({
    selector: 'demo-editprofile-dialog',
    template: `
            <md-card class="md-card-top">
              <md-toolbar color="warn">
                <span fxFlex="100">Child Details</span>
                <button md-icon-button>
                  <md-icon>close</md-icon>
                </button>
              </md-toolbar>
              <md-card-content>
                <small style="color: green;">{{success}}</small>
                <small style="color: red;">{{fail}}</small>
                <form [formGroup]="form" (ngSubmit)="onSubmit(form.value);" >
                  <div  fxLayout="row">
                    <div fxLayout="column"  class="mb-2 ml-xs mr-xs" style="width: 100%;">
                      <md-input dividerColor="primary"  placeholder="First Name (required)" name="firstName" value="{{firstname}}" FormControlName="firstName"  type="text"></md-input>
                      <!--<small *ngIf="form.controls['firstName'].hasError('required') && form.controls['firstName'].touched" class="md-text-warn">Kindly include a first name.</small>
                      -->
                    </div>
                    <div fxLayout="column"  class="mb-2 ml-xs mr-xs" style="width: 100%;">
                      <md-input dividerColor="primary" placeholder="Mid Name" value="{{midname}}" name="maidenName" FormControlName="maidenName" type="text"  ></md-input>
                    </div>

                    <div fxLayout="column"  class="mb-2 ml-xs mr-xs" style="width: 100%;">
                      <md-input dividerColor="primary" placeholder="Last Name (required)" value="{{lastname}}" name="lastName" FormControlName="lastName"   type="text" ></md-input>
                      <!--<small *ngIf="form.controls['lastName'].hasError('required') && form.controls['lastName'].touched" class="md-text-warn">Kindly include a last name.</small>
                      -->
                    </div>
                  </div>

                  <div  fxLayout="row">
                    <div fxLayout="column"  class="mb-2 ml-xs mr-xs" style="width: 100%;">
                      <md-input placeholder="Admission Number (required)" value="{{admNo}}" name="admNo" FormControlName="admNo"   type="text"></md-input>
                      <!--<small *ngIf="form.controls['lastName'].hasError('required') && form.controls['admNo'].touched" class="md-text-warn">Kindly include student's admission no.</small>
                      -->
                    </div>

                    <div fxLayout="column"  class="mb-2 ml-xs mr-xs" style="width: 100%;">
                      <md-input placeholder="Date Enrolled (required)" value="{{enrolDate}}" name="enrolDate" FormControlName="enrolDate" type="date"></md-input>
                      <!--<small *ngIf="form.controls['enrolDate'].hasError('required') && form.controls['enrolDate'].touched" class="md-text-warn">Kindly include a date.</small>
                      <small *ngIf="form.controls['enrolDate'].errors?.date && form.controls['enrolDate'].errors?.maxDate && form.controls['enrolDate'].touched" class="md-text-warn">Kindly include a valid date.</small>
                    -->
                    </div>
                  </div>

                  <div  fxLayout="row">
                    <span style="margin-right:90px;"></span>
                    <label>Gender</label>
                      <div fxLayout="column"  class="mb-2 ml-xs mr-xs" style="width: 70%;">
                        <md-radio-group value="{{gender}}" name="gender" FormControlName="gender">
                          <md-radio-button value="M">Male</md-radio-button>
                          <md-radio-button value="F">Female</md-radio-button>
                        </md-radio-group>
                        <!--<small *ngIf="form.controls['gender'].hasError('required') && form.controls['gender'].touched" class="md-text-warn">Kindly input the student's gender.</small>
                        -->
                      </div>

                      <div fxLayout="column"  class="mb-2 ml-xs mr-xs" style="width: 100%;">
                        <md-input placeholder="Birthday (required)" value="{{dateOfBirth}}" name="dateOfBirth" FormControlName="dateOfBirth" type="date"></md-input>
                        <!--<small *ngIf="form.controls['dateOfBirth'].hasError('required') && form.controls['dateOfBirth'].touched" class="md-text-warn">Kindly include a date.</small>
                        <small *ngIf="form.controls['dateOfBirth'].errors?.date && form.controls['dateOfBirth'].errors?.maxDate && form.controls['dateOfBirth'].touched" class="md-text-warn">Kindly include a valid date.</small>
                      -->
                      </div>
                  </div>

                  <div  fxLayout="row" >
                    <div fxLayout="column"  class="mb-2 ml-xs mr-xs" style="width: 30%;">
                      <md-select required [formControl]="form.controls['className']"  placeholder="Class (required)">
                        <md-option name="className" *ngFor = "let name of schoolClasses" value="{{name.id}}">
                          {{name.class_name}}
                        </md-option>
                      </md-select>
                      <!--<small *ngIf="form.controls['className'].hasError('required') && form.controls['className'].touched" class="md-text-warn">Kindly input the class.</small>
                      -->
                  </div>

                    <div fxLayout="column"  class="mb-2 ml-xs mr-xs" style="width: 40%;">
                      <md-input placeholder="Previous Class" value="{{previousClass}}" name="previousClass" FormControlName="previousClass" type="text"></md-input>
                      <!--<small *ngIf="form.controls['previousClass'].hasError('required') && form.controls['previousClass'].touched" class="md-text-warn">Kindly input the previous class.</small>
                      <small *ngIf="form.controls['previousClass'].errors?.number && form.controls['previousClass'].touched" class="md-text-warn">Kindly input a valid digit.</small>
                    -->
                    </div>

                    <div fxLayout="column"  class="mb-2 ml-xs mr-xs" style="width: 30%;">
                      <md-select ngModel  [formControl]="form.controls['notInSchool']" placeholder="Been in school before?">
                        <md-option selected value="{{inSchool}}">{{inSchool}}</md-option>
                        <md-option value="True">Yes</md-option>
                        <md-option value="False">No</md-option>
                      </md-select>
                      <!--<small *ngIf="form.controls['notInSchool'].hasError('required') && form.controls['notInSchool'].touched" class="md-text-warn">Kindly input a value.</small>
                      -->
                    </div>
                  </div>

                  <div  fxLayout="row">
                    <div fxLayout="column"  class="mb-2 ml-xs mr-xs" style="width: 50%;">
                      <md-select  [formControl]="form.controls['modeOfTransport']"  placeholder="Mode of Transport">
                        <md-option selected value="{{mode_of_transport}}">{{mode_of_transport}}</md-option>
                        <md-option value="Personal Vehicle">Personal Vehicle</md-option>
                        <md-option value="School Bus">School Bus</md-option>
                        <md-option value="By Foot">By Foot</md-option>
                      </md-select>
                      <!--<small *ngIf="form.controls['modeOfTransport'].hasError('required') && form.controls['modeOfTransport'].touched" class="md-text-warn">Kindly input the child's mode of transport.</small>
                      -->
                    </div>

                    <div fxLayout="column"  class="mb-2 ml-xs mr-xs" style="width: 50%;">
                      <md-select  [formControl]="form.controls['timeToSchool']"   placeholder="Time taken to reach school">
                        <md-option selected value="{{time_to_school}}">{{time_to_school}}</md-option>
                        <md-option value="less than 1/2 hour">Less than 1/2 hour</md-option>
                        <md-option value="1 hour">1 hour</md-option>
                        <md-option value="more">More than 1 hour</md-option>
                      </md-select>
                      <!--<small *ngIf="form.controls['timeToSchool'].hasError('required') && form.controls['timeToSchool'].touched" class="md-text-warn">Kindly input the child's time taken to school.</small>
                      -->
                    </div>
                  </div>

                  <h6>Household Details</h6>
                  <hr>
                  <br>
                  <div  fxLayout="row">
                    <div fxLayout="column"  class="mb-2 ml-xs mr-xs" style="width: 30%;">
                      <md-select ngModel  [formControl]="form.controls['stayWith']"  placeholder="Whom do you stay with?">
                        <md-option value="{{guardian}}">{{guardian}}</md-option>
                        <md-option value="Parents">Parents</md-option>
                        <md-option value="Guardians">Guardians</md-option>
                        <md-option value="Alone">Alone</md-option>
                      </md-select>
                    </div>

                    <div fxLayout="column"  class="mb-2 ml-xs mr-xs" style="width: 35%;">
                      <md-input  placeholder="Number of people in household" value="{{household}}" name="householdNumber" FormControlName="householdNumber" type="text"></md-input>
                    </div>

                    <div fxLayout="column"  class="mb-2 ml-xs mr-xs" style="width: 35%;">
                      <md-input  placeholder="Number of meals/day" value="{{meals}}" name="mealsInDay" FormControlName="mealsInDay" type="text"></md-input>
                      <!--<small *ngIf="form.controls['mealsInDay'].errors?.number && form.controls['phoneNumber'].touched" class="md-text-warn">Kindly input a digit.</small>
                      -->
                    </div>
                  </div>
                  <hr>
                  <md-card-actions>
                    <button type="submit" [disabled]="!form.valid" md-raised-button class="shadow-none">Save</button>
                    <!--<button md-raised-button class="warn">Delete</button>-->
                    <button type="button" (click)="dialogRef.close(howMuch.value)" md-raised-button color="primary">Cancel</button>
                  </md-card-actions>
                </form>
              </md-card-content>
            </md-card>
    `,
    providers: [ChildService, AddChildrenService]
  })

  export class EditProfileDialog {
    public form: FormGroup;
    public success;
    public fail;
    public empty;
    public submitted: boolean =  true;
    public school: ChildRegistration;
    public currentDate = new Date();


    constructor(public dialogRef: MdDialogRef <EditProfileDialog>,private childService: ChildService,private route:ActivatedRoute,private fb: FormBuilder,  private _childRegistrationService: AddChildrenService ) {
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
