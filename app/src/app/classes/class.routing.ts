import { Routes } from "@angular/router";

import { AddClassComponent } from './addclass/addclass.component';
import { ViewClassesComponent } from './viewclasses/viewclasses.component';


export const ClassRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'view-classes',
      component: ViewClassesComponent
    },{
      path: 'add-class',
      component: AddClassComponent
    }
  ],
  }
]
