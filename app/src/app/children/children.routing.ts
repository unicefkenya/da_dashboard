import { Routes } from "@angular/router";

import { ChildrenComponent } from './children.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { AddChildrenComponent } from './addchildren/addchildren.component';
import { ChildComponent } from './individual/child.component';


export const ChildrenRoutes: Routes = [{
  path: '',
  children: [{
    path: 'view-children',
    component: ChildrenComponent
  },{
    path: 'add-children',
    component: AddChildrenComponent
  },{
    path: 'enrollments',
    component: EnrollmentComponent
  }, {
    path: 'child/:id',
    component: ChildComponent
  }
],
}];
