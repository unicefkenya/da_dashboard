import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdToolbarModule, MdTabsModule, MdListModule, MdSlideToggleModule, MdSelectModule } from "@angular/material";
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { TeachersRoutes } from './teachers.routing';
import { TeachersComponent } from './teachers.component';
import { AddTeachersComponent } from './addteachers/addteachers.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(TeachersRoutes), MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdToolbarModule, MdTabsModule, MdListModule, MdSlideToggleModule, MdSelectModule, FlexLayoutModule, FormsModule, NgxDatatableModule],
  declarations: [TeachersComponent, AddTeachersComponent]
})

export class TeachersModule {}
