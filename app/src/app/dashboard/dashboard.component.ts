import { Component,OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[ DashboardService ]
})
export class DashboardComponent implements OnInit{

  rows = [];

  public students: any;
  public dropouts:any;
  public males: any;
  public females: any;
  public teachers: any;
  public schools: any;

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
  partneradminId:number;
  partnerName: string;

  constructor(private dashboardServices: DashboardService) {
    this.fetch((data) => { this.rows = data; });
  }

  ngOnInit(): void {
    this.partnerId = JSON.parse(localStorage.getItem("partnerId"));
    this.partneradminId = JSON.parse(localStorage.getItem("partneradminId"));
    this.partnerName = localStorage.getItem("welcomeName");
    if(this.partnerId && this.partnerName){
      this.getPartnerStats(this.partnerId);
      this.getPartnerAnnualAttendanceGender(this.partnerId);
      this.getPartnerAnnualEnrollmentGender(this.partnerId);
      this.getPartnerMonthlyAttendance(this.partnerId);
      this.getPartnerSevenDaysAttendance(this.partnerId);
      this.getPartnerEnrollmentGraph(this.partnerId);

    }else if(this.partneradminId){
      this.getPartnerAdminStats(this.partneradminId);
      this.getPartnerAdminAnnualAttendanceGender(this.partneradminId);
      this.getPartnerAdminAnnualEnrollmentGender(this.partneradminId);
      this.getPartnerAdminMonthlyAttendance(this.partneradminId);
      this.getPartnerAdminSevenDaysAttendance(this.partneradminId);
      this.getPartnerAdminEnrollmentGraph(this.partneradminId);
    }else{
      this.getStats();
      //this.getWeeklySummary(); commented till the api is fixed
      this.getAnnualAttendanceGender();
      this.getAnnualEnrollmentGender();
      this.getMonthlyAttendance();
      this.getSevenDaysAttendance();
      this.getEnrollmentGraph();
    }

  }

  // Shimanyi > getStats()
  public getStats():void {

    this.dashboardServices.getStats().subscribe(data => {
      console.log(data);

       this.schools = data.active_schools;
       this.males = data.students.males;
       this.females = data.students.females;
       this.students = (this.males+this.females);
       this.teachers = data.teachers;
       this.dropouts = data.students.dropout_females+data.students.dropout_males;
    });
  }
  // Partner > getStats()
  public getPartnerStats(id):void {

    this.dashboardServices.getPartnerStats(id).subscribe(data => {

       this.schools = data.active_schools;
       this.males = data.students.males;
       this.females = data.students.females;
       this.students = +(this.males+this.females);
       this.teachers = data.teachers;
       this.dropouts = data.students.dropout_females+data.students.dropout_males;

    });
  }
  //partner admin
  public getPartnerAdminStats(id):void {

    this.dashboardServices.getPartnerAdminStats(id).subscribe(data => {

       this.schools = data.active_schools;
       this.males = data.students.males;
       this.females = data.students.females;
       this.students = +(this.males+this.females);
       this.teachers = data.teachers;
       this.dropouts = data.students.dropout_females+data.students.dropout_males;

    });
  }

  // Shimanyi > getWeeklySummary()
  public getWeeklySummary(){
    this.dashboardServices.getWeeklySummary().subscribe( data => {
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

  //partner admin weekly status
  public getPartnerAdminWeeklySummary(id){
    this.dashboardServices.getPartnerAdminWeeklySummary(id).subscribe( data => {
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

  //Shimanyi - get Attendance per Gender
  public getAnnualAttendanceGender(){
      this.dashboardServices.getAnnualAttendanceGender().subscribe( data => {

      data = data.results;
      let children = [];

      children.push(data[0].present_females);
      children.push(data[0].present_males);
      this.pieChartData = children;

    });
  }
  public getPartnerAnnualAttendanceGender(id){
      this.dashboardServices.getPartnerAnnualAttendanceGender(id).subscribe( data => {

      data = data.results;
      let children = [];

      children.push(data[0].present_females);
      children.push(data[0].present_males);
      this.pieChartData = children;
    });
  }
  public getPartnerAdminAnnualAttendanceGender(id){
      this.dashboardServices.getPartnerAdminAnnualAttendanceGender(id).subscribe( data => {

      data = data.results;
      let children = [];

      children.push(data[0].present_females);
      children.push(data[0].present_males);
      this.pieChartData = children;
    });
  }
//Norman - pie chart data for enrollment based on gender
  public getAnnualEnrollmentGender(){

      this.dashboardServices.getAnnualEnrollmentGender().subscribe( data => {

        data = data.results;
        let enrolled = [];
        enrolled.push(data[0].enrolled_females);
        enrolled.push(data[0].enrolled_males);
        this.pieChartEnrollmentData = enrolled;


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

  public getPartnerAdminAnnualEnrollmentGender(id){

      this.dashboardServices.getPartnerAdminAnnualEnrollmentGender(id).subscribe( data => {

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

  public getMonthlyAttendance(){

    this.dashboardServices.getMonthlyAttendance().subscribe( data => {
      data = data.results;
      let subset = data.slice(Math.max(data.length - data.length, 0));

      let columns:String [] = [];
      let totalAbsent: number [] = [];
      let totalPresent: number [] = [];
      let refine: any;

      let months: string [] =
      ["Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec", ];


      for(let i = 0; i < subset.length; i++){

        let splitted = subset[i].value.split("-");
        let month = splitted[1] - 1;
        columns.push(months[month]);

        totalAbsent.push(subset[i].absent );
        totalPresent.push(subset[i].present);
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

        let splitted = subset[i].value.split("-");
        let month = splitted[1] - 1;
        columns.push(months[month]);

        totalAbsent.push(subset[i].absent );
        totalPresent.push(subset[i].present);
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

  public getPartnerAdminMonthlyAttendance(id){

    this.dashboardServices.getPartnerAdminMonthlyAttendance(id).subscribe( data => {
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

        let splitted = subset[i].value.split("-");
        let month = splitted[1] - 1;
        columns.push(months[month]);

        totalAbsent.push(subset[i].absent );
        totalPresent.push(subset[i].present);
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

  //Norman - children enrollment in all the classes
  public getEnrollmentGraph(){

    this.dashboardServices.getEnrollmentGraph().subscribe( data => {
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

  public getPartnerAdminEnrollmentGraph(id){

    this.dashboardServices.getPartnerAdminEnrollmentGraph(id).subscribe( data => {
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



  public getSevenDaysAttendance(){

    this.dashboardServices.getSevenDaysAttendance().subscribe( data => {
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

  public getPartnerAdminSevenDaysAttendance(id){

    this.dashboardServices.getPartnerAdminSevenDaysAttendance(id).subscribe( data => {
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
