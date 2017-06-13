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
  public importAbort;

  file:File;
  private baseApiUrl = BaseUrl.base_api_url;

  constructor(
    private _importService: ImportsService,private http:Http,
    private fb: FormBuilder)
    {
    this.form = this.fb.group({
      myfile: [null, Validators.compose([Validators.required,])],
    });
  }

  ngOnInit(): void {

  }

  AbortImport(event){
    let xhr = new XMLHttpRequest();
    xhr.abort();
    console.log("Aborted");
    this.importAbort = "Aborted";
  }

  Importupload(event){
    let myfile=event.srcElement.files[0]
    const studentsImport = this.baseApiUrl+'api/students/import';
    let token=localStorage.getItem("user");
    let fd=new FormData();
    fd.append("file",myfile);
    this._importService.sendStudentsData(fd).subscribe(data=>{
      console.log(data);
      this.success = "Data Imported Successfully";
    },error=>{
      console.log(error)
      this.fail = "Data Not Imported"+error
    })
  }

}
