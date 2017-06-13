import { Routes } from "@angular/router";

import { AddPartnerComponent } from './addpartner/addpartner.component';
import { ViewpartnersComponent } from './viewpartners/viewpartners.component';


export const PartnersRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'view-partners',
      component: ViewpartnersComponent
    },{
      path: 'add-partner',
      component: AddPartnerComponent
    }
  ],
  }
]
