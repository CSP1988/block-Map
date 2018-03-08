
var Position = function (data){
    this.title = ko.observable(data.title);
    this.position = ko.observable(data.position);
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

    //  天假自定义控件按钮
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);
    //自定义控件位置
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
            marker.setAnimation(4);
            openInfoWindow(marker);
        });
        markers.push(marker);
        bounds.extend(marker.position);
    })
    map.fitBounds(bounds);
    ko.applyBindings(new ViewModel(markers));
}

/*
*搜索天气
*显示标签信息
*/
function openInfoWindow(marker){
    const APP_id = '58413';
    const api_key = 'c07ba0154a27401f86a60a50728efec2';

    var baseUrl = `https://route.showapi.com/9-5?`
    var queryParams = `from=5&lat=${marker.position.lat()}&lng=${marker.position.lng()}&needIndex=0&needMoreDay=0&`
    var userInfo = `showapi_appid=${APP_id}&showapi_test_draft=false&showapi_sign=${api_key}`;
    var url = baseUrl + queryParams + userInfo;


    //发起请求获取天气情况
    $.ajax({
        url: url
    }).done(function(data, textStatus, jqXhr){
        console.log(data);
        var weatherData = JSON.parse(data);
        console.dir(`weatherData = ${weatherData}`);
        var weatherNow = weatherData.showapi_res_body.now;

        let msg = "";
        msg += `<image src="${weatherNow.weather_pic}"></image>`;
        msg += `<div>地址：${marker.title}</div>`;
        msg += `<div>经度：${marker.position.lat()}</div>`;
        msg += `<div>纬度：${marker.position.lng()}</div>`;
        
        if(weatherData.showapi_res_code == 0){
            msg += `<div>天气：</div>`;
            msg += `<div>${weatherNow.weather}，气温${weatherNow.temperature}度，
                ${weatherNow.wind_direction}${weatherNow.wind_power}</div>`
        }else{
            msg += `网络异常，稍后再试！`;
        }

        infowindow.setContent(msg);
        infowindow.open(map,marker);
        infowindow.addListener('closeclick', function(){
            infowindow.setMarker = null;
        });

    }).fail(function(jqXhr, textStatus, errorThrown){
        console.log("jqXhr:" + jqXhr +", textStatus:" + textStatus + ", errorThrown:" +errorThrown);
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
                var p = (title.indexOf(file) > -1);
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

    self.goPosition = function(marker){
        self.currentPosition(marker);
        self.currentPosition().setAnimation(google.maps.Animation.DROP);
        
        menuSwitch();
        setZoomCenter(marker);

    }
}

var mapErrorHandler = function(msg,url,l){
    let text = "";
    text = `网络连接错误\n错误信息：${msg}\n URL:${url}`
    alert(text);

}

/* 设置左边Search窗口为250px
*  页面左边距250px
*/
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("map").style.marginLeft = "250px";
}

/* 设置左边Search窗口为0
*  页面左边距0
*/
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("map").style.marginLeft = "0";
}

//自定义控件属性
function CenterControl(controlDiv, map) {

    var controlText = document.createElement('image');
    controlText.style.color = 'rgb(25,25,25)';
    controlDiv.style.backgroundColor = '#fff';
    controlText.style.fontWeight = '900';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Search';
    controlDiv.appendChild(controlText);

        //自定义按钮的点击事件
    controlDiv.addEventListener('click', function() {
        menuSwitch();
    });
}

//switch开关
function menuSwitch(){
    if(!isClick){
        openNav();
        isClick = true;
    }else{
        closeNav();
        isClick = false;
    }
}
