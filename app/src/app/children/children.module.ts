import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ChildrenRoutes } from './children.routing';
import { ChildrenComponent } from './children.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { ChildComponent } from './individual/child.component';
import { AddChildrenComponent } from './addchildren/addchildren.component';
import { SchoolchildrenComponent } from './Schoolchildren/schoolchildren.component';
import { SchoolenrollmentComponent } from './Schoolenrollment/schoolenrollment.component';


@NgModule({
  imports: [CommonModule, RouterModule.forChild(ChildrenRoutes),ChartsModule, MaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule,NgxDatatableModule],
  declarations: [ChildrenComponent, AddChildrenComponent, SchoolenrollmentComponent, EnrollmentComponent, ChildComponent,SchoolchildrenComponent]
})

export class ChildrenModule {}
