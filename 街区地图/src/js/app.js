
var Position = function (data){
    this.title = ko.observable(data.title);
    this.position = ko.observable(data.position);
    // this.positionList = ko.observableArray(myInitPosition);

}

var map;
var markers = [];
var infowindow = null;
var bounds = null;
var centerControlDiv = null;

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: content.position,
        zoom: 14
    });

    //自定义控件input
    centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);
    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv);

    bounds = new google.maps.LatLngBounds();
    infowindow = new google.maps.InfoWindow();

    myInitPosition.forEach(function(itme){
        var marker = new google.maps.Marker({
            map: map,
            position: itme.position,
            animation: google.maps.Animation.DROP,
            title: itme.title
        });
        marker.addListener('click',function(){
          openInfoWindow(marker);
        });
        markers.push(marker);
        bounds.extend(marker.position);
    })
    map.fitBounds(bounds);
    ko.applyBindings(new ViewModel(markers));
}

function CenterControl(controlDiv, map) {
    
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    // controlUI.style.backgroundColor = '#fff';
    // controlUI.style.border = '2px solid #fff';
    // controlUI.style.borderRadius = '3px';
    // controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    // controlUI.style.cursor = 'pointer';
    // controlUI.style.marginBottom = '22px';
    // controlUI.style.textAlign = 'center';
    // controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('input');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '30px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Center Map';
    // controlText.setAttribute('data-bind','textInput: inputText');
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    // controlUI.addEventListener('click', function(data) {
    //   // map.setCenter(chicago);

    // });

}


//显示标签信息
function openInfoWindow(marker){
    let msg = "";
    msg += `<div>地址：${marker.title}</div>`;
    msg += `<div>经度：${marker.position.lat()}</div>`;
    msg += `<div>纬度：${marker.position.lng()}</div>`

    infowindow.setContent(msg);
    infowindow.open(map,marker);
    infowindow.addListener('closeclick', function(){
        infowindow.setMarker = null;
    });

    
}

function setZoomCenter(marker){
    map.setCenter(marker.position);
    map.setZoom(14);
}

function zoomOut2InitStatus(){
    map.setCenter(content.position);
    map.setZoom(14);
}

var ViewModel = function(markers){
    var self = this;

    //绑定输入框
    self.inputText = ko.observable("");
    //绑定列表数组
    self.markers = ko.observableArray(markers);
    //绑定地图中心点
    self.currentPosition = ko.observable(null);

    //检索输入框
    self.markersSearch = ko.computed(function(){
        const file = self.inputText();
        
        if(!file){
            self.currentPosition(null);
            zoomOut2InitStatus();

            this.markers().forEach(function(marker){
                marker.setVisible(true);
          });
            return this.markers();
        }else{
            return ko.utils.arrayFilter(this.markers(),function(marker){
                var title = marker.title;
                var p = (title.indexOf(title) > -1);
                if(p){
                    marker.setVisible(true);
                }else{
                    marker.setVisible(false);
                }
                return p;
            });
        }

    },self);

    self.dispose = function (){
        self.markersSearch.dispose();
    };
    
    function alertMarker(marker){
        self.currentPosition(marker);

        setZoomCenter(marker);
    }
    

    self.goPosition = function(clickPosition){
      console.dir(clickPosition);
      self.currentPosition(clickPosition);
      // setMapView();
    }
}

var mapErrorHandler = function(msg,url,l){
  console.log('==================');
  console.log(msg);
  console.log(url);
  console.log(l);
  let text = "";
  text = `网络连接错误\n错误信息：${msg}\n URL:${url}`
  alert(text);
  
}


