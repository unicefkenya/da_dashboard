import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full',
}, {
  path: '',
  component: AdminLayoutComponent,
  children: [{
    path: 'home',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }, {
    path: 'children',
    loadChildren: './children/children.module#ChildrenModule'
  }, {
    path: 'schools',
    loadChildren: './schools/schools.module#SchoolsModule'
  }, {
    path: 'teachers',
    loadChildren: './teachers/teachers.module#TeachersModule'
  }, {
    path: 'reports',
    loadChildren: './tables/tables.module#TablesModule'
  }, {
    path: 'system-logs',
    loadChildren: './chartlib/chartlib.module#ChartlibModule'
  }, {
    path: 'activity-logs',
    loadChildren: './maps/maps.module#MapModule'
  }, {
    path: 'help',
    loadChildren: './dragndrop/dragndrop.module#DragndropModule'
  }]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'session',
    loadChildren: './session/session.module#SessionModule'
  }]
}, {
  path: '**',
  redirectTo: 'session/404'
}];
