import { Routes } from "@angular/router";

import { ViewSchoolsComponent } from './viewschools/viewschools.component';
import { AddSchoolsComponent } from './addschool/addschools.component';


export const SchoolsRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'view-schools',
      component: ViewSchoolsComponent
    },{
      path: 'add-schools',
      component: AddSchoolsComponent
    }
  ],
  }
]
