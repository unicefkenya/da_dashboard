import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../../baseurl';

@Injectable()
export class PartnerenrollmentsService {
  private baseApiUrl = BaseUrl.base_api_url;

  constructor( private http: Http){}



}
