import { Routes } from "@angular/router";

import { TeachersComponent } from './teachers.component';
import { AddTeachersComponent } from './addteachers/addteachers.component';
import { ViewTeachersComponent } from './viewteachers/viewteachers.component';

export const TeachersRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'view-teachers',
      component: ViewTeachersComponent
    },{
      path: 'add-teachers',
      component: AddTeachersComponent
    }, {
      path: 'teacher/:id',
      component: TeachersComponent
    }
  ],
  }
]
