import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdInputModule } from "@angular/material";

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ReportsRoutes } from './reports.routing';
import { ViewSchoolsComponent } from '../schools/viewschools/viewschools.component';
import { SchoolsReportsComponent } from './schools/schoolsreport.component';
import { TeachersReportComponent } from './teachers/teachersreport.component';


@NgModule({
  imports: [CommonModule, RouterModule.forChild(ReportsRoutes), MdInputModule, NgxDatatableModule],
  declarations: [ SchoolsReportsComponent, ViewSchoolsComponent, TeachersReportComponent ]
})

export class ReportsModule {}
