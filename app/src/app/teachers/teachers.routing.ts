import { Routes } from "@angular/router";

import { TeachersComponent } from './teachers.component';

export const TeachersRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'view-teachers',
      component: TeachersComponent
    }
  ],
  }
]
