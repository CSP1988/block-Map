var myInitPosition = [
    {
        title:'罗湖火车站', 
        position:{
            lat: 22.5323547000, 
            lng: 114.1150795700
        }
    },
    {
        title:'深圳东站', 
        position:{
            lat: 22.6021833144, 
            lng: 114.1197942148
        }
    },
    {
        title:'福田火车站', 
        position:{
            lat: 22.5388350360, 
            lng: 114.0568499327
        }
    },
    {
        title:'深圳西站', 
        position:{
            lat: 22.5278158611, 
            lng: 113.9077022527
        }
    },
    {
        title:'深圳北站', 
        position:{
            lat: 22.6095734261, 
            lng: 114.0292537641
        }
    }
];

// var map;
// var markers = [];

// var mapView = {
//   init: function(){
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: {lat: 22.5323547000, lng:114.1150795700},
//         zoom: 14
//     });
//     // var marker = new google.maps.Marker({
//     //     position: {lat: 22.5323547000, lng:114.1150795700},
//     //     map: map
//     // });

//     var infowindow = new google.maps.InfoWindow();
//     var bounds = new google.maps.LatLngBounds();

    // for(var i = 0;i < myInitPosition.length;i++){
    //     var position = myInitPosition[i].position;
    //     var title = myInitPosition[i].title;

    //     var marker = new google.maps.Marker({
    //         map: map,
    //         position: position,
    //         animation: google.maps.Animation.DROP,
    //         title: title
    // });

    //     markers.push(marker);
    //     bounds.extend(marker.position);
    //     marker.addListener('click',function(){
    //         populateInfoWindow(this, infowindow);
    //     });
    // }
    // map.fitBounds(bounds);
    // appViewModel();
  // }
// }

// var appViewModel = function(){
//   var self = this;
//   init: function(){
//     this.positionList = ko.observableArray(myInitPosition);
//   }
  
  

// }

// var mapOctopus = {
  
//   init: function(){

//   },

//   getpositionList: function(){
//     return appViewModel.positionList;
//   }
// }

// function initMap(){
//     mapView.init();
//     // ko.applyBindings(new ViewModel());
// }

var Position = function (data){
    this.title = ko.observable(data.title);
    this.position = ko.observable(data.position);
    // this.positionList = ko.observableArray(myInitPosition);

}

var ViewModel = function(){
    var self = this;
    var map;
    var markers = [];



    this.positionList = ko.observableArray([]);
    console.log('------------------------')
    myInitPosition.forEach(function(itme){
        self.positionList.push( new Position(itme) );
    });

    this.currentPosition = ko.observable(self.positionList()[0]);

    setMapView();

    this.goPosition = function(clickPosition){
      console.dir(clickPosition);
      self.currentPosition(clickPosition);
      setMapView();
    }

    function setMapView(){
        map = new google.maps.Map(document.getElementById('map'), {
            center: self.currentPosition().position(),
            zoom: 14
        });
            var marker = new google.maps.Marker({
            map: map,
            position: self.currentPosition().position(),
            animation: google.maps.Animation.DROP,
            title: self.currentPosition().title()
    });

    }
}



function populateInfoWindow(marker, infowindow){
    if(infowindow.marker != marker){
          infowindow.marker = marker;
          infowindow.setContent('<div>' +
            marker.title + '</div>');
          infowindow.open(map, marker);
          infowindow.addListener('closeclick', function(){
              infowindow.setMarker(null);
          });
    }
}

function initMap(){
  ko.applyBindings(new ViewModel());
}