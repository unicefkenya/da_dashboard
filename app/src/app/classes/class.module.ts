import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdToolbarModule, MdTabsModule, MdListModule, MdSlideToggleModule, MdSelectModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {CapitalizePipe} from "../pipes/capitalize.pipe";

import { ClassesRoutes } from './class.routing';
import { AddClassComponent } from './addclass/addclass.component';
import { ViewClassesComponent } from './viewclasses/viewclasses.component';


@NgModule({
  imports: [CommonModule, RouterModule.forChild(ClassesRoutes), MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdToolbarModule, MdTabsModule, MdListModule, MdSlideToggleModule, MdSelectModule, FlexLayoutModule, FormsModule, ReactiveFormsModule,NgxDatatableModule],
  declarations: [ AddClassComponent, ViewClassesComponent,CapitalizePipe]
})

export class ClassModule {}
