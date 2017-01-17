import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdInputModule } from "@angular/material";

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { TeachersRoutes } from './teachers.routing';
import { ViewTeachersComponent } from './viewteachers/viewteachers.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(TeachersRoutes), MdInputModule, NgxDatatableModule],
  declarations: [ViewTeachersComponent]
})

export class TeachersModule {}
