import { Routes } from "@angular/router";
import { AuthGuard } from '../authguard/auth.guard';

import { AddPartnerComponent } from './addpartner/addpartner.component';
import { ViewpartnersComponent } from './viewpartners/viewpartners.component';
import { PartnersComponent } from './partners.component';


export const PartnersRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'view-partners',
      component: ViewpartnersComponent
    },{
      path: 'add-partner',
      component: AddPartnerComponent
    }, {
      path: 'partner/:id',
      component: PartnersComponent,
      canActivate: [AuthGuard]
    }
  ],
  }
]
