import { Component, OnInit } from '@angular/core';
import { ViewTeachersService } from './viewteachers.service';

@Component({
  selector: 'app-viewteachers',
  templateUrl: './viewteachers.component.html',
  styleUrls: ['./viewteachers.component.scss'],
  providers: [ViewTeachersService]
})
export class ViewTeachersComponent implements OnInit {

  constructor(private teachersService: ViewTeachersService) { }

  teachers : any[];
  tmp :any;

  columns = [
    { name: 'Name' },
    { name: 'Type' },
    { name: 'Gender' },
    { name: 'Birthdate' }

  ];

  fetchTeachers(): void{
    this.teachersService.fetchTeachers().subscribe( data=> {

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
    this.fetchTeachers();
  }

}
