import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class TeacherService{
  constructor(
    private http: Http
  ){}

}
