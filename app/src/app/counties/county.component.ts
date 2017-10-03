import { Component, OnInit, AfterViewInit } from '@angular/core';
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
export class CountyComponent implements OnInit, AfterViewInit {

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

counties = [
  {name: 'nairobi',lat:1.2921,lng:36.8219,},
  {name: 'kisumu',lat:0.0917,lng:34.7680,}
]

geoJsonObject: Object = [
  {lat:1.2921,lng:36.8219,},
  {lat:0.0917,lng:34.7680,}
];
  //http://technobytz.com/mapping-angular-google-maps-api-geojson.html

  constructor(private countyService: CountyService){}

  ngOnInit(){
    this.getCountiesData();
  }
  private map:any;

  ngAfterViewInit(){

      function initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center:{lat: 0.176869, lng: 37.9083264},
          //center: {lat: -28, lng: 137}
        });

        this.map.data.loadGeoJson('assets/data/kenyancounties.json');
        this.map.data.setStyle({
          //icon: '//example.com/path/to/image.png',
          fillColor: '#521DB7',
          strokeColor: '#521DB7',
          strokeWeight: 2
        });
        this.map.data.addListener('mouseover', function(event) {
        this.map.data.revertStyle();
        this.map.data.overrideStyle(event.feature, {strokeWeight: 8});
        });

        this.map.data.addListener('mouseout', function(event) {
        this.map.data.revertStyle();
        });
      }
      google.maps.event.addDomListener(window, "load", initMap);
  }

ct:any;
  getCountiesData(){
    this.countyService.getCountiesData().subscribe(data=>{
      data = data.results;
      let counties = []
      for(let a=0; a<data.length; a++){
        this.ct = {}
        this.ct.name = data[a].value;
        this.ct.enrolled = data[a].enrolled_females + data[a].enrolled_males;
        this.ct.total = data[a].old_females + data[a].old_males;
        this.ct.dropouts = data[a].dropout_total;
        counties.push(this.ct);
      }console.log(counties, 'hizi county');

    }),error =>{
      console.log(error, 'aiyyayay');
    }
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
