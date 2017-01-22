import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdToolbarModule, MdTabsModule, MdListModule, MdSlideToggleModule, MdSelectModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { TeachersRoutes } from './teachers.routing';
import { AddTeachersComponent } from './addteachers/addteachers.component';
import { ViewTeachersComponent } from './viewteachers/viewteachers.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(TeachersRoutes), MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdToolbarModule, MdTabsModule, MdListModule, MdSlideToggleModule, MdSelectModule, FlexLayoutModule, FormsModule,ReactiveFormsModule, NgxDatatableModule],
  declarations: [ViewTeachersComponent, AddTeachersComponent]

})

export class TeachersModule {}
