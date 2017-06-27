import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewTeachersService } from './viewteachers.service';

@Component({
  selector: 'app-viewteachers',
  templateUrl: './viewteachers.component.html',
  styleUrls: ['./viewteachers.component.scss'],
  providers: [ViewTeachersService]
})
export class ViewTeachersComponent implements OnInit {

  constructor(private teachersService: ViewTeachersService,private router: Router) {  }
  loading:boolean;
  teachers : any[] = this.rows;
  selected: any[];
  tmp :any;
  rows = [];
  temp = [];
  count: number = 0;
  offset: number = 0;
  limit: number = 100;
  page:number=1
  table = {
    offset: 0
  };

  schoolId: number;

  columns = [
    { name: 'Name' },
    { name: 'Phone Number' },
    { name: 'Gender' },
    { name: 'Qualifications' },
    { name: 'Teacher Type' }

  ];

  fetchTeachers(id,offset,limit): void{
    this.teachersService.fetchTeachers(id,this.page).subscribe( data=> {
      //start and end for pagination
      const start = offset * limit;
      const end = start + limit;
       this.count =data.count
      data = data.results;
      this.loading = false;

      let items = [];
      let rows=[];
      for (let i = 0; i < data.length; i++){
        this.tmp = {}
        this.tmp.name = data[i].name
        this.tmp.phone_no = data[i].phone_no
        this.tmp.gender = data[i].gender
        this.tmp.qualifications = data[i].qualifications
        this.tmp.teachertype = data[i].teacher_type
        items.push(this.tmp);
      }

      //cache our data
      let row=[...rows]
      this.temp = [...items];
      let j=0
      for (let i = start; i < end; i++) {
        row[i] = items[j];
        j++;
      }
      //our initial data
      this.teachers = items;
      this.selected = [];
      console.log('Page Results',this.teachers,this.count, start, end);

    });
  }

  onPage(event) {
    console.log(event.offset);
    this.page=event.offset+1

    this.fetchTeachers(this.schoolId,event.offset, event.limit);

  }


  ngOnInit(): void {
    this.loading = true;
    this.schoolId = JSON.parse(localStorage.getItem("schoolId"));
    this.fetchTeachers(this.schoolId,this.offset, this.limit);
  }
  onSelect({ selected }) {
   //console.log('Select Event', selected, this.selected,this.selected[0].id);
   localStorage.setItem('teacherId', this.selected[0].id);
   this.getTeacherId(this.selected[0].id);
   //this.router.navigate(['/teacher', this.selected[0].id]);
   }

   private getTeacherId(id){

     this.router.navigate(['/teachers/teacher', id]);

   }

   onActivate(event) {
     //console.log('Activate Event', event);
   }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.teachers = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }


}
