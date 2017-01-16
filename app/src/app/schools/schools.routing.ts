import { Routes } from "@angular/router";

import { SchoolsComponent } from './schools.component';

export const SchoolsRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'view-schools',
      component: SchoolsComponent
    }
  ],
  }
]
