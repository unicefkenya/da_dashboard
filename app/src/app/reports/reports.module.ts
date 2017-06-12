import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdInputModule } from "@angular/material";

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ReportsRoutes } from './reports.routing';
import { ReportsComponent } from './reports.component';
import { ViewSchoolsComponent } from '../schools/viewschools/viewschools.component';

import { SchoolsReportsComponent } from './schools/schoolsreport.component';
import { TeachersModule } from '../teachers/teachers.module';
import { TeachersReportComponent } from './teachers/teachersreport.component';
import { ChangepasswordComponent } from '../password/changepassword/changepassword.component';



@NgModule({
  imports: [CommonModule, RouterModule.forChild(ReportsRoutes), MdInputModule, NgxDatatableModule, TeachersModule],
  declarations: [ SchoolsReportsComponent, ChangepasswordComponent,TeachersReportComponent, ReportsComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ReportsModule {}
