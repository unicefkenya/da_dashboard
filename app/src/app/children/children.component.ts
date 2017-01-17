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

  rows = [];
  children: Children[];
  records: Children[];
  columns = [
    { name: 'ID' },
    { name: 'EMISCode' },
    { name: 'student_name' },
    { name: 'Gender' },
    { name: 'Birthday' },
    { name: 'Class' },

  ];

  constructor( private childrenService: ChildrenService) {
  }

  fetchChildren(): void {
    this.childrenService.fetchChildren().subscribe(data => {
      this.children = data;
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.fetchChildren()
  }

}
