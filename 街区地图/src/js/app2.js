
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
var isClick = false;

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: content.position,
        zoom: 14
    });

    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(centerControlDiv);

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
        self.currentMarker().setAnimation(google.maps.Animation.DROP);
        setZoomCenter(marker);
    }
    

    self.goPosition = function(clickPosition){
      console.dir(clickPosition);
      self.currentPosition(clickPosition);
      setZoomCenter(clickPosition);
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

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("map").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("map").style.marginLeft = "0";
}


function CenterControl(controlDiv, map) {

  var controlText = document.createElement('image');
  controlText.style.color = 'rgb(25,25,25)';
  controlDiv.style.backgroundColor = '#fff';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Menu';
  controlDiv.appendChild(controlText);

    //自定义按钮的点击事件
  controlDiv.addEventListener('click', function() {
    
    if(!isClick){
        openNav();
        isClick = true;
    }else{
        closeNav();
        isClick = false;
    }

   
  });

}