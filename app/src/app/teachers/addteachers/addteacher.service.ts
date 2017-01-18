import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
//import {ApiService} from '../../api.service';



@Injectable()
export class AddTeacherService {
  constructor(
    private http: Http,
    private datePipe: DatePipe,
    //private api: ApiService
  ){}

  transformDate(date){
    this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  sendData(user: any){

    //console.log(this.api.api_url);

    const _teacherRegistrationUrl = 'http://uoosc.cloudapp.net/api/teacher';
    const body = JSON.stringify(user);

     //this is optional - angular2 already sends these
     //const headers = new Headers();
    let token=localStorage.getItem("user");
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });

    let options = new RequestOptions({headers: headers});

    return this.http.post(_teacherRegistrationUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  getSchools(){
    let token=localStorage.getItem("user");
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });
    let options = new RequestOptions({headers: headers});
    return this.http.get('http://uoosc.cloudapp.net/api/schools.json',options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  private handleError(error: any){
    console.log(error);
    return Observable.throw(error);
  }
}
