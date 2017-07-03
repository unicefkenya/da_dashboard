import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { DashboardService } from '../dashboard/dashboard.service';
import {ActivatedRoute} from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
  providers: [DashboardService]
})
export class PartnersComponent implements OnInit{

    rows = [];

    public students: any;
    public males: any;
    public females: any;
    public teachers: any;
    public schools: any;
    public partnerName;
    public partnerEmail;
    public partnerPhone;

    public malesPresent: any;
    public malesAbscent: any;
    public femalesPresent: any;
    public femalesAbscent: any;
    public childrenPresent: any;
    public childrenAbscent: any;
    noNewlyEnrolled: string;
    noAttendanceGender: string;
    public attendanceSnapshot: any [];

    //Annual Attendance per Gender
    public boys: any;
    public girls: any;
    partnerId:number;
    public sub;


    constructor(private dashboardServices: DashboardService, private route:ActivatedRoute) {
      this.fetch((data) => { this.rows = data; });
    }

    ngOnInit(): void {
      this.sub = this.route.params.subscribe(params => {
       let partnerId = +params['id'];

       this.getPartnerStats(partnerId);
       this.getPartnerAnnualAttendanceGender(partnerId);
       this.getPartnerAnnualEnrollmentGender(partnerId);
       this.getPartnerMonthlyAttendance(partnerId);
       this.getPartnerSevenDaysAttendance(partnerId);
       this.getPartnerEnrollmentGraph(partnerId);
       this.getPartner(partnerId);
     });

    }

    public getPartner(id):void{
      this.dashboardServices.getPartner(id).subscribe(data => {
        this.partnerName = data.name;
        this.partnerEmail = data.email;
        this.partnerPhone = data.phone;
      })
    }

    // Partner > getStats()
    public getPartnerStats(id):void {

      this.dashboardServices.getPartnerStats(id).subscribe(data => {

         this.schools = data.active_schools;
         this.males = data.students.males;
         this.females = data.students.females;
         this.students = +(this.males+this.females);
         this.teachers = data.teachers;


      });
    }

    public getPartnerWeeklySummary(id){
      this.dashboardServices.getPartnerWeeklySummary(id).subscribe( data => {
        this.malesPresent   = data.present.males;
        this.malesAbscent   = data.absent.males;
        this.femalesPresent = data.present.females;
        this.femalesAbscent = data.absent.females;
        this.childrenPresent = data.present.total + "%";
        this.childrenAbscent = data.absent.total;

        this.attendanceSnapshot = [
          {
            "title": "Girls Present",
            "duration":"1 week",
            "progress": this.femalesPresent,
            "color":"primary"
          }, {
            "title": "Boys Present ",
            "duration":"1 week",
            "progress": this.malesPresent,
            "color":"primary"
          }, {
            "title": "Children Present",
            "duration":"1 week",
            "progress": this.childrenPresent,
            "color":"primary"
          },{
            "title": "Girls Absent",
            "duration":"1 week",
            "progress": this.femalesAbscent,
            "color":"accent"
          }, {
            "title": "Males Abscent",
            "duration":"1 week",
            "progress": this.childrenAbscent,
            "color":"accent"
          },  {
            "title": "Children Abscent",
            "duration":"1 week",
            "progress": this.malesAbscent,
            "color":"warn"
          }
        ]
      });
    }

    // Shared chart options
    public globalChartOptions: any = {
        responsive: true,
        legend: {
          display: false,
          position: 'bottom'
        }
      }

    // Pie
    public pieChartLabels: string[] = ['Girls', 'Boys'];
    public pieChartData: number[] = [];
    public pieChartEnrollmentData: number[] = [];
    public pieChartType: string = 'pie';

