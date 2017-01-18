import { Injectable } from '@angular/core';


@Injectable()
export class ApiService {
  constructor(
    public api_url = "http://uoosc.cloudapp.net/api/"
  ){}
}
