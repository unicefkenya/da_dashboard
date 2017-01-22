import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';



@Injectable()
export class AddChildrenService {
  constructor(
    private http: Http
  ){}

  sendData(user: any){

    //console.log(myApiRoutes=>apiRoutes);

    const _childRegistrationUrl = 'http://uoosc.cloudapp.net/api/students';
    const body = JSON.stringify(user);

     //this is optional - angular2 already sends these
     //const headers = new Headers();
    let token=localStorage.getItem("user");
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });

    let options = new RequestOptions({headers: headers});

    return this.http.post(_childRegistrationUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }


  getClass(){
    let token=localStorage.getItem("user");
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });
    let options = new RequestOptions({headers: headers});
    return this.http.get('http://uoosc.cloudapp.net/api/classes.json',options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
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
