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
    <LayerControl
      @watchTileLayer="watchTileLayer"
      :is-content="isContent"
      :switches="switches"
    />
    <!-- 时间轴 -->
    <LayerTimeline @getCurTime="getCurTime" />
    <!-- 图例 -->
    <LayerLegend v-if="isContent === 'content1'" />
  </div>
</template>

<script>
import { LMap } from 'vue2-leaflet'
import L from 'leaflet'
import { getTilesUrl } from '@/utils/leafletUtils'
import { randomFlow } from 'aki_js_utils'
import LayerControl from '../LayerControl'
import LayerTimeline from '../LayerTimeline'
import LayerLegend from '../LayerLegend'
import mixin from '../mixin'

export default {
  name: 'Map2D1',
  mixins: [mixin],
  props: {
    isContent: {
      type: String,
      default: ''
    }
  },
  components: { LMap, LayerControl, LayerTimeline, LayerLegend },
  data () {
    return {
      // 地图
      stepKey: 1,
      options: { zoomControl: false },
      leafletMap: undefined,
      leafletTileLayer: undefined,
      rectangle: [[30.129666, 108.796621], [24.64278, 114.266381]],
      // content1 图层
      layer2_1: L.layerGroup(), // 设备雷达---散点   √
      layer2_2: L.layerGroup(), // 设备电场---散点   √
      layer2_3: L.layerGroup(), // 设备闪电---散点   √
      layer3_1: L.imageOverlay('', [[0, 0], [0, 0]]), // 组合反射率拼图---贴色斑图   √
      layer4_1: L.layerGroup(), // 雷电散点---散点(正闪“+”负闪“-”云闪“·”)   √
      layer4_2: undefined, // 雷电密度---贴色斑图---!!!暂时不做
      layer4_3: undefined, // 雷电强度---贴色斑图---!!!暂时不做
      layer4_4: undefined, // 雷电聚类---聚类---!!!暂时不做
      layer5_1: L.imageOverlay('', [[0, 0], [0, 0]]), // 电场色斑图---贴色斑图   √
      // content2 图层
      layer6_1: L.layerGroup(), // 预警雷达---散点   √
      layer6_2: L.layerGroup(), // 预警电场---散点   √
      layer6_3: L.layerGroup(), // 预警闪电---散点   √
      // 时间轴
      curTime: ''
    }
  },
  computed: {
    switches () {
      return this.isContent === 'content1' ? this.$store.state.vuexContent1.switches : this.$store.state.vuexContent2.switches
    },
    changeSwitch () {
      return Object.values(this.switches)
    }
  },
  watch: {
    changeSwitch () {
      this.setProduct('', true)
      this.showProduct()
    },
    curTime: function (val, oldVal) {
      if (val !== oldVal) {
        this.setProduct('', true)
        this.showProduct()
      }
    }
  },
  methods: {
    // 获取时间轴当前时间(时间戳)
    getCurTime (val) {
      this.curTime = val
    },
    // 监控地图瓦片
    watchTileLayer (number) {
      this.leafletTileLayer.setUrl(getTilesUrl(parseInt(number)))
    },
    // 地图标记点图标
    getIcon (type) {
      const url = this.getIconUrl(type)
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

      // /////////////////////////////////////////////加载数据
      this.setProduct('', true)
      this.showProduct()
    },
    // 展示隐藏贴图图层
    showProduct () {
      if (this.isContent === 'content1') {
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
        // 组合反射率拼图
        if (this.switches.switch3_1) {
          this.layer3_1.addTo(this.leafletMap)
        } else {
          this.layer3_1.remove()
        }
        // 雷电
        if (this.switches.switch4_1) {
          this.layer4_1.addTo(this.leafletMap)
        } else {
          this.layer4_1.remove()
        }
        // 电场色斑图
        if (this.switches.switch5_1) {
          this.layer5_1.addTo(this.leafletMap)
        } else {
          this.layer5_1.remove()
        }
      }
      if (this.isContent === 'content2') {
        // 预警
        if (this.switches.switch6_1) {
          this.layer6_1.addTo(this.leafletMap)
        } else {
          this.layer6_1.remove()
        }
        if (this.switches.switch6_2) {
          this.layer6_2.addTo(this.leafletMap)
        } else {
          this.layer6_2.remove()
        }
        if (this.switches.switch6_3) {
          this.layer6_3.addTo(this.leafletMap)
        } else {
          this.layer6_3.remove()
        }
      }
    },
    // 设置贴图 init 是否初始化
    setProduct (time, init) {
      if (this.isContent === 'content1') {
        // /////////////////////////////////////////////设备
        if (this.switches.switch2_1 || init) {
          // 在这里改变 设备状态
          this.layer2_1.clearLayers()
          this.getRandomPoints(2, 1)
        }
        if (this.switches.switch2_2 || init) {
          // 在这里改变 设备状态
          this.layer2_2.clearLayers()
          this.getRandomPoints(2, 2)
        }
        if (this.switches.switch2_3 || init) {
          // 在这里改变 设备状态
          this.layer2_3.clearLayers()
          this.getRandomPoints(2, 3)
        }
        // /////////////////////////////////////////////组合反射
        if (this.switches.switch3_1 || init) {
          // 在这里写后台获取图片的axios,根据 time 和 类型 请求,拿到url和边界
          const name = randomFlow(1, 11, 0)
          this.layer3_1.setBounds(this.rectangle)
          this.layer3_1.setUrl(require('@/assets/timeline/layer1/' + name + '.png'))
        }
        // /////////////////////////////////////////////雷电
        if (this.switches.switch4_1 || init) {
          // 在这里写后台获取图片的axios,根据 time 和 类型 请求,拿到url和边界
          this.layer4_1.clearLayers()
          this.getRandomPoints(4, 1)
        }
        // /////////////////////////////////////////////电场
        if (this.switches.switch5_1 || init) {
          const name = randomFlow(1, 4, 0)
          this.layer5_1.setBounds(this.rectangle)
          this.layer5_1.setUrl(require('@/assets/carouselImg/' + name + '.png'))
        }
      }
      if (this.isContent === 'content2') {
        if (this.switches.switch6_1 || init) {
          // 在这里改变 设备状态
          this.layer6_1.clearLayers()
          this.getRandomPoints(6, 1)
        }
        if (this.switches.switch6_2 || init) {
          // 在这里改变 设备状态
          this.layer6_2.clearLayers()
          this.getRandomPoints(6, 2)
        }
        if (this.switches.switch6_3 || init) {
          // 在这里改变 设备状态
          this.layer6_3.clearLayers()
          this.getRandomPoints(6, 3)
        }
      }
    },
    // 生成随机散点
    getRandomPoints (num1, num2) {
      // /////////////////////////////////////////////设备-雷达
      if (num1 === 2 && num2 === 1) {
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
      }
      // /////////////////////////////////////////////设备-电场
      if (num1 === 2 && num2 === 2) {
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
      }
      // /////////////////////////////////////////////设备-闪电
      if (num1 === 2 && num2 === 3) {
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
      }
      // /////////////////////////////////////////////雷电散点
      if (num1 === 4 && num2 === 1) {
        for (let i = 0; i < 10; i++) {
          const y = randomFlow(26.663183, 29.806257, 2)
          const x = randomFlow(110.335938, 113.279785, 2)
          const iconArr = ['zs', 'fs', 'ys']
          const iconIndex = randomFlow(0, 2, 0)
          const maker = L.marker([y, x], {
            icon: this.getIcon(`leidian_${iconArr[iconIndex]}`)
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
      // ////////////////////////////////////////////预警
      // /////////////////////////////////////////////设备-雷达
      if (num1 === 6 && num2 === 1) {
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
          this.layer6_1.addLayer(maker)
        }
      }
      // /////////////////////////////////////////////设备-电场
      if (num1 === 6 && num2 === 2) {
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
          this.layer6_2.addLayer(maker)
        }
      }
      // /////////////////////////////////////////////设备-闪电
      if (num1 === 6 && num2 === 3) {
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
          this.layer6_3.addLayer(maker)
        }
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
