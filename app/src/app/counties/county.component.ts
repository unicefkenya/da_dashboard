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

selections =[{select:'Total Children'},{select: 'Newly Enrolled'},{select: 'Dropouts'}];
  //http://technobytz.com/mapping-angular-google-maps-api-geojson.html

  constructor(private countyService: CountyService){}

  ngOnInit(){}
  private map:any;
  countyName:any;
  kaunti:any;
  ngAfterViewInit(){
      this.getCountiesData();

      this.getMapData((data) => {
        console.log(data, 'kenyancountiesjson')
        let properties = data.features
        let kaunt = []
        for (let i=0;i<properties.length; i++){
          this.kaunti ={}
          this.kaunti.countyName = properties[i].properties.COUNTY;
          kaunt.push(this.kaunti);
        }
      });

      var censusMin = Number.MAX_VALUE, censusMax = -Number.MAX_VALUE;


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

        this.map.data.setStyle(function(feature) {
         var color = '#521DB7';

         return  ({
            fillColor: color,
            strokeColor: color,
            strokeWeight: 2
          });
       });

        this.map.data.addListener('mouseover', function(event) {
        this.map.data.revertStyle();
        this.map.data.overrideStyle(event.feature, {strokeWeight: 8});
        });

        this.map.data.addListener('mouseout', function(event) {
        this.map.data.revertStyle();
        });

        var selectBox = document.getElementById('census-variable');
        google.maps.event.addDomListener(selectBox, 'change', function() {
          clearCensusData();
        //  loadCensusData(selectBox.options[selectBox.selectedIndex].value);
        });

      }
      google.maps.event.addDomListener(window, "load", initMap);

      /** Removes census data from each shape on the map and resets the UI. */
      function clearCensusData() {
        censusMin = Number.MAX_VALUE;
        censusMax = -Number.MAX_VALUE;
        this.map.data.forEach(function(row) {
          row.setProperty('census_variable', undefined);
        });
        document.getElementById('data-box').style.display = 'none';
        document.getElementById('data-caret').style.display = 'none';
      }


  }

ct:any;
count =[];
  getCountiesData(){
    this.countyService.getCountiesData().subscribe(data=>{
      console.log(data, 'ooscapi');
      data = data.results;
      for(let a=0; a<data.length; a++){
        this.ct = {}
        this.ct.name = data[a].value;
        this.ct.enrolled = data[a].enrolled_females + data[a].enrolled_males;
        this.ct.total = data[a].old_females + data[a].old_males;
        this.ct.dropouts = data[a].dropout_total;
        this.count.push(this.ct);
      }
    }),error =>{
      console.log(error, 'aiyyayay');
    }
  }
kaunt = []
  getData(){
    this.getMapData((data) => {
      console.log(data, 'kenyancountiesjson')
      let properties = data.features

      for (let i=0;i<properties.length; i++){
        this.kaunti ={}
        this.kaunti.countyName = properties[i].properties.COUNTY;
        this.kaunt.push(this.kaunti);
      }
      return this.kaunt;
    });
  }
  getMapData(data){
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/kenyancounties.json`);
    req.onload = () => {
      data(JSON.parse(req.response));
    };
    req.send();
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
