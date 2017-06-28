import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class Adminaccess implements CanActivate {

    constructor(private router: Router) { }

        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
          if(localStorage.getItem('user') && localStorage.getItem('usertype') == 'admin'){
            return true;
          }
          else{
            console.log('Cannot access page');
            return false;
          }
        }

}
