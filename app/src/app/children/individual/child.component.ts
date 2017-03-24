import { Component,OnInit } from '@angular/core';
import {ChildService} from './child.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  providers: [ChildService]
})
export class ChildComponent {

  constructor(private childService: ChildService,private route:ActivatedRoute) {
  }

  public sub;
  ngOnInit():void{
    //checks if the id param navigations have changed

    this.sub = this.route.params.subscribe(params => {
     let childId = +params['id'];
     //console.log(schoolId);
     this.getChildData(childId);
   });
}
  public firstname;
  public childname;
  public class_;
  public emiscode;
  public gender;
  public mode_of_transport;
  public time_to_school;
  public school;
  public staywith;
  public household;
  public meals;
  public dob;
  public enrolled;
  public enrolDate;
  public childType;
  public guardian;
  public phone;

  public attendancePercentage;
  public childStatus;

  public getChildData(id){
    this.childService.fetchChild(id).subscribe(
      (data)  =>
      {
        this.firstname = data.fstname;
        this.childname = data.midname+" "+data.lstname;
        this.emiscode = data.emis_code;
        this.mode_of_transport = data.mode_of_transport;
        this.time_to_school = data.time_to_school;
        this.school = data.school_name;
        this.staywith = data.stay_with;
        this.household =data.household;
        this.meals = data.meals_per_day;
        this.dob = data.date_of_birth;
        this.class_ = data.class_name;
        this.enrolDate = data.date_enrolled;
        data.not_in_school_before;
        data.guardian_name;
        this.phone = data.guardian_phone;

        if(data.newly_enrolled = "true"){
          this.enrolled = "New";
        }

        if(data.not_in_school_before = "false"){
          this.childType = "Unicef";
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

}
