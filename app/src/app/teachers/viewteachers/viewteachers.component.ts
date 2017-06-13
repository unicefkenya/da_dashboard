import { Component, OnInit } from '@angular/core';
import { ViewTeachersService } from './viewteachers.service';

@Component({
  selector: 'app-viewteachers',
  templateUrl: './viewteachers.component.html',
  styleUrls: ['./viewteachers.component.scss'],
  providers: [ViewTeachersService]
})
export class ViewTeachersComponent implements OnInit {

  constructor(private teachersService: ViewTeachersService) {
    this.fetch((data) => {
      // cache our list
      this.temp = [...data];
      // push our inital complete list
      this.rows = data;
    });
  }
  loading:boolean;
  teachers : any[];
  tmp :any;
  temp = [];
  rows = [];

  columns = [
    { name: 'Name' },
    { name: 'Type' },
    { name: 'Gender' },
    { name: 'Birthdate' }

  ];

  fetchTeachers(): void{
    this.teachersService.fetchTeachers().subscribe( data=> {
      data = data.results;
      this.loading = false;
      let items = [];
      for (let i = 0; i < data.length; i++){
        this.tmp = {}
        this.tmp.name = data[i].name
        this.tmp.type = data[i].type
        this.tmp.gender = data[i].gender
        this.tmp.birthdate = data[i].date_of_birth

        items.push(this.tmp);
      }

      this.teachers = items;

    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.fetchTeachers();
  }

  //filtering the table
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


}
