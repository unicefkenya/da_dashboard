import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute, NavigationEnd } from '@angular/router';
import { SchoolattendanceService} from './schoolattendance.service';
import { FileUploader,FileSelectDirective, FileDropDirective, } from 'ng2-file-upload/ng2-file-upload';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { CustomValidators } from 'ng2-validation';

import {schoolAttendance} from './schoolattendance';
import {BaseUrl} from '../../../baseurl';

export class exportAttendance {
  constructor(
    public month: any,
    public year: any
  ){}
}


@Component({
  selector: 'app-schoolattendance',
  templateUrl: './schoolattendance.component.html',
  styleUrls: ['./schoolattendance.component.scss'],
  providers: [SchoolattendanceService]

})



export class SchoolattendanceComponent implements OnInit {



  @ViewChild('myfile') myfile;
  public schoolName;
  yearsSelect=[];
  public form: FormGroup;
  public dateform:FormGroup;
  public submitted;
  public studentDataType : schoolAttendance;
  public empty;
  public fail;
  public importfile:any
  public success;
  public importAbort;
  fileError:any;
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

  dt:any;
  ds:any;
  rows:any[];
  total_success:any;
  total_fails:any;
  success_percentage:any;
  errorDiv:boolean;
  uploadDiv:boolean;
  uploadButton:boolean;
  duplicateData: any;
  verifySuccess:any;
  loading: boolean;
  public sub;
  public link;
  public linkStudentDetails;
  id:any;

  constructor(
    private _schoolattendanceService: SchoolattendanceService,private http:Http,
    private fb: FormBuilder,
    private route:ActivatedRoute,private router: Router)
    {
    this.form = this.fb.group({
      myfile: [null, Validators.compose([Validators.required,])],
    });

    this.dateform = this.fb.group({
      month: [null, Validators.compose([Validators.required,])],
      year: [null, Validators.compose([Validators.required,])],
    });

    this.errorDiv = false;
    this.uploadDiv = false;
    this.uploadButton = false;
  }

  ngOnInit(): void {
    this.loading = false;
    this.schoolName = localStorage.getItem('attendanceschoolName');
    this.sub = this.route.params.subscribe(params => {
     this.id = +params['id'];
     //this.fileDownload(this.id);
     //this.fileStudentsDownload(this.id);
   });
    this.years();
  }


  years(){
      let todayYear = (new Date()).getFullYear();
      
      for(let a=2016; a < todayYear+1; a++){
        //this.yr = {}
        //this.yr.year = a;
        this.yearsSelect.push(a);
      }

    }

    fileDownload(id,month,year){

      this._schoolattendanceService.getExportFile(id,month,year).subscribe(
        (data)  =>
        {
          //console.log(data.results[0]);
          //console.log(data);
          this.link = data.link;
          this.loading = false;
        }
      );
    }

    fileStudentsDownload(id,month,year){

      this._schoolattendanceService.getStudentDetailsExportFile(id,month,year).subscribe(
        (data)  =>
        {
          //console.log(data.results[0]);
          //console.log(data);
          this.linkStudentDetails = data.link;
          this.loading = false;
        }
      );
    }

    error;

     onSubmit(exportParameters: exportAttendance){
       this.loading = true;
    //this.partner = new exportAttendance(exportParameters.month,exportParameters.year);

      this.fileStudentsDownload(this.id,exportParameters.month, exportParameters.year);
      this.fileDownload(this.id, exportParameters.month, exportParameters.year);
    
  }


    Importupload(event){
      this.loading = true;
      let myfile = this.myfile.nativeElement.files[0];
      //console.log(myfile);

      let fd=new FormData();
      fd.append("file",myfile);
      //console.log(fd);
      this._schoolattendanceService.sendattendanceSheetsData(fd).subscribe(data=>
      {
        let res=data as any
        this.uploadDiv = true;
        this.errorDiv = false;
        //interchanged the two
        this.total_fails = res.total_fails;
        this.total_success = res.total_success;
        this.success_percentage =res.success_percentage;
        this.verifySuccess = "File Successfully Imported";
        this.loading = false;
        //console.log(res);
        //let message = JSON.parse(data[0].total_fails);
        //console.log("fails", message);

        //this.success = "Data Imported Successfully";
      },error=>{
        //console.log(error)
        this.fail = "Data Not Imported: "+error
      })
    }


    Verifyupload(event){
      this.loading = true;
      let myfile = this.myfile.nativeElement.files[0];
      //console.log(myfile);

      let fd=new FormData();
      fd.append("file",myfile);
      //console.log(fd);
      this._schoolattendanceService.sendVerifyAttendanceSheetsData(fd)
      .subscribe((res)=>{
        //let data = JSON.parse(res);
        let re=res as any
        if(re.errors == 0 && re.total_success == 0 && re.success_percentage == "0%"){
          this.loading = false;
          this.duplicateData = "Data in file already imported";
        }else if(re.errors != 0){
          this.loading = false;
          this.fileError = "Kindly correct errors in file to be able to upload";
          this.uploadDiv = false;
          this.uploadButton = false;
          this.errorDiv = true;

          this.count = re.errors.length;

          let items =[];
          let rows = [];
          for (let i = 0; i < re.errors.length; i++){
            let errmessage = re.errors[i].error_message;
            //console.log(re.errors[i].error_message);
            this.dt = {}
            this.dt.rownumber = re.errors[i].row_number
            this.dt.error=this.errorMessage(re.errors[i].error_message)
            items.push(this.dt)
          }
          //initial data
          this.errors=items;

        }
        else{
          this.uploadButton = true;
          this.loading = false;
          this.verifySuccess = "Successful Verification. File ready for import.";
        }
      })

    }

  errorMessage(error_message){
    if(error_message.fstname && error_message.gender && error_message.clas && error_message.school ){
      return "School emiscode, First Name, Gender & Class fields are blank";
    }
    else if(error_message.fstname && error_message.gender && error_message.clas){
      return "First Name, Gender & Class fields are blank";
    }
    else if(error_message.fstname && error_message.gender && error_message.school ){
      return "School emiscode, First Name & Gender fields are blank";
    }
    else if(error_message.gender && error_message.clas && error_message.school){
      return "School emiscode, Gender & Class fields are blank";
    }
    else if(error_message.gender && error_message.clas && error_message.school){
      return "School emiscode, Gender & Class fields are blank";
    }
    else if(error_message.fstname && error_message.clas && error_message.school){
      return "School emiscode, First Name & Class fields are blank";
    }
    else if(error_message.school && error_message.gender ){
      return "School emiscode & Gender fields are blank";
    }
    else if(error_message.school && error_message.fstname ){
      return "School emiscode & First Name fields are blank";
    }
    else if(error_message.school && error_message.clas ){
      return "School emiscode & Class fields are blank";
    }
    else if(error_message.fstname && error_message.gender ){
      return "First Name & Gender fields are blank";
    }
    else if(error_message.gender && error_message.clas){
      return "Gender & Class fields are blank";
    }
    else if(error_message.fstname && error_message.clas){
      return "First Name & Class fields are blank";
    }
    else if(error_message.school){
      return "The school emiscode is missing";
    }
    else if(error_message.fstname){
      return "First Name: "+error_message.fstname[0]
    }
    else if(error_message.gender){
      return "Gender: "+error_message.gender[0]
    }
    else if(error_message.clas){
      return "Class: "+error_message.clas[0]
    }

  }

  Progressupload(event){

  }

}
