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
      var activeInfoWindow;

      var mapStyle = [{
        'stylers': [{'visibility': 'off'}]
      }, {
        'featureType': 'landscape',
        'elementType': 'geometry',
        'stylers': [{'visibility': 'on'}, {'color': '#fcfcfc'}]
      }, {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [{'visibility': 'on'}, {'color': '#bfd4ff'}]
      }];

      var countyMin = Number.MAX_VALUE, countyMax = -Number.MAX_VALUE;


      function initMap() {

        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center:{lat: 0.176869, lng: 37.9083264}
          //center: {lat: -28, lng: 137}
        });

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
            console.log(event.feature.f);
            console.log(JSON.parse(localStorage.getItem('countyDataAPi')), 'PLEASE WORK!!!')
            var kaunty = JSON.parse(localStorage.getItem('countyDataAPi'));
            var countyName;
            var enrolled;
            var total;
            var dropouts;
            if(event.feature.f.COUNTY){
              for(var i = 0; i< kaunty.length;i++){

                var id = kaunty.indexOf(kaunty[i].name);
                var countyName = kaunty[i].name;
                var enrolled = kaunty[i].enrolled;
                var total = kaunty[i].total;
                var dropouts = kaunty[i].dropouts;

                if(countyName == event.feature.f.COUNTY){
                  localStorage.setItem('county_name', countyName);
                  localStorage.setItem('county_enrolls', enrolled);
                  localStorage.setItem('county_total', total);
                  localStorage.setItem('county_dropouts', dropouts);
                }
              }

                var county_name = localStorage.getItem('county_name');
                var county_enrolls = localStorage.getItem('county_enrolls');
                var county_total = localStorage.getItem('county_total');
                var county_dropouts  = localStorage.getItem('county_dropouts');

                //console.log(cts.findIndex(countyName), countyName,enrolled, total, dropouts, 'woooiii');
                if(county_name == event.feature.f.COUNTY){
                  var myCenter = new google.maps.LatLng(0.176869,37.9083264);
                  var marker = new google.maps.Marker({position:myCenter});
                  marker.setMap(this.map);
                  var infoWindow = new google.maps.InfoWindow({
                    content: county_name+'<p><small>Total Registered Children: '+county_total+'</small></p><p><small>Total Newly Enrolled Children: '+county_enrolls+'</small></p><p><small>Dropouts: '+county_dropouts+'</small></p>'
                  });
                  infoWindow.open(this.map, marker);
                }


            }

            this.map.data.revertStyle();
            this.map.data.overrideStyle(event.feature, {strokeWeight: 8, fillColor: 'red'});
            });

          this.map.data.addListener(this.marker,'mouseout', function(event) {
          this.map.data.revertStyle();
          this.infoWindow.close();
          });


        this.map.data.loadGeoJson('assets/data/kenyancounties.json');
        /*
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.attendance.co.ke/api/students/enrolls/county.json');
        xhr.onload = function(){
          var countyData = JSON.parse(xhr.responseText);
          console.log(countyData, countyData.results, 'showing data');
          for (var i=0; i< countyData.results.length; i++){
            var totalChildren = countyData.results[i].total;
            var newlyEnrolled = countyData.results[i].enrolled_males+countyData.results[i].enrolled_females;
            var dropouts = countyData.results[i].dropout_total;
            var name = countyData.results[i].value
          }
        };
        xhr.send();
        */
      }


      /*
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

        */


      google.maps.event.addDomListener(window, "load", initMap);

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
      localStorage.setItem('countyDataAPi', JSON.stringify(this.count));
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
