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

  constructor(private schoolService: ViewSchoolsService,private router: Router, ) { }

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

 onActivate(event) {
   //console.log('Activate Event', event);
 }

  ngOnInit(): void {

    this.fetchSchools();
  }

}
