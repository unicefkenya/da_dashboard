import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class EnrollmentService {
  constructor( private http: Http){}

  fetchChildren(){
    return this.http.get('http://uoosc.cloudapp.net/api/students/enrolls')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
