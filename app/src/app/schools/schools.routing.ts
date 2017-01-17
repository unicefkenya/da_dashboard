import { Routes } from "@angular/router";

import { SchoolsComponent } from './schools.component';
import { AddSchoolsComponent } from './addschool/addschools.component';

export const SchoolsRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'view-schools',
      component: SchoolsComponent
    },{
      path: 'add-schools',
      component: AddSchoolsComponent
    }
  ],
  }
]
