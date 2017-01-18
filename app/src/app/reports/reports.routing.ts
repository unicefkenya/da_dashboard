import { Routes } from "@angular/router";
import { SchoolsReportsComponent } from './schools/schoolsreport.component';

export const ReportsRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'schools',
      component:SchoolsReportsComponent
    }]
  }
];
