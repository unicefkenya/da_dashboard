import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PartnerService} from './partner.service';
//import { Partner } from './partner';



@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss'],
  providers: [PartnerService]

})
export class PartnerComponent {}
