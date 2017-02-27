import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[ DashboardService ]
})
export class DashboardComponent {

  rows = [];

  public students: any;
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

  public attendanceSnapshot: any [];

  //Annual Attendance per Gender
  public boys: any;
  public girls: any;

  //Last getSevenDaysAttendance
  public

  constructor(private dashboardServices: DashboardService) {
    this.fetch((data) => { this.rows = data; });
  }

  ngOnInit(): void {
    this.getStats();
    //this.getWeeklySummary(); commented till the api is fixed
    this.getAnnualAttendanceGender();
    this.getAnnualEnrollmentGender();
    this.getMonthlyAttendance();
    this.getSevenDaysAttendance();
  }

  // Shimanyi > getStats()
  public getStats():void {

    this.dashboardServices.getStats().subscribe(data => {

       this.schools = data.schools;
       this.males = data.students.males;
       this.females = data.students.females;
       this.students = +(this.males+this.females);
       this.teachers = data.teachers;

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

  // Shared chart options
  public globalChartOptions: any = {
      responsive: true,
      legend: {
        display: false,
        position: 'bottom'
      }
    }

  // Bar
  public barChartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [{
    //display data for boys ranging from class 1 to 8
    data: [6, 5, 8, 8, 5, 5, 4,8],
    label: 'Boys',
    borderWidth: 0
  }, {
      //display data for girls ranging from class 1 to 8
    data: [5, 4, 4, 2, 6, 2, 5,7],
    label: 'Girls',
    borderWidth: 0
  }];
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

  // Pie
  public pieChartLabels: string[] = ['Girls', 'Boys'];
  public pieChartData: number[] = [];
  public pieChartEnrollmentData: number[] = [];
  public pieChartType: string = 'pie';

  // monthly chart
  public comboChartLabels: Array < any > = ['1', '2', '3', '4', '5', '6'];
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
  public comboChartLegend: boolean = true;
  public ComboChartData: Array < any > = [{
    data: [],
    label: 'Absent Students',
    borderWidth: 1,
    type: 'line',
    fill: false
  }, {
    data: [],
    label: 'Present Students',
    borderWidth: 1,
    type: 'bar',
  }];
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

      let children = [];

      children.push(data[0].present_males);
      children.push(data[0].present_females);
      this.pieChartData = children;

    });
  }

//Norman - pie chart data for enrollment based on gender
  public getAnnualEnrollmentGender(){

      this.dashboardServices.getAnnualEnrollmentGender().subscribe( data => {
      let enrolled = [];

      enrolled.push(data['females']);
      enrolled.push(data['males']);

      this.pieChartEnrollmentData = enrolled;

    });
  }

  //Norman - data for the last 6 months
  public tmp;
  public totalAbsent;
  public totalPresent;
  public getMonthlyAttendance(){
    this.dashboardServices.getMonthlyAttendance().subscribe( data => {
      console.log(data);

    let Attendance = [2,3,4,5,3,7];

    //Attendance.push(data['absent_males']);
    //Attendance.push(data['present_males']);

    this.ComboChartData = Attendance;
    console.log(this.ComboChartData, 'sdsdsdas');

/*

    for (let i = 0; i < data.length; i++){
        this.tmp = {}
        this.totalAbsent = 0;
        this.totalPresent = 0;

        this.tmp.absent_males = data[i].absent_males
        this.tmp.absent_females = data[i].absent_females
        this.tmp.present_males = data[i].present_males
        this.tmp.present_females = data[i].present_females
      }

      this.totalAbsent = (this.tmp.absent_males + this.tmp.absent_females);
      this.totalPresent = (this.tmp.present_males + this.tmp.present_females);


      Attendance.push(this.totalAbsent);
      Attendance.push(this.totalPresent);

      this.ComboChartData = Attendance;
      console.log(this.ComboChartData, 'sdsdsdas');
      */
  });
  }


  //Shimanyi - get Attendance for the last 7 days

  // Bar
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [
    {
      //display data for boys ranging from class 1 to 7
      data: [6, 5, 8, 8, 5, 5, 7],
      label: 'Boys',
      borderWidth: 0
    }, {
      //display data for girls ranging from class 1 to 7
      data: [5, 4, 4, 2, 6, 2, 5],
      label: 'Girls',
      borderWidth: 0
    }
  ];
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

      let subset = data.slice(Math.max(data.length - 7, 0));

      let columns:string[] = [];

      let columnNames: string = '';
      for(let i = 0; i < subset.length; i++){
        columns.push(subset[i].date);
      }

      console.log(columns);
      this.barChartLabels = columns;

      let set: any[];
      set = [{
        //display data for boys ranging from class 1 to 7
        data: [6, 5, 8, 8, 5, 5, 7],
        label: 'Boys',
        borderWidth: 0
      }, {
        //display data for girls ranging from class 1 to 7
        data: [5, 4, 4, 2, 6, 2, 5],
        label: 'Girls',
        borderWidth: 0
      }]

      this.barChartData = set;

      //console.log(set);
      //console.log(columns);


    });
  }

}
