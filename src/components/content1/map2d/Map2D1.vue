<template>
  <div>
    <!-- 地图 -->
    <l-map
      class="cs-leaflet-map"
      ref="leafletMap"
      @ready="initGis"
      :options="options"
    />
    <!-- 图层控制 -->
    <LayerControl />
    <!-- 时间轴 -->
    <LayerTimeline />
  </div>
</template>

<script>
import { LMap } from 'vue2-leaflet'
import L from 'leaflet'
import { getTilesUrl } from '@/utils/leafletUtils'
import { randomFlow } from 'aki_js_utils'
import LayerControl from '../LayerControl'
import LayerTimeline from '../LayerTimeline'

const stepKeyInitValue = 1 // 测试图片初始值
export default {
  name: 'Map2D1',
  components: { LMap, LayerControl, LayerTimeline },
  data () {
    return {
      // 地图
      stepKey: stepKeyInitValue,
      options: { zoomControl: false },
      leafletMap: undefined,
      leafletTileLayer: undefined,
      // 图层
      layer2_1: undefined, // 设备雷达
      layer2_2: undefined, // 设备电场
      layer2_3: undefined, // 设备闪电
      layer3_1: undefined, // 组合反射率拼图
      layer4_1: undefined, // 雷电散点
      layer4_2: undefined, // 雷电密度
      layer4_3: undefined, // 雷电强度
      layer4_4: undefined, // 雷电聚类
      layer5_1: undefined // 电场色斑图
    }
  },
  computed: {
    switches () {
      return this.$store.state.vuexContent1.switches
    },
    changeSwitch () {
      return Object.values(this.switches)
    }
  },
  watch: {
    changeSwitch () {
      this.showProduct()
    }
  },
  methods: {
    // 地图标记点图标
    getIcon (type) {
      let url
      switch (type) {
        case 'leida':
          url = require('@/assets/img/mapMark/leida/leida.png')
          break
        case 'dianchang':
          url = require('@/assets/img/mapMark/dianchang/dianchang.gif')
          break
        case 'shandian':
          url = require('@/assets/img/mapMark/shandian/shandian.png')
          break
        case 'leidiansandian':
          url = require('@/assets/img/mapMark/leidiansandian/leidiansandian.png')
          break
        default:
          url = require('@/assets/img/mapMark/leidiansandian/leidiansandian.png')
          break
      }
      // marker 自定义图标
      const Icon = L.icon({
        iconUrl: url,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, 0]
      })
      return Icon
    },
    // 初始化地图
    initGis () {
      // 取出map元素
      this.leafletMap = this.$refs.leafletMap.mapObject
      const map = this.leafletMap
      // 弹框
      const mypop = L.popup()
      // 设置瓦片
      this.leafletTileLayer = L.tileLayer(getTilesUrl(3), { maxZoom: 18 })
      map.addLayer(this.leafletTileLayer)
      // 设置镜头
      map.setView([27.186633, 111.934952], 6)
      // 地图点击
      map.on('click', function (e) {
        mypop
          .setLatLng(e.latlng)
          .setContent('你点了这个坐标：<br>' + e.latlng.toString())
          .openOn(map)
      })
      // 绘制湖南边界
      const style = {
        color: '#000000', // 边框颜色
        weight: 2, // 边框粗细
        opacity: 1, // 透明度
        fillColor: '#a0a3ea', // 区域填充颜色
        fillOpacity: 0.2 // 区域填充颜色的透明
      }
      L.geoJSON(require('@/assets/geojson/43.json'), { style: style }).addTo(
        map
      ) // features是指geojson数据

      /// ////////////////////////////////// 创建产品图层
      // 雷达设备
      this.layer2_1 = L.layerGroup()
      for (let i = 0; i < 10; i++) {
        const y = randomFlow(26.663183, 29.806257, 2)
        const x = randomFlow(110.335938, 113.279785, 2)
        const maker = L.marker([y, x], { icon: this.getIcon('leida') })
        maker.on('click', function (e) {
          maker
            .bindPopup(
              '<div>' + maker._latlng.lat + ',' + maker._latlng.lng + '</div>'
            )
            .openPopup()
        })
        this.layer2_1.addLayer(maker)
      }
      map.addLayer(this.layer2_1)
      // 电场设备
      this.layer2_2 = L.layerGroup()
      for (let i = 0; i < 10; i++) {
        const y = randomFlow(26.663183, 29.806257, 2)
        const x = randomFlow(110.335938, 113.279785, 2)
        const maker = L.marker([y, x], { icon: this.getIcon('dianchang') })
        maker.on('click', function (e) {
          maker
            .bindPopup(
              '<div>' + maker._latlng.lat + ',' + maker._latlng.lng + '</div>'
            )
            .openPopup()
        })
        this.layer2_2.addLayer(maker)
      }
      map.addLayer(this.layer2_2)
      // 闪电设备
      this.layer2_3 = L.layerGroup()
      for (let i = 0; i < 10; i++) {
        const y = randomFlow(26.663183, 29.806257, 2)
        const x = randomFlow(110.335938, 113.279785, 2)
        const maker = L.marker([y, x], { icon: this.getIcon('shandian') })
        maker.on('click', function (e) {
          maker
            .bindPopup(
              '<div>' + maker._latlng.lat + ',' + maker._latlng.lng + '</div>'
            )
            .openPopup()
        })
        this.layer2_3.addLayer(maker)
      }
      map.addLayer(this.layer2_3)
      // ////////////////////////////////////////////////雷电
      this.layer4_1 = L.layerGroup()
      map.addLayer(this.layer4_1)
      this.layer4_2 = L.imageOverlay('', [
        [0, 0],
        [0, 0]
      ])
      map.addLayer(this.layer4_2)
      this.layer4_3 = L.imageOverlay('', [
        [0, 0],
        [0, 0]
      ])
      map.addLayer(this.layer4_3)
      // //////////////////////////////////////////加载数据
      this.showProduct()
      this.setProduct('', true)
    },
    // 展示隐藏贴图图层
    showProduct () {
      // 设备
      if (this.switches.switch2_1) {
        this.layer2_1.addTo(this.leafletMap)
      } else {
        this.layer2_1.remove()
      }
      if (this.switches.switch2_2) {
        this.layer2_2.addTo(this.leafletMap)
      } else {
        this.layer2_2.remove()
      }
      if (this.switches.switch2_3) {
        this.layer2_3.addTo(this.leafletMap)
      } else {
        this.layer2_3.remove()
      }
      // 雷电
      if (this.switches.switch4_1) {
        this.layer4_1.addTo(this.leafletMap)
      } else {
        this.layer4_1.remove()
      }
      if (this.switches.switch4_2) {
        this.layer4_2.addTo(this.leafletMap)
      } else {
        this.layer4_2.remove()
      }
      if (this.switches.switch4_3) {
        this.layer4_3.addTo(this.leafletMap)
      } else {
        this.layer4_3.remove()
      }
      // 电场
      this.layer5_2 = this.switches.switch5_2
    },
    // 设置贴图 init 是否初始化
    setProduct (time, init) {
      // /////////////////////////////////////////////设备
      if (this.switches.switch2_1 || init) {
        // 在这里改变 设备状态
      }
      if (this.switches.switch2_2 || init) {
        // 在这里改变 设备状态
      }
      if (this.switches.switch2_3 || init) {
        // 在这里改变 设备状态
      }
      // /////////////////////////////////////////////雷电
      if (this.switches.switch4_1 || init) {
        // 在这里写后台获取图片的axios,根据 time 和 类型 请求,拿到url和边界
        this.layer4_1.clearLayers()
        for (let i = 0; i < 50; i++) {
          const y = randomFlow(26.663183, 29.806257, 2)
          const x = randomFlow(110.335938, 113.279785, 2)
          const maker = L.marker([y, x], {
            icon: this.getIcon('leidiansandian')
          })
          maker.on('click', function (e) {
            maker
              .bindPopup(
                '<div>' + maker._latlng.lat + ',' + maker._latlng.lng + '</div>'
              )
              .openPopup()
          })
          this.layer4_1.addLayer(maker)
        }
      }
      if (this.switches.switch4_2 || init) {
        // 在这里写后台获取图片的axios,根据 time 和 类型 请求,拿到url和边界
        this.layer4_2.setBounds([
          [29.806257, 109.335938],
          [24.663183, 114.279785]
        ])
        this.layer4_2.setUrl(
          require('@/assets/timeline/layer1/' + this.stepKey + '.png')
        )
        if (++this.stepKey > 11) this.stepKey = stepKeyInitValue
      }
      if (this.switches.switch4_3 || init) {
        // 在这里写后台获取图片的axios,根据 time 和 类型 请求,拿到url和边界
        const name = randomFlow(1, 4, 0)
        this.layer4_3.setBounds([
          [29.806257, 109.335938],
          [24.663183, 114.279785]
        ])
        this.layer4_3.setUrl(require('@/assets/carouselImg/' + name + '.png'))
      }
      // ////////////////// 电场
      if (this.switches.switch5_2 || init) {
        const datas = []
        for (let i = 1; i <= 24; i++) {
          const obj = { 日期: String(i), 电场: randomFlow(20, 100, 0) }
          datas.push(obj)
        }
        this.rowDatas = datas
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.cs-leaflet-map {
  width: 100%;
  height: calc(100vh - 50px);
  overflow: hidden;
}
</style>
