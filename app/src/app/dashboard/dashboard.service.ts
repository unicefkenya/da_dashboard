import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../baseurl';

@Injectable()
export class DashboardService {

  constructor( private http: Http){}

private baseApiUrl = BaseUrl.base_api_url;

  getStats(){
    return this.http.get(this.baseApiUrl+'/api/statistics')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getWeeklySummary(){
    return this.http.get(this.baseApiUrl+'api/attendance/weekly')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
