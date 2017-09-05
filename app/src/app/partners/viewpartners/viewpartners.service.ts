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
  //used in enrollment component
  fetchAllPartners(){
    return this.http.get(this.baseApiUrl+'api/partners')
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


  fetchPartnerBoyChildTotal(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&gender=M&partner='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  

  fetchPartnerGirlChildTotal(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&gender=F&partner='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
