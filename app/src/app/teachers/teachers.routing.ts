import { Routes } from "@angular/router";

import { ViewTeachersComponent } from './viewteachers/viewteachers.component';

export const TeachersRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'view-teachers',
      component: ViewTeachersComponent
    }
  ],
  }
]
