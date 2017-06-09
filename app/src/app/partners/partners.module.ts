import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdToolbarModule, MdTabsModule, MdListModule, MdSlideToggleModule, MdSelectModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {CapitalizePipe} from "../pipes/capitalize.pipe";

import { PartnersRoutes } from './partners.routing';
import { AddPartnerComponent } from './addpartner/addpartner.component';
import { ViewPartnersComponent } from './viewpartners/viewpartners.component';


@NgModule({
  imports: [CommonModule, RouterModule.forChild(SchoolsRoutes), MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdToolbarModule, MdTabsModule, MdListModule, MdSlideToggleModule, MdSelectModule, FlexLayoutModule, FormsModule, ReactiveFormsModule,NgxDatatableModule],
  declarations: [ AddPartnerComponent, ViewPartnersComponent,CapitalizePipe]
})

export class PartnersModule {}
