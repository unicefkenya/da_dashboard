import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../baseurl';

@Injectable()
export class SearchService {

  constructor( private http: Http){}

  private baseApiUrl = BaseUrl.base_api_url;

  getSchoolStats(link){
    return this.http.get(this.baseApiUrl+'api/students/enrolls/school?school='+link)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSevenDaysAttendance(id){
    return this.http.get(this.baseApiUrl+'api/attendances/class?school='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getChildrenEnrolled(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls/class/school?school='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


}