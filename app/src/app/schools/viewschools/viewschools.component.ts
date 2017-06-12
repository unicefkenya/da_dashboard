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
    this.fetch((data) => {
      // cache our list
      this.temp = [...data];
      // push our inital complete list
      this.rows = data;
    });
  }

  loading: boolean;
  temp = [];
  rows = [];
  dt:any;
  schools: any[];
  selected: any[];
  public schoolId;

  columns = [
    { name: 'Schoolcode' },
    { name: 'Name' },
    { name: 'Emiscode' },
    { name: 'Level' },
  ];

  fetchSchools(): void {
    this.schoolService.fetchSchools().subscribe(data => {
      //console.log(data);
      this.loading = false;
      let items =[];
      for (let i = 0; i < data.length; i++){
        this.dt = {}
        this.dt.schoolcode = data[i].school_code
        this.dt.name = data[i].school_name
        this.dt.emiscode = data[i].emis_code
        this.dt.level = data[i].level
        this.dt.id = data[i].id
        items.push(this.dt)

      }
      this.schools = items;
      this.selected = [];

      //console.log('Done');

    });
  }

  onSelect({ selected }) {
   //console.log('Select Event', selected, this.selected,this.selected[0].emiscode);
   localStorage.setItem('schoolId', this.selected[0].id);
   this.router.navigate(['/search', this.selected[0].emiscode]);
 }

//filterng the table
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

 onActivate(event) {
   //console.log('Activate Event', event);
 }

  ngOnInit(): void {
    this.loading = true;
    this.fetchSchools();
  }

}
