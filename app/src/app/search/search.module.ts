import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdCardModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MdIconModule, MdButtonModule, MdListModule, MdProgressBarModule, MdMenuModule } from "@angular/material";

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SearchComponent } from './search.component';
import { SearchRoutes } from './search.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(SearchRoutes), ChartsModule, MdCardModule, FlexLayoutModule],
  declarations: [SearchComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class SearchModule {}
