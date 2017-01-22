import { Component, OnInit} from '@angular/core';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss'],
  providers: [EnrollmentService],

})
export class EnrollmentComponent implements OnInit {

  constructor(private enrollmentService: EnrollmentService){}

  public studentCount: any;
  public tmp: any;
  public students: any[];

  private fetchEnrolled(){
    this.enrollmentService.fetchChildren().subscribe( data => {
      console.log(data);
      this.studentCount = data.length;

      let items = [];
      for(let i = 0; i < data.length; i++){
          this.tmp = {};
          this.tmp.firstname = data[i].student_name;
          this.tmp.gender = data[i].gender;
          this.tmp.lastdate = data[i].last_attendance;

          items.push(this.tmp);
      }
      this.students = items;

    });
  }

  ngOnInit(): void {
    this.fetchEnrolled();
  }
}
