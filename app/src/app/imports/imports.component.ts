import { Component, OnInit,ChangeDetectionStrategy,ChangeDetectorRef,ViewChild } from '@angular/core';
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
  errors: any[];
  count: number = 0;
  offset: number = 0;
  limit: number = 100;

  file:File;
  columns = [
    { name: 'Rownumber' },
    { name: 'Error' }
  ];


  private baseApiUrl = BaseUrl.base_api_url;

  constructor(
    private _importService: ImportsService,private http:Http,
    private fb: FormBuilder,private ref: ChangeDetectorRef)
    {
    this.form = this.fb.group({
      myfile: [null, Validators.compose([Validators.required,])],
    });

      ref.detach();
     setInterval(() => {
       this.ref.detectChanges();
     }, 5000);

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

    dt:any;
    ds:any;
    rows:any[];
    total_success:any;
    total_fails:any;
    success_percentage:any;

    Verifyupload(event){
      let myfile = this.myfile.nativeElement.files[0];
      console.log(myfile);

      let fd=new FormData();
      fd.append("file",myfile);
      console.log(fd);
      this._importService.sendVerifyStudentsData(fd)
      .subscribe((res)=>{
        //let data = JSON.parse(res);
        let re=res as any
        console.log(re);

        this.total_fails = re.total_fails;
        this.total_success = re.total_success;
        this.success_percentage =re.success_percentage;

        this.count = re.errors.length;

        let items =[];
        let rows = [];
        for (let i = 0; i < re.errors.length; i++){
          let errmessage = re.errors[i].error_message.length;
          console.log(re.errors[i].error_message);
          this.dt = {}
          this.dt.rownumber = re.errors[i].row_number
            for(let j = 0; j< errmessage; j++){
              this.ds = {}
              this.ds.firstname = errmessage[j].fstname
              this.ds.lastname = errmessage[j].lstname
              this.ds.gender = errmessage[j].gender
              this.ds.class = errmessage[j].class
              rows.push(this.ds)
            }
          this.dt.errror = rows
          items.push(this.dt)
          console.log(this.dt.error);
        }
        //initial data
        this.errors=items;

      })

    }

  Progressupload(event){

  }

}
