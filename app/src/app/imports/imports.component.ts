import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ImportsService} from './imports.service';
import { FileUploader,FileSelectDirective, FileDropDirective, } from 'ng2-file-upload/ng2-file-upload';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { CustomValidators } from 'ng2-validation';
import {importStudent} from './importStudent';

import {BaseUrl} from '../baseurl';


// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

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
  public success;
  private baseApiUrl = BaseUrl.base_api_url;

  constructor(
    private _importService: ImportsService,
    private fb: FormBuilder)
    {
    this.form = this.fb.group({

    });

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        console.log("ImageUpload:uploaded:", item, item.isError, response);
    };


    this.uploader.onErrorItem = (item:any, response:any, status:any, headers:any)=>{
        console.log('error', response, status);
    };
  }

  ngOnInit(): void {

  }

  public token=localStorage.getItem("user");

  public uploader:FileUploader = new FileUploader({
            url: this.baseApiUrl+'api/students/import',
            authToken: 'Authorization',
            authTokenHeader: this.token
          });


/*
public uploader:FileUploader = new FileUploader({
          url: 'https://evening-anchorage-3159.herokuapp.com/api/',
        });
  */
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;



  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

}
