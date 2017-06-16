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
  dt:any;
  schools: any[];
  selected: any[];
  public schoolId;
  table = {
    offset: 0
  };

  columns = [
    { name: 'Schoolcode' },
    { name: 'Name' },
    { name: 'Emiscode' },
    { name: 'Level' },
  ];

  fetchSchools(): void {
    this.schoolService.fetchSchools().subscribe(data => {
      this.loading = false;
      let items =[];
      for (let i = 0; i < data.results.length; i++){
        this.dt = {}
        this.dt.schoolcode = data.results[i].school_code
        this.dt.name = data.results[i].school_name
        this.dt.emiscode = data.results[i].emis_code
        this.dt.level = data.results[i].level
        this.dt.id = data.results[i].id
        items.push(this.dt)

      }
      //cache our data
      this.temp = [...items];
      //our initial data
      this.schools = items;
      this.selected = [];

      //console.log('Done');

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



 onActivate(event) {
   //console.log('Activate Event', event);
 }

  ngOnInit(): void {
    this.loading = true;
    this.fetchSchools();
  }

}
