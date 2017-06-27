import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewpartnersService} from './viewpartners.service';
//import { Partner } from './partner';



@Component({
  selector: 'app-partner',
  templateUrl: './viewpartners.component.html',
  styleUrls: ['./viewpartners.component.scss'],
  providers: [ViewpartnersService]

})
export class ViewpartnersComponent implements OnInit {
  loading:boolean;
  dt:any;
  partners: any[] = this.rows;
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

  columns = [
    { name: 'Emiscode' },
    { name: 'Name', filtering:{filterString: '', placeholder: 'Filter by name'} },
    { name: 'Gender' },
    { name: 'Attendance' },
    { name: 'Class' },

  ];

  constructor( private partnersService: ViewpartnersService,private router: Router) {
  }

  //admin
  fetchpartners(offset,limit): void {
    this.partnersService.fetchPartners(this.page).subscribe(data => {
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
      this.partners=row;

      this.selected = [];

      //console.log('Page Results',this.partners,this.count, start, end);

    });
  }
  onSelect({ selected }) {
   //console.log('Select Event', selected, this.selected,this.selected[0].id);
   localStorage.setItem('partnerId', this.selected[0].id);
   //this.getPartnerId(this.selected[0].id);
   //this.router.navigate(['/partners/child', this.selected[0].id]);
   }

   private getChildId(id){

     this.router.navigate(['/partners/child', id]);

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
      this.partners = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = this.page;

    console.log('Filter event', event);
  }



  onPage(event) {
    console.log(event.offset);
    this.page=event.offset+1
    this.fetchpartners(event.offset, event.limit);
  }

  ngOnInit(): void {
    this.loading = true;
    this.fetchpartners(this.offset, this.limit);

  }

}
