import { Component,OnInit } from '@angular/core';
import {AdminLayoutService} from '../layouts/admin/adminlayout.service';
import {ActivatedRoute} from '@angular/router';
import { SearchService} from '../search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [AdminLayoutService, SearchService]
})
export class SearchComponent {
  constructor(private _adminLayoutService: AdminLayoutService,
              private _searchService: SearchService,
              private route:ActivatedRoute) {
  }


  public sub;

  ngOnInit():void{
    //checks if the id param navigations have changed

    this.sub = this.route.params.subscribe(params => {
     let id = +params['id'];
     let schoolId = localStorage.getItem('schoolId');
     //console.log(schoolId);
     this.getSchoolData(id);
     this.getStats(schoolId);
     this.getSevenDaysAttendance(schoolId);
     this.getChildrenEnrolled(schoolId);
     this.getAnnualEnrollmentGender(schoolId);
     this.getAnnualAttendanceGender(schoolId);
     this.getMonthlyAttendance(schoolId);
   });

  }
  public males;
  public females;
  public totalStudents;
  public enrolledStudents;

  public getStats(id):void {
    this.errorSearch = '';
    this._searchService.getSchoolStats(id).subscribe(
      (data)  =>
      {
        this.males = (data.results[0].enrolled_males+data.results[0].old_males);
        this.females = (data.results[0].enrolled_females+data.results[0].old_females);
        this.totalStudents = data.results[0].total;
        this.enrolledStudents = (data.results[0].enrolled_males+data.results[0].enrolled_females);
      },
      error =>{
        this.errorSearch = 'Emis Code not found';
      }
    );
  }

  public schoolname;
  public schoolEmisCode;
  public county;
  public zone;
  public errorSearch;

  //Shimanyi - Get top level School Data
  public getSchoolData(id){
    this._adminLayoutService.sendSearch({search:id,"details":{
      id:id
    }}).subscribe(
      (data)  =>
      {
        this.schoolname=data.school_name;
        this.schoolEmisCode = data.emis_code;
        this.county = data.county;
        this.zone = data.zone;

      },
      error =>{

        this.errorSearch = 'Id  not found';
      }
    );
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

    //getting annual attendance based on gender
    public getAnnualAttendanceGender(id){
        this._searchService.getAnnualAttendanceGender(id).subscribe( data => {

        let children = [];

        children.push(data.results[0].present_males);
        children.push(data.results[0].present_females);
        this.pieChartData = children;

      });
    }

    //Norman - pie chart data for enrollment based on gender
      public getAnnualEnrollmentGender(id){

          this._searchService.getSchoolStats(id).subscribe( data => {
          let enrolled = [];
          enrolled.push(data.results[0].enrolled_females);
          enrolled.push(data.results[0].enrolled_males);

          this.pieChartEnrollmentData = enrolled;

        });
      }


    //Norman - total children enrolled in all the classes
    public getChildrenEnrolled(id){

      this._searchService.getChildrenEnrolled(id).subscribe( data => {
        //console.log(data, "sdsdasdsd");
        let subset = data.slice(Math.max(data.length - 8, 0));

        let columns:string[] = [];
        let totalEnrolledStudents: number [] = [];
        let totalStudents: number [] = [];

        for(let i = 0; i < subset.length; i++){
          columns.push(subset[i].value);
          totalStudents.push(subset.results[i].total);
          totalEnrolledStudents.push(subset.results[i].enrolled_males+subset.results[i].enrolled_females);
        }

        this.EnrolledComboChartLabels = columns;
        this.EnrolledComboChartData  = [{
          data: totalEnrolledStudents,
          label: 'Newly Enrolled Students',
          borderWidth: 1,
          type: 'line',
          fill: false
        },{
          data: totalStudents,
          label: 'Total Students',
          borderWidth: 1,
          type: 'bar',
        }];
    });
    }


    public getSevenDaysAttendance(id){

      this._searchService.getSevenDaysAttendance(id).subscribe( data => {

        let subset = data.slice(Math.max(data.length - 8, 0));

        let columns: string[] = [];
        let absents: number[] = [];
        let presents: number[] = [];

        let columnNames: string = '';
        for(let i = 0; i < subset.length; i++){
          columns.push(subset[i].value);
          absents.push((subset.results[i].absent_males + subset.results[i].absent_females));
          presents.push((subset.results[i].present_females + subset.results[i].present_males));
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

    public getMonthlyAttendance(id){

      this._searchService.getMonthlyAttendance(id).subscribe( data => {

        let subset = data.slice(Math.max(data.length - 6, 0));

        let columns:string[] = [];
        let totalAbsent: number [] = [];
        let totalPresent: number [] = [];

        for(let i = 0; i < subset.length; i++){


          columns.push(subset[i].value);
          totalAbsent.push(subset.results[i].absent_males + subset.results[i].absent_females );
          totalPresent.push(subset.results[i].present_males + subset.results[i].present_females);
        }

        this.comboChartLabels = columns;
        this.comboChartData  = [{
          data: totalAbsent,
          label: 'Absent Students',
          borderWidth: 1,
          type: 'line',
          fill: false
        },{
          data: totalPresent,
          label: 'Present Students',
          borderWidth: 1,
          tupe: 'bar',
        }];
    });
    }

}
