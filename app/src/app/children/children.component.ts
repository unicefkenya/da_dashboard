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
  count: number = 0;
  offset: number = 0;
  limit: number = 100;
  table = {
    offset: 0
  };

  columns = [
    { name: 'Emiscode' },
    { name: 'Name', filtering:{filterString: '', placeholder: 'Filter by name'} },
    { name: 'Gender' },
    { name: 'Attendance' },
    { name: 'Class' },

  ];

  constructor( private childrenService: ChildrenService,private router: Router) {
  }

  fetchChildren(offset,limit): void {
    this.childrenService.fetchChildren().subscribe(data => {
      data = data.results;
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
      //cache our data
      this.temp = [...childs];
      //our initial data
      this.children = childs;
      this.selected = [];

      /*
      //pagination
      this.count = data.length;

      const start = offset * limit;
      const end = start + limit;
      console.log("Sadas",this.children);
      for (let i = start; i < end; i++) {
        this.children[i] = data[i];
      }


      console.log('Page Results', start, end);
      */
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

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.children = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }


/*
  onPage(event) {
    console.log('Page Event', event);
    this.fetchChildren(event.offset, event.limit);
  }
*/
  ngOnInit(): void {
    this.loading = true;
    this.fetchChildren(this.offset, this.limit);
  }

}
