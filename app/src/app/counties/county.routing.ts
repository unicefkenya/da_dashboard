import { Routes } from "@angular/router";
import { CountyComponent } from './county.component';


export const CountyRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'county-new-enrollments',
      component: CountyComponent
    },{
      path: 'county-dropouts',
      component: CountyComponent
    }
  ],
  }
]
