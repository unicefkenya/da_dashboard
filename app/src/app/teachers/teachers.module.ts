import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { TeachersRoutes } from './teachers.routing';
import { AddTeachersComponent } from './addteachers/addteachers.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(TeachersRoutes), MaterialModule, FlexLayoutModule, FormsModule,ReactiveFormsModule, NgxDatatableModule],
  declarations: [AddTeachersComponent]

})

export class TeachersModule {}
