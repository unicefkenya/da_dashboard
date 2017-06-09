import { Component, OnInit} from '@angular/core';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss'],
  providers: [EnrollmentService],

})
export class EnrollmentComponent implements OnInit {

  constructor(private enrollmentService: EnrollmentService){
    this.fetch((data) => {
      this.rows = data;
    });
  }

  public temp = [];
  public rows = [];
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

  //filtering the table
   updateFilter(event) {
     let val = event.target.value;
     // filter our data
     let temp = this.temp.filter(function(d) {
       return d.name.toLowerCase().indexOf(val) !== -1 || !val;
     });
     // update the rows
     this.rows = temp;
   }

   //sorting the table
    fetch(cb) {
       const req = new XMLHttpRequest();
       req.open('GET', `assets/data/company.json`);

       req.onload = () => {
         let data = JSON.parse(req.response);
         cb(data);
       };

       req.send();
     }


  ngOnInit(): void {
    this.fetchEnrolled();
  }
}
