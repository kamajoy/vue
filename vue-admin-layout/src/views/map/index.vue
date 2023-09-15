<template>
  <div class="map-container">
    <div id="map" class="map" />
    <!-- 按钮 -->
    <div class="button-container">
      <span>{{ zoom }} 级</span>
      <span @click="toggleSatellite" :class="isSatellite ? 'active' : ''">卫星</span>
      <span @click="toggleTraffic" :class="isTraffic ? 'active' : ''">路况</span>
      <span @click="toggleWeather" :class="isWeather ? 'active' : ''">天气</span>
    </div>
    <!-- 天气 -->
    <div class="weather" v-show="showWeather">
      <div>
        <h3 class="title">实时天气</h3>
        <div class="text">
          <p>城市： {{ liveWeather.city }}</p>
          <p>天气： {{ liveWeather.weather }}</p>
          <p>温度： {{ liveWeather.temperature }}</p>
          <p>风向： {{ liveWeather.windDirection }}</p>
          <p>风力： {{ liveWeather.windPower }}</p>
          <p>空气湿度： {{ liveWeather.humidity }}</p>
          <p>发布时间： {{ liveWeather.reportTime }}</p>
        </div>
      </div>
      <div>
        <h3 class="title">天气预报</h3>
        <div class="text">
          <p v-for="item in forecastWeather" :key="item.week">
            <span class>{{ item.date }} {{ item.dayWeather }}</span>
            {{ item.nightTemp }}~{{ item.dayTemp }}℃
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const map = ref(null)
const zoom = ref(12)
const city = ref('')
const isSatellite = ref(false)
const satelliteLayer = ref(null)
const isTraffic = ref(false)
const trafficLayer = ref(null)
const isWeather = ref(false)
const showWeather = ref(false)
const liveWeather = ref({})
const forecastWeather = ref([])

// 初始化地图
const initMap = () => {
  map.value = new AMap.Map('map', {
    zoom: zoom.value // 地图显示的缩放级别
  })
  cityLocation()
  showToolBar()
  showScale()
  showOverView()
  showControlBar()
  zoomChange()
  // browserGeolocation()
  showDistrict()
}

// 显示地图级别
const zoomChange = () => {
  map.value.on('zoomchange', () => {
    // 默认是 12
    zoom.value = parseInt(map.value.getZoom())
  })
}

// 卫星
const toggleSatellite = () => {
  isSatellite.value = !isSatellite.value
  if (satelliteLayer.value === null) {
    satelliteLayer.value = new AMap.TileLayer.Satellite()
    map.value.add(satelliteLayer.value)
    return
  }

  if (isSatellite.value) {
    map.value.add(satelliteLayer.value)
  } else {
    map.value.remove(satelliteLayer.value)
  }
}

// 路况
const toggleTraffic = () => {
  isTraffic.value = !isTraffic.value
  if (trafficLayer.value === null) {
    trafficLayer.value = new AMap.TileLayer.Traffic({
      zIndex: 10
    })
    trafficLayer.value.setMap(map.value)
    return
  }

  if (isTraffic.value) {
    trafficLayer.value.show()
  } else {
    trafficLayer.value.hide()
  }
}

// 天气
const toggleWeather = () => {
  isWeather.value = !isWeather.value
  showWeather.value = !showWeather.value
  getWeather()
}

// 获取天气预报的内容
const getWeather = () => {
  AMap.plugin('AMap.Weather', () => {
    const weather = new AMap.Weather()
    // 查询实时天气信息
    weather.getLive(city.value, (err, data) => {
      if (!err) {
        liveWeather.value = data
      }
    })
    // 未来4天天气预报
    weather.getForecast(city.value, (err, data) => {
      if (!err) {
        forecastWeather.value = data.forecasts
      }
    })
  })
}

// 显示工具条方向盘
const showControlBar = () => {
  AMap.plugin('AMap.ControlBar', () => {
    map.value.addControl(new AMap.ControlBar({
      visible: true,
      position: {
        top: '10px',
        left: '10px'
      }
    }))
  })
}

// 显示工具条
const showToolBar = () => {
  AMap.plugin(['AMap.ToolBar'], () => {
    map.value.addControl(new AMap.ToolBar({
      position: {
        top: '110px',
        left: '40px'
      }
    }))
  })
}

