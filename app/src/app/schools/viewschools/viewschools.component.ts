import { Component, OnInit } from '@angular/core';
import { ViewSchoolsService } from './viewschools.service';

@Component({
  selector: 'app-viewschools',
  templateUrl: './viewschools.component.html',
  styleUrls: ['./viewschools.component.scss'],
  providers: [ViewSchoolsService]
})
export class ViewSchoolsComponent implements OnInit {

  constructor(private schoolService: ViewSchoolsService ) { }

  dt:any;
  schools: any[];

  columns = [
    { name: 'Schoolcode' },
    { name: 'Name' },
    { name: 'Emiscode' },
    { name: 'Level' },
  ];

  fetchSchools(): void {
    this.schoolService.fetchSchools().subscribe(data => {
      console.log(data);

      let items =[];
      for (let i = 0; i < data.length; i++){
        this.dt = {}
        this.dt.schoolcode = data[i].school_code
        this.dt.name = data[i].school_name
        this.dt.emiscode = data[i].emis_code
        this.dt.level = data[i].level
        items.push(this.dt)
      }
      this.schools = items;

      console.log('Done');

    });
  }

  ngOnInit(): void {
    this.fetchSchools();
  }

}
