import { Component } from '@angular/core';

@Component({
  selector: 'app-table-sorting',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenComponent {
  rows = [];

  columns = [
    { name: 'ID' },
    { name: 'EMISCode' },
    { name: 'Name' },
    { name: 'Gender' },
    { name: 'Birthday' },
    { name: 'Class' },

  ];

  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/children.json`);

    req.onload = () => {
      let data = JSON.parse(req.response);
      cb(data);
    };

    req.send();
  }

}
