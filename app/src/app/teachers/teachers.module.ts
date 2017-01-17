import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdInputModule } from "@angular/material";

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { TeachersRoutes } from './teachers.routing';
import { TeachersComponent } from './teachers.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(TeachersRoutes), MdInputModule, NgxDatatableModule],
  declarations: [TeachersComponent]
})

export class TeachersModule {}
