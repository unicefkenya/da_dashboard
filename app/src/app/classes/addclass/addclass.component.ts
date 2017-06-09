import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AddclassService} from './addclass.service';
//import { Partner } from './partner';



@Component({
  selector: 'app-addclass',
  templateUrl: './addclass.component.html',
  styleUrls: ['./addclass.component.scss'],
  providers: [AddclassService]

})
export class AddclassComponent {}
