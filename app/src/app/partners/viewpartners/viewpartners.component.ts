import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewpartnersService} from './addpartner.service';
//import { Partner } from './partner';



@Component({
  selector: 'app-partner',
  templateUrl: './viewpartners.component.html',
  styleUrls: ['./viewpartners.component.scss'],
  providers: [ViewpartnersService]

})
export class ViewpartnersComponent implements OnInit {}
