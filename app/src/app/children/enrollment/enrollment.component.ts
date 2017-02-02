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
  public total: any;
  public males: any;
  public females: any;

  private fetchEnrolled(){
    this.enrollmentService.fetchChildren().subscribe( data => {

      let items = [];
      for(let i = 0; i < data.students.length; i++){
          this.tmp = {};
          this.tmp.studentname = data.students[i].student_name;
          this.tmp.enrollmentdate = data.students[i].date_enrolled;
          this.tmp.studentcode = data.students[i].emis_code;
          this.tmp.gender = data.students[i].gender;
          this.tmp.lastdate = data.students[i].last_attendance;

          items.push(this.tmp);
      }

      this.students = items;

      this.males = data.males;
      this.females = data.females;
      this.total = data.total;

    });
  }

  ngOnInit(): void {
    this.fetchEnrolled();
  }
}
