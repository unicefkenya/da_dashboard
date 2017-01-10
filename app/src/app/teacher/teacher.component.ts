import {Component, OnInit, ElementRef} from '@angular/core';
import {AppModule} from '../app.module';
import { NgForm } from '@angular/forms';
import { TeacherRegistration } from './teacher';
import { Response } from '@angular/http';
import {TeacherService} from './teacher.service';




@Component({
  selector: 'app-edit',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  providers: [TeacherService]
})


export class TeacherComponent implements OnInit{
  constructor(
    private _teacherRegistrationService: TeacherService
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
