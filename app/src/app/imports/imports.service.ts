import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import {BaseUrl} from '../baseurl';

@Injectable()
export class ImportsService {
  progress:any;
  constructor(private http: Http) {

  }

private baseApiUrl = BaseUrl.base_api_url;

//data importing
sendStudentsData(data: any){
  return Observable.fromPromise(new Promise((resolve, reject) => {
    const studentsImport = this.baseApiUrl+'api/students/import';
    let loadstart;
    let progress;
    let load;
    let token=localStorage.getItem("user");
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(xhr.response)
            }
        }
    }
    xhr.open("POST", studentsImport, true);
    xhr.setRequestHeader("Authorization", "Bearer "+JSON.parse(token));
    xhr.send(data);
    
    }))
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
