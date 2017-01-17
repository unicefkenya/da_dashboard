import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

import { User } from './user';


@Injectable()
export class SigninService {

  constructor(
    private _router: Router,
    private http: Http){}

    getUser(){
      return this.http.get('http://uoosc.cloudapp.net/api/users.json')
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }

  logout() {
    //localStorage.removeItem("user");
    this._router.navigate(['Login']);
  }

  login(user: any){
    /*
    const _signinUrl = 'http://uoosc.cloudapp.net/api/school';
    const body = JSON.stringify(user);

     //this is optional - angular2 already sends these
  //  const headers = new Headers();

    let headers = new Headers({
        'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});

    return this.http.post(_signinUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);
      */

      //localStorage.setItem("user", authenticatedUser);


  }
  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

   checkCredentials(){
    if (localStorage.getItem("user") === null){
        this._router.navigate(['Login']);
    }
  }
}
