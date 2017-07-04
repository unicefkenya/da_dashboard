import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../../baseurl';

@Injectable()
export class EnrollmentService {
  private baseApiUrl = BaseUrl.base_api_url;
  constructor( private http: Http){}

  fetchChildren(page){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&page='+page)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchPartnerChildren(id,page){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&page='+page+'&partner='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchBoyChildTotal(){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&gender=M')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchPartnerBoyChildTotal(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&gender=M&partner='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchGirlChildTotal(){
      return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&gender=F')
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

  fetchPartnerGirlChildTotal(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&gender=F&partner='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
