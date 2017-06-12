import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ChildrenService} from './children.service';
import { Children } from './children';



@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
  providers: [ChildrenService]

})
export class ChildrenComponent implements OnInit {

  loading:boolean;
  dt:any;
  children: any[] = this.rows;
  selected: any[];
  rows = [];
  temp = [];
  tableOffset = 1;

  columns = [
    { name: 'Emiscode' },
    { name: 'Name', filtering:{filterString: '', placeholder: 'Filter by name'} },
    { name: 'Gender' },
    { name: 'Attendance' },
    { name: 'Class' },

  ];

  constructor( private childrenService: ChildrenService,private router: Router) {
  }

  fetchChildren(): void {
    this.childrenService.fetchChildren().subscribe(data => {
      this.loading = false;
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
   //console.log('Select Event', selected, this.selected,this.selected[0].id);
   localStorage.setItem('childId', this.selected[0].id);
   this.getChildId(this.selected[0].id);
   //this.router.navigate(['/children/child', this.selected[0].id]);
   }

   private getChildId(id){

     this.router.navigate(['/children/child', id]);

   }

   onActivate(event) {
     //console.log('Activate Event', event);
   }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    this.rows = [...this.children];
    this.temp = [...this.rows];

    // filter our data
    const temp = this.rows.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.children = temp;

    // Whenever the filter changes, always go back to the first page
    this.tableOffset = 0;

  }



  ngOnInit(): void {
    this.loading = true;
    this.fetchChildren();
  }

}
