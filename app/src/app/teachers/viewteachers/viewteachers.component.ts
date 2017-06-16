import { Component, OnInit } from '@angular/core';
import { ViewTeachersService } from './viewteachers.service';

@Component({
  selector: 'app-viewteachers',
  templateUrl: './viewteachers.component.html',
  styleUrls: ['./viewteachers.component.scss'],
  providers: [ViewTeachersService]
})
export class ViewTeachersComponent implements OnInit {

  constructor(private teachersService: ViewTeachersService) {  }
  loading:boolean;
  teachers : any[];
  selected: any[];
  tmp :any;
  temp = [];
  rows = [];
  table = {
    offset: 0
  };

  columns = [
    { name: 'Name' },
    { name: 'Phone Number' },
    { name: 'Gender' },
    { name: 'Qualifications' },
    { name: 'Teacher Type' }

  ];

  fetchTeachers(): void{
    this.teachersService.fetchTeachers().subscribe( data=> {
      //console.log(data.results[0].teacher_type);
      data = data.results;
      this.loading = false;
      let items = [];
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
      this.temp = [...items];
      //our initial data
      this.teachers = items;
      this.selected = [];

    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.fetchTeachers();
  }
  onSelect({ selected }) {
   //console.log('Select Event', selected, this.selected,this.selected[0].id);
   //localStorage.setItem('teacherId', this.selected[0].id);
   //this.getTeacherId(this.selected[0].id);
   //this.router.navigate(['/teacher', this.selected[0].id]);
   }

   private getTeacherId(id){

     //this.router.navigate(['/children/child', id]);

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
