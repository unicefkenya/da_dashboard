import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { DashboardService } from '../dashboard/dashboard.service';
import {ActivatedRoute,Router} from '@angular/router';
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
    annualYear:any;

    //Annual Attendance per Gender
    public boys: any;
    public girls: any;
    partnerId:number;
    public sub;
    pId;
    dropouts:any;

    constructor(private dashboardServices: DashboardService, private route:ActivatedRoute,
              private router: Router) {
      
    }

    ngOnInit(): void {
      this.sub = this.route.params.subscribe(params => {
       let partnerId = +params['id'];
       this.pId = +params['id'];

       let today = new Date();
      let todayYear = today.getFullYear();


       this.getPartnerStats(partnerId);
      this.getPartnerAnnualAttendanceGender(partnerId, todayYear);
      this.getPartnerEnrolledAnnualAttendanceGender(partnerId, todayYear);
      this.getPartnerMonthlyAttendance(partnerId);
      this.getEnrolledPartnerMonthlyAttendance(partnerId);
      this.getPartnerSevenDaysAttendance(partnerId);
      this.getEnrolledPartnerSevenDaysAttendance(partnerId);

      this.getPartnerAnnualEnrollmentGender(partnerId);
      this.getPartnerEnrollmentGraph(partnerId);
       this.getPartner(partnerId);
     });

    }


    getRegisteredChildren(){
       this.router.navigate(['/children/view-children']);
    }

    getSchools(){
        this.router.navigate(['/schools/view-schools']); 
    }


    getEnrolledChildren(){
        this.router.navigate(['/children/enrollments']);
    }


    getDropouts(){
        this.router.navigate(['/children/dropouts']);
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
         this.dropouts = data.students.dropout_females+data.students.dropout_males;

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
  public pieChartLabels: string[] = ['Total Old  Boys Present', 'Total Old Girls Present','Total Enrolled Girls Absent','Total Enrolled Boys Absent'];
  public studentsPieChartLabels: string[] = ['Total Old Boys', 'Total Old Girls','Total Enrolled Girls','Total Enrolled Boys'];
  public pieChartData: number[] = [];
  public pieChartDataEnrolled: number[] = [];
  public pieChartEnrollmentData: number[] = [];
  public pieChartType: string = 'pie';

  // monthly chart
  public comboChartLabels: Array < any > = [];
  public comboChartLabelsEnrolled: Array < any > = [];
  public comboChartData: any[] = [{}];
  public comboChartDataEnrolled: any[] = [{}];
  public comboChartLegend: boolean = true;
  public chartColors: Array < any > = [{ // grey
    backgroundColor: "#8072cc",
    borderColor: "#3f51b5",
    pointBackgroundColor: "#3f51b5",
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, { 
    backgroundColor: "#009D89",
    borderColor: "#e0e0e0",
    pointBackgroundColor: "#e0e0e0",
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }, { 
    backgroundColor: '#FF001C',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, { 
    backgroundColor: '#FFFF00',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];

  public EnrolledchartColors: Array < any > = [{ 
    backgroundColor: "#D3D3D3",
    borderColor: "#FAFAFA",
    pointBackgroundColor: "#3f51b5",
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }
  ,{ 
    backgroundColor: "#8072cc",
    borderColor: "#3f51b5",
    pointBackgroundColor: "#3f51b5",
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, { 
    backgroundColor: "#009D89",
    borderColor: "#e0e0e0",
    pointBackgroundColor: "#e0e0e0",
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }, { 
    backgroundColor: '#FF001C',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, { 
    backgroundColor: '#FFFF00',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, { 
    backgroundColor: '#8072cc',
    borderColor: '#3f51b5',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, { 
    backgroundColor: '#D3D3D3',
    borderColor: '#FAFAFA',
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
        position:'left',
        ticks: {
          beginAtZero: true,
          suggestedMax: 9,
        }
      }]
    }
  }, this.globalChartOptions);


  // Doughnut
  public doughnutChartColors: any[] = [{
    backgroundColor: ["#8072cc", "#009d89", "#FFFF00", "#ff001c"]
  }];
  public doughnutChartLabels: string[] = ['Boys enrolled', 'Girls enrolled'];
  public doughnutOptions: any = Object.assign({
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  }, this.globalChartOptions);



  public getPartnerAnnualAttendanceGender(id, yr){
        this.dashboardServices.getPartnerAnnualAttendanceGender(id).subscribe( data => {

         data = data.results;
          let children = [];
          let annualYear = [];
          for(let i =0; i < data.length; i++){
              annualYear.push(data[i].value);
              if(yr == data[i].value){
                children.push(data[i].present_males);
                children.push(data[i].present_females);
                children.push(data[i].absent_females);
                children.push(data[i].absent_males);
              }
            
          }
          this.annualYear =annualYear.reverse();
          this.pieChartData = children;

        });
    }

  
  public getPartnerEnrolledAnnualAttendanceGender(id, yr){
      this.dashboardServices.getEnrolledPartnerAnnualAttendanceGender(id).subscribe( data => {

        data = data.results;
      let children = [];
      let annualYear = [];
      for(let i =0; i < data.length; i++){
          annualYear.push(data[i].value);
          if(yr == data[i].value){
            children.push(data[i].present_males);
            children.push(data[i].present_females);
            children.push(data[i].absent_females);
            children.push(data[i].absent_males);
          }
        
      }
      this.annualYear =annualYear.reverse();
      this.pieChartDataEnrolled = children;
     }); 
      
  }


  public getYearClicked(event){
      this.getPartnerAnnualAttendanceGender(this.pId , event);
  }

  public getPartnerAnnualEnrollmentGender(id){

    this.dashboardServices.getPartnerAnnualEnrollmentGender(id).subscribe( data => {
      data = data.results;
      let enrolled = [];
     
      enrolled.push(data[0].old_males);
      enrolled.push(data[0].old_females);
      enrolled.push(data[0].enrolled_females);
      enrolled.push(data[0].enrolled_males);
      this.pieChartEnrollmentData = enrolled;
     
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
      let subset = data.reverse().slice(Math.max(data.length - 6, 0));
     //let subset = data.reverse().slice(Math.max(data.length - 6, 0));
     //console.log(subset);

      let columns:String [] = [];
      let totalGirlsAbsent: number [] = [];
      let totalGirlsPresent: number [] = [];
      let totalBoysPresent: number [] = [];
      let totalBoysAbsent: number [] = [];
      let refine: any;

      let months: string [] =
      ["Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec", ];
            
      for(let i = 0; i < subset.length; i++){
  
        //let sortedMonths = x.sort(sortByDateAsc);

        let month =  new Date(subset[i].value);
        let yr = month.getFullYear();
        let today = new Date();
        /*if(yr != 2014){
          let m =  months[month.getMonth()]+' '+yr; 
          columns.push(m);
        }*/
        let m =  months[month.getMonth()]+' '+yr; 

        columns.push(m);
        

        totalGirlsAbsent.push(subset[i].absent_females );
        totalGirlsPresent.push(subset[i].present_females);
        totalBoysAbsent.push(subset[i].absent_males );
        totalBoysPresent.push(subset[i].present_males);
      }



      this.comboChartLabels = columns;
      this.comboChartData  = [{
        data: totalBoysPresent,
        label: 'Boys Present',
        borderWidth: 1,
        type: 'bar',
        fill: false
      },{
        data: totalGirlsPresent,
        label: 'Girls Present',
        borderWidth: 1,
        type: 'bar',
      },{
        data: totalBoysAbsent,
        label: 'Boys Absent',
        borderWidth: 1,
        type: 'bar',
      },{
        data: totalGirlsAbsent,
        label: 'Girls Absent',
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
        let dropoutMales: number[]=[];
        let dropoutFemales: number []=[];
        let enrolledMales: number[]=[];
        let enrolledFemales: number[]=[];
        let oldMales: number [] = [];
        let oldFemales: number [] = [];
        let total: number[]=[];

        for(let i = 0; i < subset.length; i++){
          let cl = 'Class '
          columns.push(cl+subset[i].value);
          total.push(subset[i].total);
          oldMales.push(subset[i].old_males)
          enrolledMales.push(subset[i].enrolled_males);
          oldFemales.push(subset[i].old_females)
          enrolledFemales.push(subset[i].enrolled_females);
          dropoutMales.push(subset[i].dropout_old_males +subset[i].dropout_enrolled_males);
          dropoutFemales.push(subset[i].dropout_old_females+ subset[i].dropout_enrolled_females);
          
        }

        this.EnrolledComboChartLabels = columns;
        this.EnrolledComboChartData  = [{
          data: total,
          label: 'Total Students',
          borderWidth: 1,
          type: 'bar',
          fill: false
        },{
          data: oldMales,
          label: 'Old Boys',
          borderWidth: 1,
          type: 'bar',
        },{
          data: enrolledMales,
          label: 'Enrolled Boys',
          borderWidth: 1,
          type: 'bar',
        },{
          data: oldFemales,
          label: 'Old Girls',
          borderWidth: 1,
          type: 'bar',
        },{
          data: enrolledFemales,
          label: 'Enrolled Girls',
          borderWidth: 1,
          type: 'bar',
        },{
          data: dropoutMales,
          label: 'Total Boys Dropped Out',
          borderWidth: 1,
          type: 'bar',
        },{
          data: dropoutFemales,
          label: 'Total Girls Dropped Out',
          borderWidth: 1,
          type: 'bar',
        }];
    });
    }

    //Shimanyi - get Attendance for the last 7 days

    // Bar
    public barChartLabels: string[] = [];
    public barChartLabelsEnrolled: string[] = [];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    public barChartData: any[] = [{}];
    public barChartDataEnrolled: any[] = [{}];
      public barChartOptions: any = Object.assign({
    scaleShowVerticalLines: false,
    /*tooltips: {
      mode: 'index',
      intersect: false
    },*/
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          //defaultFontColor: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        //stacked: true,
        ticks: {
          beginAtZero: true
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
           //defaultFontColor: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        //stacked: true,
        position:'left',
        ticks: {
          beginAtZero: true,
          //suggestedMax: 9
        }
      }]
    }
  }, this.globalChartOptions);

  public barchartColors: Array < any > = [{ // grey
    backgroundColor: "#8072cc",
    borderColor: "#3f51b5"
  }, { // dark grey
    backgroundColor: "#009D89",
    borderColor: "#e0e0e0"
  }, { // grey
    backgroundColor: '#FF001C',
    borderColor: 'rgba(148,159,177,1)'
  },{ // grey
    backgroundColor: '#FFFF00',
    borderColor: 'rgba(148,159,177,1)'
  }];

  public weekday = [
    'Sun','Mon','Tue', 'Wed','Thurs','Fri','Sat'
  ]



    public getPartnerSevenDaysAttendance(id){

      this.dashboardServices.getPartnerSevenDaysAttendance(id).subscribe( data => {
     
        data = data.results;
        let subset = data.slice(Math.max(data.length - 7, 0));

        let columns: string[] = [];
        let absentMales: number[] = [];
        let presentMales: number[] = [];
        let absentFemales: number[] = [];
        let presentFemales: number[] = [];

        let columnNames: string = '';
        for(let i = 0; i < subset.length; i++){
          let day = new Date(subset[i].value);
          let n = this.weekday[day.getDay()]+' '+subset[i].value;  
          columns.push(n);
          absentMales.push((subset[i].absent_males));
          absentFemales.push((subset[i].absent_females));
          presentMales.push((subset[i].present_males));
          presentFemales.push((subset[i].present_females));
        }

        this.barChartLabels = columns;
        this.barChartData = [{
          //display data for boys ranging from class 1 to 7
          //presents Males
          data: presentMales,
          label: 'Present Male Students',
          borderWidth: 0
        },{
          //present Females
          data: presentFemales,
          label: 'Present Female Students',
          borderWidth: 0
        },{
          //absents Males
          data: absentMales,
          label: 'Absent Male Students',
          borderWidth: 0
        }, {
          //absent Females
          data: absentFemales,
          label: 'Absent Female Students',
          borderWidth: 0
        }];

      });

    }



/*
Weekly newly enrolled children attendance
-----------
*/
    public getEnrolledPartnerSevenDaysAttendance(id){

      this.dashboardServices.getEnrolledPartnerSevenDaysAttendance(id).subscribe( data => {
        data = data.results;
        let subset = data.slice(Math.max(data.length - 7, 0));

        let columns: string[] = [];
        let absentMales: number[] = [];
        let presentMales: number[] = [];
        let absentFemales: number[] = [];
        let presentFemales: number[] = [];

        let columnNames: string = '';
        for(let i = 0; i < subset.length; i++){
          let day = new Date(subset[i].value);
          let n = this.weekday[day.getDay()]+' '+subset[i].value;  
          columns.push(n);
          absentMales.push((subset[i].absent_males));
          absentFemales.push((subset[i].absent_females));
          presentMales.push((subset[i].present_males));
          presentFemales.push((subset[i].present_females));
        }

        this.barChartLabelsEnrolled = columns;
        this.barChartDataEnrolled = [{
          //display data for boys ranging from class 1 to 7
          //presents Males
          data: presentMales,
          label: 'Present Male Students',
          borderWidth: 0
        },{
          //present Females
          data: presentFemales,
          label: 'Present Female Students',
          borderWidth: 0
        },{
          //absents Males
          data: absentMales,
          label: 'Absent Male Students',
          borderWidth: 0
        }, {
          //absent Females
          data: absentFemales,
          label: 'Absent Female Students',
          borderWidth: 0
        }];

      });
    }



    public getEnrolledPartnerMonthlyAttendance(id){

    this.dashboardServices.getEnrolledPartnerMonthlyAttendance(id).subscribe( data => {
      data = data.results;
      let subset = data.reverse().slice(Math.max(data.length - 6, 0));
     //let subset = data.reverse().slice(Math.max(data.length - 6, 0));
     //console.log(subset);

      let columns:String [] = [];
      let totalGirlsAbsent: number [] = [];
      let totalGirlsPresent: number [] = [];
      let totalBoysPresent: number [] = [];
      let totalBoysAbsent: number [] = [];
      let refine: any;

      let months: string [] =
      ["Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec", ];
            
      for(let i = 0; i < subset.length; i++){
  
        //let sortedMonths = x.sort(sortByDateAsc);

        let month =  new Date(subset[i].value);
        let yr = month.getFullYear();
        let today = new Date();
        /*if(yr != 2014){
          let m =  months[month.getMonth()]+' '+yr; 
          columns.push(m);
        }*/
        let m =  months[month.getMonth()]+' '+yr; 

        columns.push(m);
        

        totalGirlsAbsent.push(subset[i].absent_females );
        totalGirlsPresent.push(subset[i].present_females);
        totalBoysAbsent.push(subset[i].absent_males );
        totalBoysPresent.push(subset[i].present_males);
      }



      this.comboChartLabelsEnrolled = columns;
      this.comboChartDataEnrolled  = [{
        data: totalBoysPresent,
        label: 'Boys Present',
        borderWidth: 1,
        type: 'bar',
        fill: false
      },{
        data: totalGirlsPresent,
        label: 'Girls Present',
        borderWidth: 1,
        type: 'bar',
      },{
        data: totalBoysAbsent,
        label: 'Boys Absent',
        borderWidth: 1,
        type: 'bar',
      },{
        data: totalGirlsAbsent,
        label: 'Girls Absent',
        borderWidth: 1,
        type: 'bar',
      }];
    });
  }


  }
