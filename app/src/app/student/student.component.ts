import {Component, OnInit, ElementRef} from '@angular/core';
import {AppModule} from '../app.module';
import {StudentService} from './student.service';
import { Response } from '@angular/http';



@Component({
  selector: 'app-edit',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  providers: [StudentService]
})


export class StudentComponent implements OnInit{
  constructor(
    private _studentRegistrationService: StudentService
  ){}


  ngOnInit(){  }

  systems: Object[] = [{
    name: 'Lights',
    on: false,
  }, {
    name: 'Surround Sound',
    on: true,
  }, {
    name: 'T.V.',
    on: true,
  }, {
    name: 'Entertainment System',
    on: true,
  }, ];


}
