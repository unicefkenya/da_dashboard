import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ClassService} from './class.service';


@Component({
  selector: 'app-classes',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
  providers: [ClassService]
})
export class ClassComponent implements OnInit{
  ngOnInit(){}
}
