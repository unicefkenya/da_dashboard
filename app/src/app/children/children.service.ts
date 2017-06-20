import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../baseurl';

@Injectable()
export class ChildrenService {
  private baseApiUrl = BaseUrl.base_api_url;

  constructor( private http: Http){}

  fetchChildren(page){
    return this.http.get(this.baseApiUrl+'api/students?page='+page)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
