import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DashboardService {

  constructor( private http: Http){}

  getStats(){
    return this.http.get('http://uoosc.cloudapp.net/api/statistics.json')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getWeeklySummary(){
    return this.http.get('http://uoosc.cloudapp.net/api/attendance/weekly')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
