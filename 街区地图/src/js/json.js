const myInitPosition = [
    {
        title:'布吉木棉湾新区',
        position:{
          lat: 22.6078382425,
          lng: 114.1336685829
        }
    },
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

var content = myInitPosition[0];
var content1 = myInitPosition[3];


var json = {
      "showapi_res_error":"",
      "showapi_res_code":0,
      "showapi_res_body":{
          "ret_code":0,
          "time":"20180307113000",
          "now":{
              "aqiDetail":{
                  "num":"150",
                  "co":"0.48",
                  "so2":"5",
                  "area":"深圳",
                  "o3":"102",
                  "no2":"12",
                  "aqi":"43",
                  "quality":"优质",
                  "pm10":"30",
                  "pm2_5":"14",
                  "o3_8h":"84",
                  "primary_pollutant":""
              },
              "weather_code":"01",  //01白天 02晚上
              "temperature_time":"16:00", // 获得气温的时间
              "wind_direction":"西北风", //风向
              "wind_power":"1级",        //风力
              "sd":"61%",          //空气湿度
              "aqi":"43",       //空气指数，越小越好
              "weather":"多云",       // 天气
              "weather_pic":"http://app1.showapi.com/weather/icon/day/01.png",
              "temperature":"23"       //气温
          },
          "cityInfo":{
              "c6":"guangdong",
              "c5":"深圳",
              "c4":"shenzhen",
              "c3":"深圳",
              "c9":"中国",
              "c8":"china",
              "c7":"广东",
              "c17":"+8",
              "c16":"AZ9755",
              "c1":"101280601",
              "c2":"shenzhen",
              "c11":"0755",
              "longitude":114.109,
              "c10":"2",
              "latitude":22.544,
              "c12":"518001",
              "c15":"40"
          },
          "f1":{
              "night_weather_code":"03",
              "day_weather":"多云",
              "night_weather":"阵雨",
              "air_press":"1018 hPa",
              "jiangshui":"18%",
              "night_wind_power":"0-3级 <5.4m/s",
              "day_wind_power":"0-3级 <5.4ms",
              "day_weather_code":"01",
              "sun_begin_end":"06:40|18:29",
              "ziwaixian":"弱",
              "day_weather_pic":"http://app1.showapi.com/weather/icon/day/01.png",
              "night_air_temperature":"13",
              "weekday":3,
              "day_air_temperature":"24",
              "day_wind_direction":"无持继风向风",
              "night_weather_pic":"http://app1.showapi.com/weather/icon/night/03.png",
              "day":"20180307",
              "night_wind_direction":"无持继风向风"
          },
          "f3":{
              "night_weather_code":"01",
              "day_weather":"多云",
              "night_weather":"多云",
              "air_press":"1018 hPa",
              "jiangshui":"4%",
              "night_wind_power":"3-4级 5.5~7.9m/s",
              "day_wind_power":"3-4级 5.5~7.9m/s",
              "day_weather_code":"01",
              "sun_begin_end":"06:39|18:30",
              "ziwaixian":"弱",
              "day_weather_pic":"http://app1.showapi.com/weather/icon/day/01.png",
              "night_air_temperature":"11",
              "weekday":5,
              "day_air_temperature":"18",
              "day_wind_direction":"东北风",
              "night_weather_pic":"http://app1.showapi.com/weather/icon/night/01.png",
              "day":"20180309",
              "night_wind_direction":"东北风"
          },
          "f2":{
              "night_weather_code":"04",
              "day_weather":"雷阵雨",
              "night_weather":"雷阵雨",
              "air_press":"1018 hPa",
              "jiangshui":"88%",
              "night_wind_power":"3-4级 5.5~7.9m/s",
              "day_wind_power":"3-4级 5.5~7.9m/s",
              "day_weather_code":"04",
              "sun_begin_end":"06:40|18:30",
              "ziwaixian":"弱",
              "day_weather_pic":"http://app1.showapi.com/weather/icon/day/04.png",
              "night_air_temperature":"13",
              "weekday":4,
              "day_air_temperature":"18",
              "day_wind_direction":"东北风",
              "night_weather_pic":"http://app1.showapi.com/weather/icon/night/04.png",
              "day":"20180308",
              "night_wind_direction":"东北风"
          }
      }
    }