import { NgModule }  from '@angular/core';
import { SocialComponent } from './social.component';
import { SocialRoutes } from './social.routing';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { MdToolbarModule, MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdButtonToggleModule, MdListModule, MdGridListModule, MdMenuModule, MdSidenavModule, MdProgressBarModule, MdTabsModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(SocialRoutes),FlexLayoutModule, ChartsModule, NgxDatatableModule,MdToolbarModule, MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdButtonToggleModule, MdListModule, MdGridListModule, MdMenuModule, MdSidenavModule, MdProgressBarModule, MdTabsModule,MaterialModule],
  declarations: [ SocialComponent ]
})

export class SocialModule { }
