import { Component, OnInit } from '@angular/core';
import {SocialService} from './social.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
  providers: [SocialService]
})
export class SocialComponent implements OnInit {
  email: any;
  name:any;
  phone:any;
  error:any;
  usertype: any;

  images: any[] = [];
  num: number = 1;

  constructor(
    private _socialService: SocialService
  ) {

    for (this.num; this.num <= 9; this.num += 1) this.images.push(this.num);

  }

  public pieChartColors: any[] = [{ backgroundColor: ["#f44336", "#3f51b5", "#ffeb3b", "#4caf50", "#2196f"] }];
  public pieOptions:any = {
    responsive: true,
    legend: {
      position: 'right'
    }
  };
  public pieChartLabels:string[] = ['MS Word', 'Typing', 'Sage Pastel'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';

  id:number;
  ngOnInit(){
    this.usertype = localStorage.getItem('user-type');

    if(this.usertype == 'partner'){
      this.id = JSON.parse(localStorage.getItem("partnerId"));
      this.fetchUserDetails(this.id);
    }else{
      console.log(this.usertype);
      console.log("Is a school");
    }
  }

  fetchUserDetails(id){
    this._socialService.fetchUserProfile(id)
           .subscribe(
                (res)=>{

                  this.email = res.email;
                  this.name = res.name;
                  this.phone = res.phone;
                },
              (err) => {
                this.error = err;
              },
            );
  }

}
