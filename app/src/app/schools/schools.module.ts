import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdInputModule } from "@angular/material";

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SchoolsRoutes } from './schools.routing';
import { SchoolsComponent } from './schools.component';
import { AddSchoolsComponent } from 'addschools.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(SchoolsRoutes), MdInputModule, NgxDatatableModule],
  declarations: [SchoolsComponent, AddSchoolsComponent]
})

export class SchoolsModule {}
