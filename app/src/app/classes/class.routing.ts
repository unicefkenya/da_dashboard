import { Routes } from "@angular/router";

import { AddclassComponent } from './addclass/addclass.component';
import { ViewclassesComponent } from './viewclasses/viewclasses.component';


export const ClassesRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'view-classes',
      component: ViewclassesComponent
    },{
      path: 'add-class',
      component: AddclassComponent
    }
  ],
  }
]
