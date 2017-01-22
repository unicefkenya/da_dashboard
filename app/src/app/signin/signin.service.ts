import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

import { User } from './user';


@Injectable()
export class SigninService {

  //public handleError;

  constructor(
    private _router: Router,
    private http: Http){}


  logout() {
    localStorage.removeItem("user");
    this._router.navigate(['signin']);
  }

  login(user: any){

    const _signinUrl = 'http://uoosc.cloudapp.net/o/token/';
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
          localStorage.setItem("user", JSON.stringify(user));
        }else{
          localStorage.removeItem("user");
          //this._router.navigate(['signin']);
        }
      })
      .catch(this.handleError);
  }


  handleError(error: any){
    console.error(error);
   return Observable.throw(error.json().error || 'Server error');
  }
  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

   checkCredentials(){
    if (localStorage.getItem("user") === null){
        this._router.navigate(['signin']);
    }
  }
}
