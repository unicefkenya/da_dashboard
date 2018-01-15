import { Routes } from "@angular/router";

import { SocialComponent } from './social.component';
import { AuthGuard } from '../authguard/auth.guard';

export const SocialRoutes: Routes = [
	{
	    path: '',
	    component: SocialComponent,
  		canActivate: [AuthGuard]
	}
];