    // monthly chart
    public comboChartLabels: Array < any > = [];
    public comboChartData: any[] = [{}];
    public comboChartLegend: boolean = true;
    public chartColors: Array < any > = [{ // grey
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


    public EnrolledComboChartLabels: Array < any > = [];
    public EnrolledComboChartData: any[] = [{}];

    public ComboChartOptions: any = Object.assign({
      animation: false,
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
          ticks: {
            beginAtZero: true,
            suggestedMax: 9,
          }
        }]
      }
    }, this.globalChartOptions);


    // project table
    fetch(cb) {
      const req = new XMLHttpRequest();
      req.open('GET', `assets/data/projects.json`);
      req.onload = () => {
        cb(JSON.parse(req.response));
      };
      req.send();
    }

    // Doughnut
    public doughnutChartColors: any[] = [{
      backgroundColor: ["#f44336", "#3f51b5", "#ffeb3b", "#4caf50", "#2196f"]
    }];
    public doughnutChartLabels: string[] = ['Boys enrolled', 'Girls enrolled'];
    public doughnutOptions: any = Object.assign({
      elements: {
        arc: {
          borderWidth: 0
        }
      }
    }, this.globalChartOptions);


  public getPartnerAnnualAttendanceGender(id){
        this.dashboardServices.getPartnerAnnualAttendanceGender(id).subscribe( data => {

        data = data.results;
        let children = [];

        children.push(data[0].present_females);
        children.push(data[0].present_males);
        this.pieChartData = children;
      });
    }

  public getPartnerAnnualEnrollmentGender(id){

        this.dashboardServices.getPartnerAnnualEnrollmentGender(id).subscribe( data => {

          data = data.results;
          let enrolled = [];
          enrolled.push(data[0].enrolled_females);
          enrolled.push(data[0].enrolled_males);

          this.pieChartEnrollmentData = enrolled;
          if(this.pieChartEnrollmentData == [0,0]){
            this.noNewlyEnrolled = 'No newly enrolled student';
          }
      });
    }

    //Norman - data for the last 6 months
    public objDate;
    public monthNames;
    public locale;
    public month;
    public dateGiven;

    public getPartnerMonthlyAttendance(id){

      this.dashboardServices.getPartnerMonthlyAttendance(id).subscribe( data => {
        data = data.results;
        let subset = data.slice(Math.max(data.length - 6, 0));

        let columns:String [] = [];
        let totalAbsent: number [] = [];
        let totalPresent: number [] = [];
        let refine: any;

        let months: string [] =
        ["Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec", ];

        for(let i = 0; i < subset.length; i++){

          let splitted = subset[i].value.split("/");
          let month = splitted[1] - 1;
          columns.push(months[month]);

          totalAbsent.push(subset[i].absent_males + subset[i].absent_females );
          totalPresent.push(subset[i].present_males + subset[i].present_females);
        }

        this.comboChartLabels = columns;
        this.comboChartData  = [{
          data: totalAbsent,
          label: 'Absents',
          borderWidth: 1,
          type: 'line',
          fill: false
        },{
          data: totalPresent,
          label: 'Presents',
          borderWidth: 1,
          type: 'bar',
        }];
      });
    }

    public getPartnerEnrollmentGraph(id){

      this.dashboardServices.getPartnerEnrollmentGraph(id).subscribe( data => {
        data = data.results;
        let subset = data.slice(Math.max(data.length - 8, 0));

        let columns:string[] = [];
        let enrollments: number [] = [];

        for(let i = 0; i < subset.length; i++){
          columns.push(subset[i].value);
          enrollments.push(subset[i].total);
        }

        this.EnrolledComboChartLabels = columns;
        this.EnrolledComboChartData  = [{
          data: enrollments,
          label: 'Students',
          borderWidth: 1,
          type: 'bar',
        }];
    });
    }

    //Shimanyi - get Attendance for the last 7 days

    // Bar
    public barChartLabels: string[] = [];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    public barChartData: any[] = [{}];
    public barChartOptions: any = Object.assign({
      scaleShowVerticalLines: false,
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [{
          gridLines: {
            color: 'rgba(0,0,0,0.02)',
            defaultFontColor: 'rgba(0,0,0,0.02)',
            zeroLineColor: 'rgba(0,0,0,0.02)'
          },
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }],
        yAxes: [{
          gridLines: {
            color: 'rgba(0,0,0,0.02)',
             defaultFontColor: 'rgba(0,0,0,0.02)',
            zeroLineColor: 'rgba(0,0,0,0.02)'
          },
          stacked: true
        }]
      }
    }, this.globalChartOptions);


    public getPartnerSevenDaysAttendance(id){

      this.dashboardServices.getPartnerSevenDaysAttendance(id).subscribe( data => {
        data = data.results;
        let subset = data.slice(Math.max(data.length - 7, 0));

        let columns: string[] = [];
        let absents: number[] = [];
        let presents: number[] = [];

        let columnNames: string = '';
        for(let i = 0; i < subset.length; i++){
          columns.push(subset[i].value);
          absents.push((subset[i].absent_males + subset[i].absent_females));
          presents.push((subset[i].present_females + subset[i].present_males));
        }

        this.barChartLabels = columns;
        this.barChartData = [{
          //display data for boys ranging from class 1 to 7
          //presents
          data: presents,
          label: 'Present Students',
          borderWidth: 0
        }, {
          //absents
          data: absents,
          label: 'Absent Students',
          borderWidth: 0
        }];

      });
    }


  }
