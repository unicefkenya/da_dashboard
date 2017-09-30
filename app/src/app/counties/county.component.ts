import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CountyService} from './county.service';

export class Marker {
  constructor(
    public lat:any,
    public lng:any,
    public draggable:any) { }
}


@Component({
  selector: 'app-county',
  templateUrl: './county.component.html',
  styleUrls: ['./county.component.scss'],
  providers: [CountyService]

})
export class CountyComponent implements OnInit {

lat: number = 0.1768696;
lng: number = 37.9083264;
zoom: number = 11;
draggable: boolean = true;

  ngOnInit(){}

    markers: Marker[]=[{
      lat: -32.9477132,
      lng: -60.630465800000025,
      draggable: false
    },{
      lat: -32.9477132,
      lng: -60.630465800000025,
      draggable: false
    }
  ];
}
