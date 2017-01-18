import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
//import { MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdToolbarModule, MdTabsModule, MdListModule, MdSlideToggleModule, MdSelectModule  } from "@angular/material";
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ChildrenRoutes } from './children.routing';
import { ChildrenComponent } from './children.component';
import { AddChildrenComponent } from './addchildren/addchildren.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ChildrenRoutes), MaterialModule, FlexLayoutModule, FormsModule, NgxDatatableModule],
  declarations: [ChildrenComponent, AddChildrenComponent]
})

export class ChildrenModule {}
