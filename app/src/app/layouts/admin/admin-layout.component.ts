import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { Subscription } from "rxjs";
import { SigninService} from '../../signin/signin.service';
import { Search } from './search';
import {AdminLayoutService} from './adminlayout.service';



import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html',
  providers: [SigninService, AdminLayoutService]
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  private _router:Subscription;
  public currentUser;
  public search: Search;
  public form: FormGroup;
  public errorSearch;


  today: number = Date.now();
  url: string;
  showSettings:boolean = false;

  @ViewChild('sidemenu') sidemenu;

  constructor(
        public menuItems: MenuItems,
        private router: Router,
        private translate: TranslateService,
        private _adminLayoutService: AdminLayoutService,
        private _signin: SigninService,
        private fb: FormBuilder ) {
    let browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    //gets the cuurrently saved user
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.url = event.url;
      if (this.isOver()) this.sidemenu.close();
    });
    this.form = this.fb.group({
      searchText: [null]
    });
    //this.performSearch();

    console.log(this.currentUser);

  }


  ngOnDestroy() {
    this._router.unsubscribe();
    this.logout();
  }

  isOver(): boolean {
    if(this.url === '/apps/messages' || this.url === '/apps/calendar' || this.url === '/apps/media') {
      return true;
    } else {
      return window.matchMedia(`(max-width: 960px)`).matches;
    }
  }


  logout(){
    this._signin.logout();
  }

  private getSchoolId(id){

    this.router.navigate(['/search', id]);
    this.form.reset();

  }

  public performSearch(search: Search, form){

    this.search = new Search(search.searchText);
    this.errorSearch = '';
    this._adminLayoutService.sendSearch({search:search.searchText,"details":{
      emis_code:search.searchText
    }}).subscribe(
      (data)  =>
      {
        localStorage.setItem('schoolId', data.id);
        this.getSchoolId(data.emis_code);

      },
      error =>{
        this.errorSearch = 'Emis Code not found';
      }
    );
  }
}
