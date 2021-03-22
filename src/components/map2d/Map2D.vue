<template>
  <div>
    <div class="fixed-top font-sm text-center line-height-2 text-white">
      {{ curTime | formatTimestamp("yyyy-MM-dd hh:00:00") }}
    </div>
    <!-- 地图 -->
    <l-map class="cs-leaflet-map" ref="leafletMap" @ready="initGis" :options="options" />
    <!-- 图层控制 -->
    <LayerControl @watchTileLayer="watchTileLayer" :is-content="isContent" :switches="switches" />
    <!-- 图例 -->
    <LayerLegend :is-content="isContent" />
  </div>
</template>

<script>
import { formatTimestamp } from '@/utils/datetimeUtils'
import { LMap } from 'vue2-leaflet'
import L from 'leaflet'
import { getTilesUrl } from '@/utils/leafletUtils'
import { randomFlow } from 'aki_js_utils'
import LayerControl from '../LayerControl'
import LayerLegend from '../LayerLegend'
import mixin from '../mixin'

export default {
  name: 'Map2D1',
  mixins: [mixin],
  props: {
    isContent: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default() { return {} }
    },
    dataTimes: {
      type: Array,
      default() { return [] }
    },
    curTime: {
      type: [Number, String],
      default: ''
    }
  },
  filters: { formatTimestamp },
  components: { LMap, LayerControl, LayerLegend },
  data() {
    return {
      // 地图
      stepKey: 1,
      options: { zoomControl: false },
      leafletMap: undefined,
      leafletTileLayer: undefined,
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
      layer6_1: undefined, // 预警雷达---散点---!!!暂时不做
      layer6_2: undefined, // 预警电场---散点---!!!暂时不做
      layer6_3: undefined, // 预警闪电---散点---!!!暂时不做
      layer7_1: L.imageOverlay('', [[0, 0], [0, 0]]), // 雷电预警---贴色斑图   √
      // 图片拼接地址
      picUrl: process.env.VUE_APP_BASE_API
    }
  },
  computed: {
    switches() {
      return this.isContent === 'content1' ? this.$store.state.vuexContent1.switches : this.$store.state.vuexContent2.switches
    },
    changeSwitch() {
      return Object.values(this.switches)
    }
  },
  watch: {
    changeSwitch() {
      this.setProduct()
    },
    curTime: function (val, oldVal) {
      if (oldVal && val !== oldVal) {
        this.showProduct()
      }
    }
  },
  methods: {
    // 监控地图瓦片
    watchTileLayer(number) {
      this.leafletTileLayer.setUrl(getTilesUrl(parseInt(number)))
    },
    // 地图标记点图标
    getIcon(type, isAcitve) {
      const url = this.getIconUrl(type, isAcitve)
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
    async initGis() {
      // 取出map元素
      this.leafletMap = this.$refs.leafletMap.mapObject
      const map = this.leafletMap

      // 设置瓦片
      this.leafletTileLayer = L.tileLayer(getTilesUrl(3), { maxZoom: 18 })
      map.addLayer(this.leafletTileLayer)
      // 设置镜头
      map.setView([27.186633, 111.934952], 6)
      // 绘制湖南边界
      const style = {
        color: '#000000', // 边框颜色
        weight: 2, // 边框粗细
        opacity: 1, // 透明度
        fillColor: '#a0a3ea', // 区域填充颜色
        fillOpacity: 0.2 // 区域填充颜色的透明
      }
      L.geoJSON(require('@/assets/geojson/43.json'), { style: style }).addTo(map) // features是指geojson数据

      // /////////////////////////////////////////////加载数据
      this.setProduct()
    },
    // 展示隐藏产品
    showProduct() {
      const curTimeKey = formatTimestamp(this.curTime, 'yyyy-MM-ddThh:00:00')
      console.log(curTimeKey)
      if (this.isContent === 'content1') {
        if (this.switches.switch2_2) {
          const res = this.data.layer2_2_Data
          for (let i = 0; i < res.length; i++) {
            const maker = L.marker([res[i].latitude, res[i].longitude], { icon: this.getIcon('dianchang', res[i].status === '1') })
            maker.on('click', function (e) {
              maker.bindPopup('<div>' + maker._latlng.lat + ',' + maker._latlng.lng + '</div>').openPopup()
            })
            this.layer2_2.addLayer(maker)
          }
          this.layer2_2.addTo(this.leafletMap)
        } else {
          this.layer2_2.remove()
        }
        if (this.switches.switch2_3) {
          const res = this.data.layer2_3_Data
          for (let i = 0; i < res.length; i++) {
            const maker = L.marker([res[i].latitude, res[i].longitude], { icon: this.getIcon('shandian', res[i].status === '1') })
            maker.on('click', function (e) {
              maker.bindPopup('<div>' + maker._latlng.lat + ',' + maker._latlng.lng + '</div>').openPopup()
            })
            this.layer2_3.addLayer(maker)
          }
          this.layer2_3.addTo(this.leafletMap)
        } else {
          this.layer2_3.remove()
        }
        // 雷电
        if (this.switches.switch4_1) {
          // const curList = this.data.layer4_1_Data[curTimeKey]
          const curList = Object.entries(this.data.layer4_1_Data)[0][1]
          for (let i = 0; i < curList.length; i++) {
            const iconName = curList[i].typeName === '正闪' ? 'zs' : (curList[i].typeName === '负闪' ? 'fs' : 'ys')
            const maker = L.marker([curList[i].latitude, curList[i].longtitude], { icon: this.getIcon(`leidian_${iconName}`) })
            maker.on('click', function (e) {
              maker.bindPopup('<div>' + maker._latlng.lat + ',' + maker._latlng.lng + '</div>').openPopup()
            })
            this.layer4_1.addLayer(maker)
          }
          this.layer4_1.addTo(this.leafletMap)
        } else {
          this.layer4_1.remove()
        }
        // 组合反射率拼图
        if (this.switches.switch3_1) {
          // const curList = this.data.layer5_1_Data[curTimeKey]
          const curList = Object.entries(this.data.layer3_1_Data)[0][1]
          this.layer3_1.setBounds([[curList.area[1][1], curList.area[0][0]], [curList.area[0][1], curList.area[1][0]]])
          // this.layer3_1.setUrl(require(this.picUrl + curList.url))
          this.layer3_1.setUrl(require('@/assets/carouselImg/' + randomFlow(1, 4, 0) + '.png'))
          this.layer3_1.addTo(this.leafletMap)
        } else {
          this.layer3_1.remove()
        }
        // 电场色斑图
        if (this.switches.switch5_1) {
          // const curList = this.data.layer5_1_Data[curTimeKey]
          const curList = Object.entries(this.data.layer5_1_Data)[0][1]
          this.layer5_1.setBounds([[curList.area[1][1], curList.area[0][0]], [curList.area[0][1], curList.area[1][0]]])
          // this.layer5_1.setUrl(require(this.picUrl + curList.url))
          this.layer5_1.setUrl(require('@/assets/carouselImg/' + randomFlow(1, 4, 0) + '.png'))
          this.layer5_1.addTo(this.leafletMap)
        } else {
          this.layer5_1.remove()
        }
      }
      if (this.isContent === 'content2') {
        // 雷电预警色斑图
        if (this.switches.switch7_1) {
          // const curList = this.layer7_1_Data[curTimeKey]
          const curList = Object.entries(this.data.layer7_1_Data)[0][1]
          this.layer7_1.setBounds([[curList.area[1][1], curList.area[0][0]], [curList.area[0][1], curList.area[1][0]]])
          // this.layer7_1.setUrl(require(this.picUrl + curList.url))
          this.layer7_1.setUrl(require('@/assets/carouselImg/' + randomFlow(1, 4, 0) + '.png'))
          this.layer7_1.addTo(this.leafletMap)
        } else {
          this.layer7_1.remove()
        }
      }
    },
    // 设置产品
    setProduct() {
      if (this.isContent === 'content1') {
        // /////////////////////////////////////////////设备
        if (this.switches.switch2_2) {
          this.layer2_2.clearLayers()
        }
        if (this.switches.switch2_3) {
          this.layer2_3.clearLayers()
        }
        // /////////////////////////////////////////////组合反射率
        if (this.switches.switch3_1) {
        }
        // /////////////////////////////////////////////雷电
        if (this.switches.switch4_1) {
          this.layer4_1.clearLayers()
        }
        // /////////////////////////////////////////////电场
        if (this.switches.switch5_1) {
        }
      }
      if (this.isContent === 'content2') { // 雷达预警色斑图
      }
      this.showProduct()
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
