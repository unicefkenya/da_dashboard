import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class AddSchoolService {
  constructor(
    private http: Http
  ){}

  public err;
  sendData(user: any){

    //console.log(myApiRoutes=>apiRoutes);

    const _schoolRegistrationUrl = 'http://uoosc.cloudapp.net/api/school';
    const body = JSON.stringify(user);

     //this is optional - angular2 already sends these
     //const headers = new Headers();
    let token=localStorage.getItem("user");
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
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

  getConstituencies(){
    let token=localStorage.getItem("user");
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });
    let options = new RequestOptions({headers: headers});
    return this.http.get('http://uoosc.cloudapp.net/api/zones.json',options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getCounties(){
    let token=localStorage.getItem("user");
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });
    let options = new RequestOptions({headers: headers});
    return this.http.get('http://uoosc.cloudapp.net/api/counties.json',options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private handleError(error: any){

    this.err = error.json();
    console.log(error, this.err.emis_code);
    return Observable.throw(error);
  }
}
