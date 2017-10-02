import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdToolbarModule, MdTabsModule, MdListModule, MdSlideToggleModule, MdSelectModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CountyRoutes } from './county.routing';
import { CountyComponent } from './county.component';


const googleMapsCore = AgmCoreModule.forRoot({apiKey: 'AIzaSyAyMZ31YQXhc2OhbGPIKNPTEDZ3YoGknuU',});

@NgModule({
  imports: [CommonModule, RouterModule.forChild(CountyRoutes), googleMapsCore,MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdToolbarModule, MdTabsModule, MdListModule, MdSlideToggleModule, MdSelectModule, FlexLayoutModule, FormsModule, ReactiveFormsModule,NgxDatatableModule],
  declarations: [ CountyComponent]
})


export class CountyModule {}
