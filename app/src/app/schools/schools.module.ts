import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from '@angular/material';

import {CapitalizePipe} from "../pipes/capitalize.pipe";

import { SchoolsRoutes } from './schools.routing';
import { AddSchoolsComponent } from './addschool/addschools.component';
import { ViewSchoolsComponent } from './viewschools/viewschools.component';


@NgModule({
  imports: [MaterialModule, CommonModule, RouterModule.forChild(SchoolsRoutes), MaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule,NgxDatatableModule],
  declarations: [ AddSchoolsComponent, ViewSchoolsComponent,CapitalizePipe]
})

export class SchoolsModule {}
