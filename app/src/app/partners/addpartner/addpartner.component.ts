import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AddpartnerService} from './addpartner.service';
//import { Partner } from './partner';



@Component({
  selector: 'app-partner',
  templateUrl: './addpartner.component.html',
  styleUrls: ['./addpartner.component.scss'],
  providers: [AddpartnerService]

})
export class AddpartnerComponent implements OnInit{
  ngOnInit(){}
}
