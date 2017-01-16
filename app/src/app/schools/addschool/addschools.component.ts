import {Component, OnInit, ElementRef} from '@angular/core';
import {AppModule} from '../../app.module';
import { NgForm } from '@angular/forms';
import { SchoolRegistration } from './school';
import { Response } from '@angular/http';
import {AddSchoolService} from './addschool.service';

@Component({
  selector: 'app-school',
  templateUrl: './addschool.component.html',
  styleUrls: ['./addschool.component.scss'],
  //providers: [AddSchoolService]
})


// export class AddSchoolsComponent implements OnInit{
//   editing = {};
//   rows = [];
//
//   constructor(
//     private _schoolRegistrationService: AddSchoolService
//   ){
//     this.fetch((data) => {
//       this.rows = data;
//     });
//   }
//
//   fetch(cb) {
//     const req = new XMLHttpRequest();
//     req.open('GET', `assets/data/company.json`);
//
//     req.onload = () => {
//       cb(JSON.parse(req.response));
//     };
//
//     req.send();
//   }
//
//   updateValue(event, cell, cellValue, row) {
//     this.editing[row.$$index + '-' + cell] = false;
//     this.rows[row.$$index][cell] = event.target.value;
//   }
//
//
//   public schoolConstituency;
//   public schoolCounty;
//   public submitted: boolean =  true;
//   public school: SchoolRegistration;
//
//   ngOnInit(){
//     //this.onSubmit;
//     this.getSchoolCounties();
//     this.getSchoolConstituencies();
//
//   }
//
//
//   onSubmit(registerSchool: SchoolRegistration){
//     if(!this.submitted){
//
//       //edit
//     }else{
//       this.school = new SchoolRegistration(registerSchool.schoolName, registerSchool.schoolCode, registerSchool.emisCode, registerSchool.geo_cordinates,registerSchool.waterSource, registerSchool.headTeacherName, registerSchool.headTeacherPhone,registerSchool.constituency,registerSchool.county);
//
//       this._schoolRegistrationService.sendData({
//             school_name: registerSchool.schoolName,
//             school_code: registerSchool.schoolCode,
//             geo_cordinates: registerSchool.geo_cordinates,
//             emis_code: registerSchool.emisCode,
//             constituency: registerSchool.constituency,
//             county: registerSchool.county,
//             source_of_water: registerSchool.waterSource,
//             headteacher: 8,
//             phone_no: 2323
//           })
//           .subscribe(
//             data => console.log(data)
//           );
//         }
//   }
//
//   getSchoolCounties(){
//
//     this._schoolRegistrationService.getCounties()
//       .subscribe(
//         (res)=>{
//           const countyName = [];
//           for (let county_name in res){
//             countyName.push(res[county_name]);
//           }
//           this.schoolCounty = countyName;
//           console.log(countyName);
//         },
//       (err) => console.log(err),
//       ()=>console.log("Done")
//     );
//   }
//
//   getSchoolConstituencies(){
//
//     this._schoolRegistrationService.getConstituencies()
//       .subscribe(
//         (res)=>{
//           const constituencyName = [];
//           for (let constituency in res){
//             constituencyName.push(res[constituency]);
//           }
//           this.schoolConstituency = constituencyName;
//           console.log(constituencyName);
//         },
//       (err) => console.log(err),
//       ()=>console.log("Done")
//     );
//   }
//
//
//
//
// }


export class AddSchoolsComponent {

}
