import { Routes } from "@angular/router";
import { SchoolsReportsComponent } from './schools/schoolsreport.component';
import { TeachersReportComponent } from './teachers/teachersreport.component';
import { ChangepasswordComponent } from '../password/changepassword/changepassword.component';

export const ReportsRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'schools',
      component:SchoolsReportsComponent
    },{
      path: 'change-password',
    component: ChangepasswordComponent
    },
    {
      path: 'teachers',
      component:TeachersReportComponent
    }
  ]
  }
];
