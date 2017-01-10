import {Component, OnInit, ElementRef} from '@angular/core';
import {AppModule} from '../app.module';
import { NgForm } from '@angular/forms';
import { ClassRegistration } from './class';
import { Response } from '@angular/http';
import {ClassService} from './class.service';




@Component({
  selector: 'app-edit',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
  providers: [ClassService]
})


export class ClassComponent implements OnInit{
  constructor(
    private _classRegistrationService: ClassService
  ){}

  ngOnInit(){}

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
