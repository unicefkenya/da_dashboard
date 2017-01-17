import { Routes } from "@angular/router";

import { TeachersComponent } from './teachers.component';
import { AddTeachersComponent } from './addteachers/addteachers.component';


export const TeachersRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'view-teachers',
      component: TeachersComponent
    },{
      path: 'add-teachers',
      component: AddTeachersComponent
    }
  ],
  }
]
