import { Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss'],
  providers: [EnrollmentService],
})

export class EnrollmentComponent implements OnInit {

    loading:boolean;
    dt:any;
    children: any[] = this.rows;
    selected: any[];
    rows = [];
    temp = [];
    count: number = 0;
    offset: number = 0;
    limit: number = 100;
    page:number=1
    table = {
      offset: 0
    };
    males:any;
    females:any;

    partnerId:number;

    columns = [
      { name: 'Emiscode' },
      { name: 'Name', filtering:{filterString: '', placeholder: 'Filter by name'} },
      { name: 'Gender' },
      { name: 'Attendance' },
      { name: 'Class' },

    ];

  constructor(private enrollmentService: EnrollmentService, private router: Router){}

  //admin
  fetchChildren(offset,limit): void {
    this.enrollmentService.fetchChildren(this.page).subscribe(data => {
      //start and end for pagination
      const start = offset * limit;
      const end = start + limit;
       this.count =data.count
      data = data.results;
      this.loading = false;

      let childs =[]
      let rows=[]
      //  this.count = data.length;
      for (let i = 0;i < data.length;i++){
        this.dt = {}
        this.dt.emiscode=data[i].emis_code
        this.dt.name=data[i].student_name
        this.dt.gender=data[i].gender
        this.dt.attendance=data[i].last_attendance
        this.dt.class=data[i].class_name
        this.dt.id = data[i].id
        childs.push(this.dt)
      }
      //cache our data
      //this.temp = childs;
      let row=[...rows]
      this.temp=[...childs];
      let j=0
      for (let i = start; i < end; i++) {
        row[i] = childs[j];
        j++;
      }
      //this.temp=row
      this.children=row;

      this.selected = [];

      //console.log('Page Results',this.children,this.count, start, end);

    });
  }


    //individual partners
    fetchPartnerChildren(id,offset,limit): void {
      this.enrollmentService.fetchPartnerChildren(id,this.page).subscribe(data => {
        //start and end for pagination
        const start = offset * limit;
        const end = start + limit;
         this.count =data.count
        data = data.results;
        this.loading = false;

        let childs =[]
        let rows=[]
        //  this.count = data.length;
        for (let i = 0;i < data.length;i++){
          this.dt = {}
          this.dt.emiscode=data[i].emis_code
          this.dt.name=data[i].student_name
          this.dt.gender=data[i].gender
          this.dt.attendance=data[i].last_attendance
          this.dt.class=data[i].class_name
          this.dt.id = data[i].id
          childs.push(this.dt)
        }
        //cache our data
        //this.temp = childs;
        let row=[...rows]
        this.temp=[...childs];
        let j=0
        for (let i = start; i < end; i++) {
          row[i] = childs[j];
          j++;
        }
        //this.temp=row
        this.children=row;

        this.selected = [];

        //console.log('Page Results',this.children,this.count, start, end);

      });
    }

    fetchBoyChildTotal(){
      this.enrollmentService.fetchBoyChildTotal().subscribe(data => {
        this.males = data.count;
      });
    }

    fetchPartnerBoyChildTotal(id){
      this.enrollmentService.fetchPartnerBoyChildTotal(id).subscribe(data => {
        this.males = data.count;
      });
    }

    fetchGirlChildTotal(){
      this.enrollmentService.fetchGirlChildTotal().subscribe(data => {
          this.females = data.count;
      });
    }

    fetchPartnerGirlChildTotal(id){
      this.enrollmentService.fetchPartnerGirlChildTotal(id).subscribe(data => {
        this.females = data.count;
      });
    }

    onSelect({ selected }) {
     //console.log('Select Event', selected, this.selected,this.selected[0].id);
     localStorage.setItem('childId', this.selected[0].id);
     this.getChildId(this.selected[0].id);
     //this.router.navigate(['/children/child', this.selected[0].id]);
     }

     private getChildId(id){

       this.router.navigate(['/children/child', id]);

     }

     onActivate(event) {
       //console.log('Activate Event', event);
     }

    updateFilter(event) {
      const val = event.target.value.toLowerCase();

      // filter our data
      const temp = this.temp.filter(function(d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
      });
      // update the rows
        this.children = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = this.page;

      console.log('Filter event', event);
    }



    onPage(event) {
      console.log(event.offset);
      this.page=event.offset+1
      if(this.partnerId){
        this.fetchPartnerChildren(this.partnerId,event.offset, event.limit);
      }else{
        this.fetchChildren(event.offset, event.limit);
      }
    }

    ngOnInit(): void {
      this.loading = true;
      this.partnerId = JSON.parse(localStorage.getItem("partnerId"));

      if(this.partnerId){
        this.fetchPartnerChildren(this.partnerId,this.offset, this.limit);
        this.fetchPartnerBoyChildTotal(this.partnerId);
        this.fetchPartnerGirlChildTotal(this.partnerId);
      }else{
        this.fetchChildren(this.offset, this.limit);
        this.fetchBoyChildTotal();
        this.fetchGirlChildTotal();
      }

    }
}
