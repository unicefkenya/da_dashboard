import {Component, OnInit, ElementRef} from '@angular/core';
import {AppModule} from '../../app.module';
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
  editing = {};
  rows = [];

  constructor(
    private _teacherRegistrationService: TeacherService
  ){
    this.fetch((data) => {
      this.rows = data;
    });
  }

  ngOnInit(){}

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.rows[row.$$index][cell] = event.target.value;
  }
  

}
