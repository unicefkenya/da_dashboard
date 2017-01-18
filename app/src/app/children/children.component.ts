import { Component, OnInit } from '@angular/core';
import { ChildrenService} from './children.service';
import { Children } from './children';


@Component({
  selector: 'app-table-sorting',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
  providers: [ChildrenService]

})
export class ChildrenComponent implements OnInit {

  dt:any;
  children: any[];

  columns = [
    { name: 'Emiscode' },
    { name: 'Name' },
    { name: 'Gender' },
    { name: 'Attendance' },
    { name: 'Class' },

  ];

  constructor( private childrenService: ChildrenService) {
  }

  fetchChildren(): void {
    this.childrenService.fetchChildren().subscribe(data => {
      let childs =[]
      for (let i = 0;i < data.length;i++){
        this.dt = {}
        this.dt.emiscode=data[i].emis_code
        this.dt.name=data[i].student_name
        this.dt.gender=data[i].gender
        this.dt.attendance=data[i].last_attendance
        this.dt.class=data[i].class_id
        childs.push(this.dt)
      }
      this.children = childs;

    });
  }

  ngOnInit(): void {
    this.fetchChildren()
  }

}
