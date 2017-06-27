import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { PartnersRoutes } from './partners.routing';
import { AddPartnerComponent } from './addpartner/addpartner.component';
import { ViewpartnersComponent } from './viewpartners/viewpartners.component';


@NgModule({
  imports: [CommonModule, RouterModule.forChild(PartnersRoutes), MaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule,NgxDatatableModule],
  declarations: [ AddPartnerComponent, ViewpartnersComponent]
})

export class PartnersModule {}
