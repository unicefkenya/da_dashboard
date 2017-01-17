import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdToolbarModule, MdTabsModule, MdListModule, MdSlideToggleModule, MdSelectModule } from "@angular/material";
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SchoolsRoutes } from './schools.routing';
import { SchoolsComponent } from './schools.component';
import { AddSchoolsComponent } from './addschool/addschools.component';


@NgModule({
  imports: [CommonModule, RouterModule.forChild(SchoolsRoutes), MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdToolbarModule, MdTabsModule, MdListModule, MdSlideToggleModule, MdSelectModule, FlexLayoutModule, FormsModule, NgxDatatableModule],
  declarations: [SchoolsComponent, AddSchoolsComponent]
})

export class SchoolsModule {}
