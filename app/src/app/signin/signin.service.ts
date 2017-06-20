import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../baseurl';

import { User } from './user';


@Injectable()
export class SigninService {

  //public handleError;
  public err;
  private baseApiUrl = BaseUrl.base_api_url;

  constructor(
    private _router: Router,
    private http: Http){}


  logout() {
    localStorage.removeItem("user");
    this._router.navigate(['signin']);
  }

  login(user: any){

    const _signinUrl = this.baseApiUrl+'o/token/';
    const body = JSON.stringify(user);

     //this is optional - angular2 already sends these
  //  const headers = new Headers();

    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let options = new RequestOptions({headers: headers});

    return this.http.post(_signinUrl, user, options)
      .map((data: Response) => {
        //login successful if there's a jwt token in response
        this.extractData  = data.json().access_token;
        let user = data.json();
      //  console.log(this.extractData, user.access_token);

        if(user && user.access_token){
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("user", JSON.stringify(user.access_token));

        }else{
          localStorage.removeItem("user");
          //this._router.navigate(['signin']);
        }
      })
      .catch(this.handleError);
  }


   checkCredentials(){
    if (localStorage.getItem("user") === null){
        this._router.navigate(['signin']);
    }
  }

  getUserType(user){
      //assign the url like below
      const _userTypeUrl = this.baseApiUrl+'api/user-type';
      let headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+user
      });

      let options = new RequestOptions({headers: headers});

      return this.http.get(_userTypeUrl, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }


  private handleError(error: Response | any){
    let errMsg: string;

    if(error instanceof Response){
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }else{
      errMsg = error.message ? error.message: error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
  }
}
