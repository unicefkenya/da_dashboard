import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ImportsService} from './imports.service';
import { FileUploader,FileSelectDirective, FileDropDirective, } from 'ng2-file-upload/ng2-file-upload';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { CustomValidators } from 'ng2-validation';
import {importStudent} from './importStudent';

import {BaseUrl} from '../baseurl';



@Component({
  selector: 'app-imports',
  templateUrl: './imports.component.html',
  styleUrls: ['./imports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ImportsService]

})



export class ImportsComponent implements OnInit {


  public form: FormGroup;
  public submitted;
  public studentDataType : importStudent;
  public empty;
  public fail;
  public myfile:any
  public success;
  file:File;
  private baseApiUrl = BaseUrl.base_api_url;

  constructor(
    private _importService: ImportsService,private http:Http,
    private fb: FormBuilder)
    {
    this.form = this.fb.group({
      myfile: [null, Validators.compose([Validators.required,])],
    });

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        console.log("ImageUpload:uploaded:", item, item.isError, response);
    };


    this.uploader.onErrorItem = (item:any, response:any, status:any, headers:any)=>{
        console.log('error', status);
    };
  }

  ngOnInit(): void {
    console.log(this.baseApiUrl+'api/students/import');
  }


  public uploadFile;
  Importupload(event){
    let myfile=event.srcElement.files[0]
    console.log(myfile);

      const studentsImport = this.baseApiUrl+'api/students/import';
    //  const body = user;
       //this is optional - angular2 already sends these
       //const headers = new Headers();

      let token=localStorage.getItem("user");
    let fd=new FormData()
    fd.append("file",myfile)

    // this._importService.sendStudentsData(fd).subscribe(data=>{
    //   console.log(data);
    // })
    // this.http.post("http://oosc.cloudapp.net/api/students/import",fd).subscribe(data=>{
    //   console.log(data);
    // })
    this._importService.sendStudentsData(fd).subscribe(data=>{

    },error=>{
      console.log(error)
    })
  }

  public token=localStorage.getItem("user");

  public uploader:FileUploader = new FileUploader({
            url: this.baseApiUrl+'api/students/import',
            headers: [
              {name: 'Content-Type', value:'multipart/form-data'}
            ],
            itemAlias: 'file',
            disableMultipart: false,
            authToken: 'Authorization',
            authTokenHeader: this.token
          });
  upload(){
    this._importService.sendStudentsData({file:this.uploader}).subscribe(data=>{
      console.log(data);
    });
  }
// public uploader:FileUploader = new FileUploader({
//           url: 'https://evening-anchorage-3159.herokuapp.com/api/',
//         });

  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;



  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

}
