import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TeachersService} from './teachers.service';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  providers: [TeachersService]
})
export class TeachersComponent implements OnInit{
  constructor(private teachersService: TeachersService,private router: Router) {  }

  ngOnInit(){}
}
