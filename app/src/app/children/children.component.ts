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

  dt:any
  dts:any
  children: any[];

  columns = [
    { name: 'ID' },
    { name: 'EMISCode' },
    { name: 'name' },
    { name: 'gender' },
    { name: 'Birthday' },
    { name: 'Class' },

  ];

  constructor( private childrenService: ChildrenService) {
  }

  fetchChildren(): void {
    this.childrenService.fetchChildren().subscribe(data => {
      console.log(data);

      let childs =[]
      for (let i = 0;i < data.length;i++){
        this.dt = {}
        this.dt.name=data[i].student_name
        this.dt.gender=data[i].gender
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
