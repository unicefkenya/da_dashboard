import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdInputModule } from "@angular/material";

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ChildrenRoutes } from './children.routing';
import { ChildrenComponent } from './children.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ChildrenRoutes), MdInputModule, NgxDatatableModule],
  declarations: [ChildrenComponent]
})

export class ChildrenModule {}
