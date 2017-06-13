import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import {BaseUrl} from '../baseurl';

@Injectable()
export class ImportsService {

  constructor(private http: Http) { }

private baseApiUrl = BaseUrl.base_api_url;

/*
//send Import data
sendSchoolsData(user: any){

  const schoolsImport = this.baseApiUrl+'api/schools/import';
  const body = JSON.stringify(user);

   //this is optional - angular2 already sends these
   //const headers = new Headers();
  let token=localStorage.getItem("user");
  let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+token
  });

  let options = new RequestOptions({headers: headers});

  return this.http.post(schoolsImport, body, options)
    .map(this.extractData)
    .catch(this.handleError);

}*/

//students
sendStudentsData(user: any){

  const studentsImport = this.baseApiUrl+'api/students/import';
  const body = user;

   //this is optional - angular2 already sends these
   //const headers = new Headers();
  let token=localStorage.getItem("user");
  let headers = new Headers({
      'Content-Type': 'multipart/form-data',
      'Authorization':'Bearer '+token
  });

  let options = new RequestOptions({headers: headers});

  return this.http.post(studentsImport, body, options)
    .map(this.extractData)
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
