import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ChangepasswordService} from './changepassword.service';
//import { Partner } from './partner';



@Component({
  selector: 'app-partner',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
  providers: [ChangepasswordService]

})
export class ChangepasswordComponent implements OnInit {
  ngOnInit(){}
}
