import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { TeachersRoutes } from './teachers.routing';
import { AddTeachersComponent } from './addteachers/addteachers.component';
import { ViewTeachersComponent } from './viewteachers/viewteachers.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(TeachersRoutes), MaterialModule, FlexLayoutModule, FormsModule,ReactiveFormsModule, NgxDatatableModule],
  declarations: [ViewTeachersComponent, AddTeachersComponent],
  exports: [ ViewTeachersComponent ]

})

export class TeachersModule {}
