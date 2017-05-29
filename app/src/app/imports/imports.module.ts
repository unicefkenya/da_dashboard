import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { MdToolbarModule, MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdButtonToggleModule, MdListModule, MdGridListModule, MdMenuModule, MdSidenavModule, MdProgressBarModule, MdTabsModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ImportsRoutes } from './imports.routing';
import { ImportsComponent } from './imports.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ImportsRoutes),ChartsModule, MdToolbarModule, MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdButtonToggleModule, MdListModule, MdGridListModule, MdMenuModule, MdSidenavModule, MdProgressBarModule, MdTabsModule,MaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule,NgxDatatableModule],
  declarations: [ImportsComponent]
})

export class ChildrenModule {}
