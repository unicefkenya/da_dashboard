import { Component, OnInit,ChangeDetectionStrategy,ViewChild } from '@angular/core';
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

  @ViewChild('myfile') myfile;
  public form: FormGroup;
  public submitted;
  public studentDataType : importStudent;
  public empty;
  public fail;
  public importfile:any
  public success;
  public importAbort;
  abort: any;

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

  AbortImport(){
    this.abort = this._importService.abortImport();
    console.log(this.abort);
    if(this.abort){
      console.log('Aborted');
    }else{
      console.log('Inatudanganya');
    }
  }


    Importupload(event){
      let myfile = this.myfile.nativeElement.files[0];
      console.log(myfile);

      let fd=new FormData();
      fd.append("file",myfile);
      console.log(fd);
      this._importService.sendImportStudentsData(fd).subscribe(data=>
      {
        console.log(data);
        let message = JSON.parse(data[0].total_fails);
        console.log("fails", message);

        //this.success = "Data Imported Successfully";
      },error=>{
        console.log(error)
        this.fail = "Data Not Imported: "+error
      })
    }


    Verifyupload(event){
      let myfile = this.myfile.nativeElement.files[0];
      console.log(myfile);

      let fd=new FormData();
      fd.append("file",myfile);
      console.log(fd);
      this._importService.sendVerifyStudentsData(fd).subscribe(data=>
      {
        console.log(data);
        let message = data['total_fails'];
        console.log("fails", message);

        //this.success = "Data Verified Successfully";
      },error=>{
        console.log(error)
        //this.fail = "Data Contains Errors: "+error
      })
    }

/* original
  Importupload(event){
    let myfile=event.srcElement.files[0];
    //this.importfile = this.myfile.nativeElement.files;
    //console.log(this.myfile);
    console.log(myfile);

    let fd=new FormData();

    fd.append("file",myfile);
    console.log(fd);

    this._importService.sendStudentsData(fd).subscribe(data=>{
      console.log(data);
      console.log(this._importService.progress);
      this.success = "Data Imported Successfully";
    },error=>{
      console.log(error)
      this.fail = "Data Not Imported: "+error
    })
  }*/

  Progressupload(event){

  }

}
