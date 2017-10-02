import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CountyService} from './county.service';
declare var google;

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
zoom: number = 6;
draggable: boolean = true;

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

geoJsonObject: Object;
  //http://technobytz.com/mapping-angular-google-maps-api-geojson.html
  ngOnInit(){}

  getGeoJSON():void{

  }

  styleFunc(feature){
    var level =  feature.getProperty('level');
    var color = 'green';
    //only show level one features
    var visibility =level==1?true:false;
    return{
      //set fill color for polygon features
      fillColor:color,
      //stroke color for polygons
      strokeColor:color,
      strokeWeight:1,
      //make layer 1 features visible
      visible: visibility
    };
  }

}
