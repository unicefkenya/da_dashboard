import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../../baseurl';

@Injectable()
export class EnrollmentService {
  private baseApiUrl = BaseUrl.base_api_url;
  constructor( private http: Http){}

//all
  fetchAllChildren(){
    return this.http.get(this.baseApiUrl+'api/students')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchAllPartnerChildren(id){
    return this.http.get(this.baseApiUrl+'api/students?partner='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchAllSchoolChildren(id){
    return this.http.get(this.baseApiUrl+'api/students?school='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //enrollments
  fetchChildren(page){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&page='+page)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchPartnerChildren(id,page){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&page='+page+'&partner='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchSchoolChildren(id,page){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&page='+page+'&school='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchBoyChildTotal(){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&gender=M')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchPartnerBoyChildTotal(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&gender=M&partner='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchSchoolBoyChildTotal(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&gender=M&school='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchGirlChildTotal(){
      return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&gender=F')
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

  fetchPartnerGirlChildTotal(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&gender=F&partner='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchSchoolGirlChildTotal(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&gender=F&school='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //searching by name
  searchData(name){

    return this.http.get(this.baseApiUrl+'api/students?enrolls?is_oosc=true&name='+name)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  searchPartnerData(id,name){
    return this.http.get(this.baseApiUrl+'api/students?enrolls?name='+name+'&partner='+id+'&is_oosc=true')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchSchoolData(id,name){
    return this.http.get(this.baseApiUrl+'api/students?enrolls?is_oosc=true&name='+name+'&school='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  //searching by Gender
  searchDataGender(gender){

    return this.http.get(this.baseApiUrl+'api/students?enrolls?is_oosc=true&gender='+gender)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  searchPartnerDataGender(id,gender){
    return this.http.get(this.baseApiUrl+'api/students?enrolls?is_oosc=true&gender='+gender+'&partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchSchoolDataGender(id,gender){
    return this.http.get(this.baseApiUrl+'api/students?enrolls?is_oosc=true&gender='+gender+'&school='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //searching by gender and name
  searchPartnerDataGenderName(id,gender,name){
    return this.http.get(this.baseApiUrl+'api/students?enrolls?is_oosc=true&gender='+gender+'&partner='+id+'name='+name)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchSchoolDataGenderName(id,gender,name){
    return this.http.get(this.baseApiUrl+'api/students?enrolls?is_oosc=true&gender='+gender+'&school='+id+'name='+name)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchDataGenderName(gender,name){
    return this.http.get(this.baseApiUrl+'api/students?enrolls?is_oosc=true&gender='+gender+'name='+name)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //searching by Partner
  searchAPartnerData(id){
    return this.http.get(this.baseApiUrl+'api/students?enrolls?is_oosc=true&partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //search by name and partner
  searchDataNamePartner(id,name){
    return this.http.get(this.baseApiUrl+'api/students?enrolls?is_oosc=true&partner='+id+'name='+name)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //search by gender and partner
  searchDataGenderPartner(id,gender){
    return this.http.get(this.baseApiUrl+'api/students?enrolls?is_oosc=true&partner='+id+'gender='+gender)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //search by name,gender,partner
  searchDataNameGenderPartner(id,gender,name){
    return this.http.get(this.baseApiUrl+'api/students?enrolls?is_oosc=true&partner='+id+'gender='+gender+'name='+name)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
