import { Routes } from "@angular/router";

import { ImportsComponent } from './children.component';

export const ImportsRoutes: Routes = [{
  path: '',
  children: [{
    path: 'add-import',
    component: ImportsComponent
  }
],
}];
