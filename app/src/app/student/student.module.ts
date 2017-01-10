import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdToolbarModule, MdTabsModule, MdListModule, MdSlideToggleModule, MdSelectModule } from "@angular/material";
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StudentComponent } from './student.component';
import { StudentRoutes } from './student.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(StudentRoutes), MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdToolbarModule, MdTabsModule, MdListModule, MdSlideToggleModule, MdSelectModule, FlexLayoutModule, FormsModule, NgxDatatableModule],
  declarations: [StudentComponent]
})

export class StudentModule {}
