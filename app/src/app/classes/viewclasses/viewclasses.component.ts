import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewClassesService} from './viewclasses.service';
//import { Partner } from './partner';



@Component({
  selector: 'app-viewclasses',
  templateUrl: './viewclasses.component.html',
  styleUrls: ['./viewclasses.component.scss'],
  providers: [ViewClassesService]

})
export class ViewClassesComponent implements OnInit{
  ngOnInit(){}
}
