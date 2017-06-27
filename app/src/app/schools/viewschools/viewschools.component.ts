import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewSchoolsService } from './viewschools.service';

@Component({
  selector: 'app-viewschools',
  templateUrl: './viewschools.component.html',
  styleUrls: ['./viewschools.component.scss'],
  providers: [ViewSchoolsService]
})
export class ViewSchoolsComponent implements OnInit {

  constructor(private schoolService: ViewSchoolsService,private router: Router, ) {
  }

  loading: boolean;
  temp = [];
  rows = [];
  count: number = 0;
  offset: number = 0;
  limit: number = 100;
  page:number=1

  dt:any;
  schools: any[];
  selected: any[];
  public schoolId;
  table = {
    offset: 0
  };
  partnerId: number;

  columns = [
    { name: 'Schoolcode' },
    { name: 'Name' },
    { name: 'Emiscode' },
    { name: 'Level' },
  ];

  fetchSchools(offset,limit): void {
    this.schoolService.fetchSchools(this.page).subscribe(data => {
      //start and end for pagination
      const start = offset * limit;
      const end = start + limit;
       this.count =data.count
      this.loading = false;
      let items =[];
      let rowss = [];
      for (let i = 0; i < data.results.length; i++){
        this.dt = {}
        this.dt.schoolcode = data.results[i].school_code
        this.dt.name = data.results[i].school_name
        this.dt.emiscode = data.results[i].emis_code
        this.dt.level = data.results[i].level
        this.dt.id = data.results[i].id
        items.push(this.dt)

      }

      //cached data
      let rowSchool=[...rowss]
      this.temp=[...items];
      let j=0
      for (let i = start; i < end; i++) {
        rowSchool[i] = items[j];
        j++;
      }
      //initial data
      this.schools=rowSchool;

      this.selected = [];

      //console.log('Page Results',this.schools,this.count, start, end);

    });
  }


    //individual partners
    fetchPartnerSchools(id,offset,limit): void {
      this.schoolService.fetchPartnerSchools(id,this.page).subscribe(data => {
        //start and end for pagination
        const start = offset * limit;
        const end = start + limit;
         this.count =data.count
        this.loading = false;
        let items =[];
        let rowss = [];
        for (let i = 0; i < data.results.length; i++){
          this.dt = {}
          this.dt.schoolcode = data.results[i].school_code
          this.dt.name = data.results[i].school_name
          this.dt.emiscode = data.results[i].emis_code
          this.dt.level = data.results[i].level
          this.dt.id = data.results[i].id
          items.push(this.dt)

        }

        //cached data
        let rowSchool=[...rowss]
        this.temp=[...items];
        let j=0
        for (let i = start; i < end; i++) {
          rowSchool[i] = items[j];
          j++;
        }
        //initial data
        this.schools=rowSchool;

        this.selected = [];

        //console.log('Page Results',this.schools,this.count, start, end);

      });
    }


  onSelect({ selected }) {
   //console.log('Select Event', selected, this.selected,this.selected[0].emiscode);
   localStorage.setItem('schoolId', this.selected[0].id);
   this.router.navigate(['/school', this.selected[0].id]);
 }

 updateFilter(event) {
   const val = event.target.value.toLowerCase();

   // filter our data
   const temp = this.temp.filter(function(d) {
     return d.name.toLowerCase().indexOf(val) !== -1 || !val;
   });
   // update the rows
   this.schools = temp;
   // Whenever the filter changes, always go back to the first page
   this.table.offset = 0;
 }

 onPage(event) {
   console.log(event.offset);
   this.page=event.offset+1
   if(this.partnerId){
     this.fetchPartnerSchools(this.partnerId, event.offset,event.limit);
   }else{
     this.fetchSchools(event.offset,event.limit);
   }
 }

 onActivate(event) {
   //console.log('Activate Event', event);
 }

  ngOnInit(): void {
    this.loading = true;
    this.partnerId = JSON.parse(localStorage.getItem("partnerId"));
    if(this.partnerId){
      this.fetchPartnerSchools(this.partnerId, this.offset,this.limit);
    }else{
      this.fetchSchools(this.offset,this.limit);
    }

  }

}
