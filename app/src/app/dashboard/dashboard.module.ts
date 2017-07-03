import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AuthGuard } from '../authguard/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';


@NgModule({
  imports: [CommonModule, RouterModule.forChild(DashboardRoutes), MaterialModule, ChartsModule, NgxDatatableModule, FlexLayoutModule],
  declarations: [DashboardComponent],
  providers: [AuthGuard]
})

export class DashboardModule {}
