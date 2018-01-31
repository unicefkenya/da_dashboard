import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../baseurl';

@Injectable()
export class DashboardService {

  constructor( private http: Http){}

  private baseApiUrl = BaseUrl.base_api_url;

  getStats(){
    return this.http.get(this.baseApiUrl+'api/statistics')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartner(id){
    return this.http.get(this.baseApiUrl+'api/partners/'+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerStats(id){
    return this.http.get(this.baseApiUrl+'api/statistics?partner='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerAdminStats(id){
    return this.http.get(this.baseApiUrl+'api/statistics?partner_admin='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getWeeklySummary(){
    return this.http.get(this.baseApiUrl+'api/attendance/weekly')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerWeeklySummary(id){
    return this.http.get(this.baseApiUrl+'api/attendance/weekly?partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerAdminWeeklySummary(id){
    return this.http.get(this.baseApiUrl+'api/attendance/weekly?partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

/*
Annual all children attendance services
--------
*/
  getAnnualAttendanceGender(){
    return this.http.get(this.baseApiUrl+'api/attendances/yearly')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerAnnualAttendanceGender(id){
    return this.http.get(this.baseApiUrl+'api/attendances/yearly?partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerAdminAnnualAttendanceGender(id){
    return this.http.get(this.baseApiUrl+'api/attendances/yearly?partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


/*
Annual newly Enrolled attendance services
--------
*/
  getEnrolledAnnualAttendanceGender(){
    return this.http.get(this.baseApiUrl+'api/attendances/yearly?is_oosc=true')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getEnrolledPartnerAnnualAttendanceGender(id){
    return this.http.get(this.baseApiUrl+'api/attendances/yearly?partner='+id+'&is_oosc=true')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getEnrolledPartnerAdminAnnualAttendanceGender(id){
    return this.http.get(this.baseApiUrl+'api/attendances/yearly?partner_admin='+id+'&is_oosc=true')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }



  getAnnualEnrollmentGender(){
    return this.http.get(this.baseApiUrl+'api/students/enrolls/gender')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerAnnualEnrollmentGender(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls/gender?partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getPartnerAdminAnnualEnrollmentGender(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls/gender?partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


/*
Monthly all children attendance
-----------
*/
  getMonthlyAttendance(){
    return this.http.get(this.baseApiUrl+'api/attendances/monthly')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerMonthlyAttendance(id){
    return this.http.get(this.baseApiUrl+'api/attendances/monthly?partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerAdminMonthlyAttendance(id){
    return this.http.get(this.baseApiUrl+'api/attendances/monthly?partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


/*
Monthly newly enrolled children attendance
-----------
*/
  getEnrolledMonthlyAttendance(){
    return this.http.get(this.baseApiUrl+'api/attendances/monthly?is_oosc=true')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getEnrolledPartnerMonthlyAttendance(id){
    return this.http.get(this.baseApiUrl+'api/attendances/monthly?partner='+id+'&is_oosc=true')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getEnrolledPartnerAdminMonthlyAttendance(id){
    return this.http.get(this.baseApiUrl+'api/attendances/monthly?partner_admin='+id+'&is_oosc=true')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


 /*
Weekly all children attendance
-------------
 */
  getSevenDaysAttendance(){
    return this.http.get(this.baseApiUrl+'api/attendances/daily')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getPartnerSevenDaysAttendance(id){
    return this.http.get(this.baseApiUrl+'api/attendances/daily?partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getPartnerAdminSevenDaysAttendance(id){
    return this.http.get(this.baseApiUrl+'api/attendances/daily?partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


 /*
Weekly newly enrolled children attendance
-------------
 */
  getEnrolledSevenDaysAttendance(){
    return this.http.get(this.baseApiUrl+'api/attendances/daily?is_oosc=true')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getEnrolledPartnerSevenDaysAttendance(id){
    return this.http.get(this.baseApiUrl+'api/attendances/daily?partner='+id+'&is_oosc=true')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getEnrolledPartnerAdminSevenDaysAttendance(id){
    return this.http.get(this.baseApiUrl+'api/attendances/daily?partner_admin='+id+'&is_oosc=true')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  getEnrollmentGraph(){
    return this.http.get(this.baseApiUrl+'api/students/enrolls/class')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerEnrollmentGraph(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls/class?partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerAdminEnrollmentGraph(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls/class?partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
