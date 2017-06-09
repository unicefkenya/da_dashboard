import { Routes } from "@angular/router";

import { AddPartnerComponent } from './addpartner/addpartner.component';
import { ViewPartnersComponent } from './viewpartners/viewpartners.component';


export const PartnersRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'view-partners',
      component: ViewPartnersComponent
    },{
      path: 'add-partner',
      component: AddPartnerComponent
    }
  ],
  }
]
