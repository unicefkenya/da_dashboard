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
export class ChildComponent implements OnInit{


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

  editProfile:boolean = false;
  public sub;
  public form: FormGroup;
  public currentDate = new Date();
  public success;
  public fail;
  public empty;
  public percentAttendance:any=0
  public schoolClasses;
  public submitted: boolean =  true;
  public school: ChildRegistration;

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
            suggestedMax: 5
          }
        }]
      }
    }, this.globalChartOptions);

    public dailyChildAttendance(id){
      this.childService.fetchDailyAttendance(id).subscribe(
        (data)  =>
        {

          data=data.results;
          if(data != ""){
              this.attendant = data;
              let columns: string[] = [];
              let absents: number[] = [];
              let presents: number[] = [];
              let subset = data.slice(Math.max(data.length - 4, 0));

              for(let i=0; i< subset.length; i++){

                columns.push(new Date(subset[i].value).toLocaleString('en-us', {  weekday: 'short' }));

                if(subset[i].present=1){
                  presents.push(1);
                  absents.push(0);
                }
                else{
                  absents.push(1);
                  presents.push(0);
                }
              }
              this.barChartLabels = columns;

              this.barChartData = [{
                //display data for boys ranging from class 1 to 7
                //presents
                data: presents,
                label: 'Present',
                borderWidth: 0
              }, {
                //absents
                data: absents,
                label: 'Absent',
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
