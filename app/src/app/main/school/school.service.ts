import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class SchoolService{
  constructor(
    private http: Http
  ){}

  sendData(user: any){

    //console.log(myApiRoutes=>apiRoutes);

    const _schoolRegistrationUrl = 'http://127.0.0.1:8000/api/school';
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

  getHeadTeacherData(){
    return this.http.get('http://127.0.0.1:8000/api/teachers.json')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUsers(){
    return this.http.get('http://127.0.0.1:8000/api/users.json')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getConstituencies(){
    return this.http.get('http://127.0.0.1:8000/api/counstituencies.json')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }



  private handleError(error: any){
    console.log(error);
    return Observable.throw(error);
  }
}
