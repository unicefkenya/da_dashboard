import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../baseurl';

@Injectable()
export class SocialService {
  private baseApiUrl = BaseUrl.base_api_url;

  constructor( private http: Http){}

  fetchUserProfile(id){
    return this.http.get(this.baseApiUrl+'api/partners?id='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
