import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ClassService} from './class.service';
import { Class } from './class';



@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
  providers: [ClassService]

})
export class ClassComponent implements OnInit {}
