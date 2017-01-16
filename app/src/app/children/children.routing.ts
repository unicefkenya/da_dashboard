import { Routes } from "@angular/router";

import { ChildrenComponent } from './children.component';

export const ChildrenRoutes: Routes = [{
  path: '',
  children: [{
    path: 'view-children',
    component: ChildrenComponent
  }
],
}];
