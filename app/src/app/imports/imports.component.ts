import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ImportsService} from './imports.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {importSchool} from './importSchool';
import {importStudent} from './importStudent';



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
  public schoolDataType : importSchool;
  public studentDataType : importStudent;
  public empty;
  public fail;
  public success;

  constructor(
    private _importService: ImportsService,
    private fb: FormBuilder)
    {
    this.form = this.fb.group({
      dataType: [null, Validators.compose([Validators.required,])]
    });
  }

  ngOnInit(): void {

  }

  public uploader:FileUploader = new FileUploader({url: 'https://evening-anchorage-3159.herokuapp.com/api/'});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  //uploading School Data
  onSubmitSchool(registerSchool: importSchool){
    if(!this.submitted){

      //edit
    }else{
      this.schoolDataType = new importSchool(registerSchool.dataType);

      this._importService.sendSchoolsData({
                  dataType: registerSchool.dataType,
          })
          .subscribe(
            data => //console.log(data)
            {
              console.log("Added Imports Successfully"),
              this.success = "Added Imports Successfully";
              //this.form.reset();
            },
            error =>{
              this.empty = "This field is required";
              this.fail = "Failed to save data";
            }
          );
          console.log("Added Imports Successfully");
          this.success = "Added Imports Successfully";

        }
  }

  //uploading Student Data
  onSubmitStudent(registerStudent: importStudent){
    if(!this.submitted){

      //edit
    }else{
      this.studentDataType = new importStudent(registerStudent.dataType);

      this._importService.sendStudentsData({
                  dataType: registerStudent.dataType,
          })
          .subscribe(
            data => //console.log(data)
            {
              console.log("Added Student Imports Successfully"),
              this.success = "Added Student Imports Successfully";
              //this.form.reset();
            },
            error =>{
              this.empty = "This field is required";
              this.fail = "Failed to save data";
            }
          );
          console.log("Added Student Imports Successfully");
          this.success = "Added Student Imports Successfully";

        }
  }
}
