import { Routes } from "@angular/router";

import { ChildrenComponent } from './children.component';
import { SchoolchildrenComponent } from './Schoolchildren/schoolchildren.component';
import { SchoolenrollmentComponent } from './Schoolenrollment/schoolenrollment.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { AddChildrenComponent } from './addchildren/addchildren.component';
import { ChildComponent } from './individual/child.component';
import {ExportattendanceComponent} from './exportattendance/exportattendance.component';

export const ChildrenRoutes: Routes = [{
  path: '',
  children: [{
    path: 'view-children',
    component: ChildrenComponent
  },{
    path: 'view-children/:id',
    component: SchoolchildrenComponent
  },{
    path: 'add-children',
    component: AddChildrenComponent
  },{
    path: 'enrollments',
    component: EnrollmentComponent
  },{
    path: 'enrollments/:id',
    component: SchoolenrollmentComponent
  }, {
    path: 'child/:id',
    component: ChildComponent
  },{
    path: 'export-attendance/:id',
    component: ExportattendanceComponent
  }
],
}];
