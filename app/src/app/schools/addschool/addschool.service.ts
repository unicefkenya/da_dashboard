import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class AddSchoolService{
  constructor(
    private http: Http
  ){}

  sendData(user: any){

    //console.log(myApiRoutes=>apiRoutes);

    const _schoolRegistrationUrl = 'http://uoosc.cloudapp.net/api/school';
    const body = JSON.stringify(user);

     //this is optional - angular2 already sends these
  //  const headers = new Headers();

    let headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    });

    let options = new RequestOptions({headers: headers});

    return this.http.post(_schoolRegistrationUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  getUsers(){
    return this.http.get('http://uoosc.cloudapp.net/api/users.json')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getConstituencies(){
    return this.http.get('http://uoosc.cloudapp.net/api/counstituencies.json')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getCounties(){
    return this.http.get('http://uoosc.cloudapp.net/api/counties.json')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }



  private handleError(error: any){
    console.log(error);
    return Observable.throw(error);
  }
}
