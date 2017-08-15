import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PartnerenrollmentsService} from './partnerenrollments.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Search } from '../../search';



@Component({
  selector: 'app-partner',
  templateUrl: './partnerenrollments.component.html',
  styleUrls: ['./partnerenrollments.component.scss'],
  providers: [PartnerenrollmentsService]

})
export class PartnerenrollmentsComponent implements OnInit {
  public form: FormGroup;
  public submitted: boolean =  true;
  public search: Search;
  success:string;
  empty: string;
  fail: string;
  loading:boolean;
  dt:any;
  partners: any[] = this.rows;
  selected: any[];
  rows = [];
  temp = [];
  count: number = 0;
  offset: number = 0;
  limit: number = 100;
  page:number=1
  table = {
    offset: 0
  };
  partnerId:number;
  columns = [
    { name: 'Organization', filtering:{filterString: '', placeholder: 'Filter by name'} },
    { name: 'Email' },
    { name: 'Phonenumber' }
  ];

  constructor( private partnersService: PartnerenrollmentsService,private router: Router,private fb: FormBuilder) {
  }

  onSelect({ selected }) {
   localStorage.setItem('partnerId', this.selected[0].id);
   this.navigatePartner(this.selected[0].id);
   //this.router.navigate(['/partners/child', this.selected[0].id]);
   }

   private navigatePartner(id){
     //console.log('show partner')
     this.router.navigate(['partners/partner/', id]);
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
      this.partners = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = this.page;

    console.log('Filter event', event);
  }



  onPage(event) {
    console.log(event.offset);
  }

  ngOnInit(): void {
    this.loading = true;

  }

}
