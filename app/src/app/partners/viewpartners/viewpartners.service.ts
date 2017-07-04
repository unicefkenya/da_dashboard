import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../../baseurl';

@Injectable()
export class ViewpartnersService {
  private baseApiUrl = BaseUrl.base_api_url;

  constructor( private http: Http){}

  fetchPartners(page){
    return this.http.get(this.baseApiUrl+'api/partners?page='+page)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchAPartner(name){
    return this.http.get(this.baseApiUrl+'api/students?name='+name)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  searchData(name){

    return this.http.get(this.baseApiUrl+'api/partners?name='+name)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


}
