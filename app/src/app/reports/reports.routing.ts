import { Routes } from "@angular/router";
import { SchoolsReportsComponent } from './schools/schoolsreport.component';
import { TeachersReportComponent } from './teachers/teachersreport.component';

export const ReportsRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'schools',
      component:SchoolsReportsComponent
    },
    {
      path: 'teachers',
      component:TeachersReportComponent
    }
  ]
  }
];
