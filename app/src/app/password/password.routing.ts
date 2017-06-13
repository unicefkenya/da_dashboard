import { Routes } from "@angular/router";
//changepassword in reports module
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';


export const PasswordRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'forgot-password',
      component: ForgotpasswordComponent
    }
  ],
  }
]
