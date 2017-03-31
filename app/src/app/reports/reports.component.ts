import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ReportsService} from './reports.service';
import { Attendance } from './attendance';



@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [ReportsService]

})
export class ReportsComponent implements OnInit {

  dt:any;
  children: any[];
  selected: any[];

  columns = [
    { name: 'Emiscode' },
    { name: 'Name' },
    { name: 'Gender' },
    { name: 'Attendance' },
    { name: 'Class' },

  ];

  constructor( private reportsService: ReportsService,private router: Router,) {
  }

  fetchChildren(): void {
    this.reportsService.fetchOverallAttendance().subscribe(data => {

      let childs =[]
      for (let i = 0;i < data.length;i++){
        this.dt = {}
        this.dt.emiscode=data[i].emis_code
        this.dt.name=data[i].student_name
        this.dt.gender=data[i].gender
        this.dt.attendance=data[i].last_attendance
        this.dt.class=data[i].class_name
        this.dt.id = data[i].id
        childs.push(this.dt)
      }
      this.children = childs;
      this.selected = [];
    });
  }

  onSelect({ selected }) {
   console.log('Select Event', selected, this.selected,this.selected[0].id);
   //localStorage.setItem('childId', this.selected[0].id);
   //this.getChildId(this.selected[0].id);
   //this.router.navigate(['/children/child', this.selected[0].id]);
 }

 private getChildId(id){

   this.router.navigate(['/children/child', id]);

 }

 onActivate(event) {
   //console.log('Activate Event', event);
 }

  ngOnInit(): void {
    this.fetchChildren()
  }

}
