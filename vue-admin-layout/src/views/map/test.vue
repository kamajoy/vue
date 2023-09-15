<template>
  <div class="map-container">
    <div id="map" class="map"></div>
    <!-- 按钮 -->
    <div class="btn-container">
      <span>{{zoom}}级</span>
      <span @click="toggleSatellite" :class="[isSatelliteClass ? 'active' : '']">卫星</span>
      <span @click="toggleTraffic" :class="[isTrafficClass ? 'active' : '']">路况</span>
      <span @click="toggleWeather" :class="[isWeatherClass ? 'active' : '']">天气</span>
    </div>
    <!-- 天气 -->
    <div class="weather" v-show="weather">
      <div>
        <h3 class="title">实时天气</h3>
        <div class="text">
          <p>城市： {{realTimeWeather.city}}</p>
          <p>天气： {{realTimeWeather.weather}}</p>
          <p>温度： {{realTimeWeather.temperature}}</p>
          <p>风向： {{realTimeWeather.windDirection}}</p>
          <p>风力： {{realTimeWeather.windPower}}</p>
          <p>空气湿度： {{realTimeWeather.humidity}}</p>
          <p>发布时间： {{realTimeWeather.reportTime}}</p>
        </div>
      </div>
      <div>
        <h3 class="title">天气预报</h3>
        <div class="text">
          <p v-for="item in forecastsList" :key="item.week">
            <span class>{{item.date}} {{item.dayWeather}}</span>
            {{item.nightTemp}}~{{item.dayTemp}}℃
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mapName',
  data () {
    return {
      zoom: 8, // 地图级别
      isTrafficClass: false, // 是否显示路况
      isSatelliteClass: false, // 是否显示卫星地图
      isWeatherClass: false, // 天气预报是否显示
      satelliteLayer: null,
      traffic: null,
      weather: false, // 天气预报弹窗
      city: '广州市',
      forecastsList: [],
      realTimeWeather: {}
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    // 初始化地图
    initMap () {
      this.map = new window.AMap.Map('map', {
        resizeEnable: true,
        zoom: 15
      })

      this.toolBar()
      this.mapScale()
      this.overView()
      // this.showWeather()
      this.browserGeolocation()

      // 显示地图级别
      this.map.on('zoomchange', () => {
        // console.log(parseInt(this.map.getZoom()))
        this.zoom = this.map.getZoom()
      })
    },
    // 切换卫星地图
    toggleSatellite () {
      this.isSatelliteClass = !this.isSatelliteClass
      if (this.satelliteLayer === null) {
        this.satelliteLayer = new window.AMap.TileLayer.Satellite()
        this.map.add(this.satelliteLayer)
        return
      }

      if (this.isSatelliteClass) {
        this.map.add(this.satelliteLayer)
      } else {
        this.map.remove(this.satelliteLayer)
      }
    },
    // 切换路况
    toggleTraffic () {
      this.isTrafficClass = !this.isTrafficClass
      if (this.traffic === null) {
        this.traffic = new window.AMap.TileLayer.Traffic({
          zIndex: 10
        })
        this.traffic.setMap(this.map)
        return
      }

      if (this.isTrafficClass) {
        this.traffic.show()
      } else {
        this.traffic.hide()
      }
    },
    // 是否显示天气预报
    toggleWeather () {
      this.weather = !this.weather
      this.isWeatherClass = !this.isWeatherClass
      this.showWeather()
    },
    // 获取天气预报的内容
    showWeather () {
      window.AMap.plugin('AMap.Weather', () => {
        let weather = new window.AMap.Weather()
        // 查询实时天气信息
        weather.getLive(this.city, (err, data) => {
          if (!err) {
            this.realTimeWeather = data
          }
        })

        // 未来4天天气预报
        weather.getForecast(this.city, (err, data) => {
          if (err) {
            return
          }
          this.forecastsList = data.forecasts
        })
      })
    },
    // 显示工具条
    toolBar () {
      window.AMap.plugin(['AMap.ToolBar'], () => {
        this.map.addControl(new window.AMap.ToolBar({
          // liteStyle: true
        }))
      })
    },
    // 显示比例尺
    mapScale () {
      window.AMap.plugin(['AMap.Scale'], () => {
        const scale = new window.AMap.Scale({
          visible: true
        })
        this.map.addControl(scale)
      })
    },
    // 显示鹰眼
    overView () {
      window.AMap.plugin(['AMap.OverView'], () => {
        this.map.addControl(new window.AMap.OverView())
      })
    },
    // 浏览器定位
    browserGeolocation () {
      window.AMap.plugin('AMap.Geolocation', () => {
        const geolocation = new window.AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位, 默认：true
          timeout: 10000, // 超过10秒停止定位, 默认：5s
          buttonPosition: 'RB', // 定位按钮的停靠位置
          buttonOffset: new window.AMap.Pixel(10, 130), // 定位按钮与设置的停靠位置的偏移量, 默认：Pixel(10, 20)
          zoomToAccuracy: true // 定位成功后是否自动调整地图视野到定位点
        })

        this.map.addControl(geolocation) // 将定位图片添加到地图上
        geolocation.getCurrentPosition((status, result) => {
          if (status === 'complete') {
            this.city = result.addressComponent.city
            this.$message({ type: 'success', message: '定位成功' })
          } else {
            this.$message({ type: 'error', message: '定位失败' })
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.map-container {
  height: 100%;

  .map {
    width: 100%;
    height: 100%;
  }
  /* 按钮 */
  .btn-container {
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
