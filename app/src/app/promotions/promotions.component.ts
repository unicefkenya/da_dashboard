import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PromotionsService} from './promotions.service';

import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Search } from '../search';



@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
  providers: [PromotionsService]

})
export class PromotionsComponent implements OnInit {

  constructor( private promotionsService: PromotionsService,private router: Router,private fb: FormBuilder) {
  }

  ngOnInit(){}

}
