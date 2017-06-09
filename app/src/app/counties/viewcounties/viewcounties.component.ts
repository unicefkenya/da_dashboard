import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewcountiesService} from './viewcounties.service';
//import { Partner } from './partner';



@Component({
  selector: 'app-viewcounties',
  templateUrl: './viewcounties.component.html',
  styleUrls: ['./viewcounties.component.scss'],
  providers: [ViewcountiesService]

})
export class ViewcountiesComponent {}