// 显示比例尺
const showScale = () => {
  AMap.plugin('AMap.Scale', () => {
    map.value.addControl(new AMap.Scale({
      visible: true
    }))
  })
}

// 显示鹰眼
const showOverView = () => {
  AMap.plugin('AMap.HawkEye', () => {
    map.value.addControl(new AMap.HawkEye({
      visible: true
    }))
  })
}

// 浏览器定位
// https://lbs.amap.com/demo/jsapi-v2/example/location/browser-location
const browserGeolocation = () => {
  AMap.plugin('AMap.Geolocation', () => {
    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: true, // 是否使用高精度定位, 默认：true
      timeout: 10000, // 超过10秒停止定位, 默认：5s
      buttonPosition: 'RB', // 定位按钮的停靠位置
      buttonOffset: new window.AMap.Pixel(10, 130), // 定位按钮与设置的停靠位置的偏移量, 默认：Pixel(10, 20)
      zoomToAccuracy: true // 定位成功后是否自动调整地图视野到定位点
    })
    map.value.addControl(geolocation)
    geolocation.getCurrentPosition((status, result) => {
      console.log(status)
      console.log(result)
      if (status === 'complete') {
        console.log(result.addressComponent.city)
        // city.value = result.addressComponent.city
        // ElMessage.success('定位成功')
      } else {
        // ElMessage.error('定位失败')
      }
    })
  })
}

// IP城市定位
// https://lbs.amap.com/demo/jsapi-v2/example/location/get-city-name-by-ip-location
const cityLocation = () => {
  AMap.plugin('AMap.CitySearch', () => {
    // 实例化城市查询类
    const citysearch = new AMap.CitySearch()
    // 自动获取用户IP，返回当前城市
    citysearch.getLocalCity((status, result) => {
      // 地图显示当前城市
      map.value.setBounds(result.bounds)
      city.value = result.city
    })
  })
}

// 显示行政区边界
// https://lbs.amap.com/demo/jsapi-v2/example/district-search/draw-district-boundaries
const showDistrict = () => {
  AMap.plugin('AMap.DistrictSearch', () => {
    let polygons = []
    const district = new AMap.DistrictSearch({
      subdistrict: 0,   // 获取边界不需要返回下级行政区
      extensions: 'all',  // 返回行政区边界坐标组等具体信息
      level: 'province'  // 查询行政级别 province city district
    })

    district.search('宝安区', (status, result) => {
      map.value.remove(polygons) // 清除上次结果
      polygons = []
      const bounds = result.districtList[0].boundaries
      if (bounds) {
        for (let i = 0; i < bounds.length; i++) {
          // 生成行政区划polygon
          const polygon = new AMap.Polygon({
            path: bounds[i],
            fillOpacity: 0,
            // fillColor: '#80d8ff',
            strokeWeight: 4,
            strokeColor: '#0091ea'
          })
          polygons.push(polygon)
        }
      }
      map.value.add(polygons)
      // map.value.setFitView(polygons) // 视口自适应
      map.value.setFitView() // 地图自适应
    })
  })
}

onMounted(() => {
  initMap()
})
</script>

<style lang="scss" scoped>
.map-container {
  margin: -15px;
  height: 800px;
  .map {
    // width: 1600px;
    width: 100%;
    height: 800px;
  }
  /* 按钮 */
  .button-container {
    position: absolute;
    top: 20px;
    right: 40px;
    padding: 10px;
    border-radius: 3px;
    background: #fff;
    user-select: none;
    box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
    span {
      padding: 0 12px;
      border-left: 1px dashed #dbdee2;
      font-size: 14px;
      color: #5f6477;
      cursor: pointer;
      &.active {
        color: #009cf9;
      }
      &:nth-child(1) {
        border-left: 0;
      }
    }
  }
  /* 天气预报 */
  .weather {
    position: absolute;
    top: 80px;
    right: 40px;
    padding: 10px 18px;
    font-size: 12px;
    border-radius: 3px;
    box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
    background-color: #fff;
    > div:nth-child(2) {
      margin-top: 6px;
    }
    .title {
      padding-bottom: 4px;
      font-size: 14px;
      border-bottom: 1px solid #808080;
    }
    .text {
      margin-top: 8px;
      p {
        line-height: 18px;
        span {
          display: inline-block;
          width: 120px;
        }
      }
    }
  }
}
</style>
