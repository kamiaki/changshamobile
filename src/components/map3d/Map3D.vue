<template>
  <div class="viewer">
    <div class="fixed-top font-sm text-center line-height-2 text-white">
      {{ curTime | formatTimestamp("yyyy-MM-dd hh:00:00") }}
    </div>
    <!-- 地图 -->
    <vc-viewer ref="myViewer">
      <!-- content1 产品图层 -->
      <vc-collection-primitive :show="switches.switch2_1 && isContent === 'content1'">
        <vc-collection-primitive-billboard :billboards="dataSource2_1" />
      </vc-collection-primitive>
      <vc-collection-primitive :show="switches.switch2_2 && isContent === 'content1'">
        <vc-collection-primitive-billboard :billboards="dataSource2_2" />
      </vc-collection-primitive>
      <vc-collection-primitive :show="switches.switch2_3 && isContent === 'content1'">
        <vc-collection-primitive-billboard :billboards="dataSource2_3" />
      </vc-collection-primitive>
      <vc-collection-primitive :show="switches.switch4_1 && isContent === 'content1'">
        <vc-collection-primitive-billboard :billboards="dataSource4_1" />
      </vc-collection-primitive>
      <vc-primitive-ground :show="switches.switch3_1 && isContent === 'content1'" :appearance="dataSource3_1">
        <vc-instance-geometry>
          <vc-geometry-rectangle :rectangle="rectangle" />
        </vc-instance-geometry>
      </vc-primitive-ground>

      <vc-primitive-ground :show="switches.switch5_1 && isContent === 'content1'" :appearance="dataSource5_1">
        <vc-instance-geometry>
          <vc-geometry-rectangle :rectangle="rectangle" />
        </vc-instance-geometry>
      </vc-primitive-ground>

      <!-- content2 产品图层 -->
      <vc-collection-primitive :show="switches.switch6_1 && isContent === 'content2'">
        <vc-collection-primitive-billboard :billboards="dataSource6_1" />
      </vc-collection-primitive>
      <vc-collection-primitive :show="switches.switch6_2 && isContent === 'content2'">
        <vc-collection-primitive-billboard :billboards="dataSource6_2" />
      </vc-collection-primitive>
      <vc-collection-primitive :show="switches.switch6_3 && isContent === 'content2'">
        <vc-collection-primitive-billboard :billboards="dataSource6_3" />
      </vc-collection-primitive>
      <vc-primitive-ground :show="switches.switch7_1 && isContent === 'content2'" :appearance="dataSource7_1">
        <vc-instance-geometry>
          <vc-geometry-rectangle :rectangle="rectangle" />
        </vc-instance-geometry>
      </vc-primitive-ground>

      <!-- 天地图 -->
      <vc-layer-imagery ref="layerText" :sortOrder="20">
        <vc-provider-imagery-tianditu mapStyle="cva_c" :token="token" />
      </vc-layer-imagery>
      <vc-layer-imagery :sortOrder="10">
        <vc-provider-imagery-tianditu :mapStyle="mapStyle" :token="token" />
      </vc-layer-imagery>
    </vc-viewer>
    <!-- 图层控制 -->
    <LayerControl :is2d="false" @watchTileLayer="watchTileLayer" :is-content="isContent" :switches="switches" />
    <!-- 图例 -->
    <LayerLegend :is-content="isContent" />
  </div>
</template>

<script>
import { formatTimestamp } from '@/utils/datetimeUtils'
import { randomFlow } from 'aki_js_utils'
import LayerControl from '../LayerControl'
import LayerLegend from '../LayerLegend'
import mixin from '../mixin'

export default {
  name: 'Map3D1',
  mixins: [mixin],
  props: {
    isContent: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default () { return {} }
    },
    dateTimes: {
      type: Array,
      default () { return [] }
    },
    curTime: {
      type: [Number, String],
      default: ''
    }
  },
  filters: { formatTimestamp },
  components: { LayerControl, LayerLegend },
  data () {
    return {
      // 地图
      Cesium: undefined,
      viewer: undefined,
      mapStyle: 'img_c',
      token: '57ec812dfa2ff081441552c338ec47d7',
      rectangle: { west: 108.796621, south: 24.64278, east: 114.266381, north: 30.129666 },
      // content1 图层
      dataSource2_1: [], // 设备雷达---散点   √
      dataSource2_2: [], // 设备电场---散点   √
      dataSource2_3: [], // 设备闪电---散点   √
      dataSource3_1: undefined, // 组合反射率拼图---贴色斑图   √
      dataSource4_1: [], // 雷电散点---散点(正闪“+”负闪“-”云闪“·”)   √
      dataSource4_2: undefined, // 雷电密度---贴色斑图---!!!暂时不做
      dataSource4_3: undefined, // 雷电强度---贴色斑图---!!!暂时不做
      dataSource4_4: undefined, // 雷电聚类---聚类---!!!暂时不做
      dataSource5_1: undefined, // 电场色斑图---贴色斑图   √
      // content2 图层
      dataSource6_1: [], // 预警雷达---散点---!!!暂时不做
      dataSource6_2: [], // 预警电场---散点---!!!暂时不做
      dataSource6_3: [], // 预警闪电---散点---!!!暂时不做
      dataSource7_1: undefined, // 雷电预警---贴色斑图   √
      // 图片拼接地址
      picUrl: process.env.VUE_APP_BASE_API
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
  mounted () {
    // 加载框
    const loadingText = '拼命加载地图中...'
    let loadingCount = 10
    const toast = this.$toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: `${loadingText}${loadingCount}%`
    })

    this.$refs.myViewer.createPromise.then(
      ({ Cesium, viewer }) => {
        // 初始化参数
        this.Cesium = Cesium
        this.viewer = viewer
        this.viewer._cesiumWidget._creditContainer.style.display = 'none'

        // 镜头
        this.setCamera()

        // 地图加载进度条
        new Cesium.EventHelper().add(viewer.scene.globe.tileLoadProgressEvent, (event) => {
          if (event === 0 || loadingCount === 100) {
            this.$toast.clear()

            // 边界文件
            const gjds = new Cesium.GeoJsonDataSource('GeoJsonDataSource')
            gjds.load(require('@/assets/geojson/43.json'), {
              stroke: this.Cesium.Color.GRAY,
              fill: this.Cesium.Color.TRANSPARENT,
              strokeWidth: 20
            })
            this.viewer.dataSources.add(gjds)

            // /////////////////////////////////////////////加载数据
            this.showProduct()
          } else {
            loadingCount += 10
            toast.message = `${loadingText}${loadingCount}%`
          }
        })
      }
    )
  },
  watch: {
    changeSwitch () {
      this.showProduct()
    },
    curTime: function (val, oldVal) {
      if (oldVal && val !== oldVal) {
        this.showProduct()
      }
    }
  },
  methods: {
    // 监控地图瓦片
    watchTileLayer (val) {
      this.mapStyle = val
    },
    // 设置镜头
    setCamera () {
      this.viewer.camera.setView({
        // 坐标位置 和 高度
        destination: this.Cesium.Cartesian3.fromDegrees(111.66, 21.58, 600000),
        orientation: {
          // 旋转 30左转 -30右转
          heading: this.Cesium.Math.toRadians(0),
          // 仰角 -90正对着 -60在下头 -100在上头
          pitch: this.Cesium.Math.toRadians(-48),
          // 旋转 1左转 -1右转
          roll: 0.0
        }
      })
    },
    // 设置产品
    showProduct () {
      const curTimeKey = formatTimestamp(this.curTime, 'yyyy-MM-ddThh:00:00')
      // console.log(curTimeKey)
      if (this.isContent === 'content1') {
        this.switches.switch2_2 && (this.dataSource2_2 = this.setPoints(2, 2))
        this.switches.switch2_3 && (this.dataSource2_3 = this.setPoints(2, 3))
        this.switches.switch4_1 && (this.dataSource4_1 = this.setPoints(4, 1))

        if (this.switches.switch3_1) {
          // curTimeKey = '2021-04-09T01:00:00'
          const curList1 = this.data.layer3_1_Data[curTimeKey]
          if (curList1) {
            this.rectangle = { west: curList1.area[0][0], south: curList1.area[0][1], east: curList1.area[1][0], north: curList1.area[1][1] }
            this.dataSource3_1 = new Cesium.MaterialAppearance({
              material: new Cesium.Material({ fabric: { type: 'Image', uniforms: { image: this.picUrl + curList1.url } } })
            })
          }
        }
        if (this.switches.switch5_1) {
          // curTimeKey = '2021-04-09T00:00:00'
          const curList = this.data.layer5_1_Data[curTimeKey]
          if (curList) {
            this.rectangle = { west: curList.area[0][0], south: curList.area[0][1], east: curList.area[1][0], north: curList.area[1][1] }
            this.dataSource5_1 = new Cesium.MaterialAppearance({
              material: new Cesium.Material({ fabric: { type: 'Image', uniforms: { image: this.picUrl + curList.url } } })
            })
          }
        }
      }
      if (this.isContent === 'content2') {
        if (this.switches.switch7_1) {
          const curList = this.data.layer7_1_Data[curTimeKey]
          if (curList) {
            this.rectangle = { west: curList.area[0][0], south: curList.area[0][1], east: curList.area[1][0], north: curList.area[1][1] }
            this.dataSource7_1 = new Cesium.MaterialAppearance({
              material: new Cesium.Material({ fabric: { type: 'Image', uniforms: { image: this.picUrl + curList.url } } })
            })
          }
        }
      }
    },
    // 生成散点
    setPoints (num1, num2) {
      const curTimeKey = formatTimestamp(this.curTime, 'yyyy-MM-ddThh:00:00')
      // console.log(curTimeKey)
      const list = []
      let url = null; let scale = 0.2; let data = null
      // /////////////////////////////////////////////设备-电场
      if (num1 === 2 && num2 === 2) {
        scale = 0.12
        data = this.data.layer2_2_Data
      }
      // /////////////////////////////////////////////设备-闪电
      if (num1 === 2 && num2 === 3) {
        data = this.data.layer2_3_Data
      }
      // /////////////////////////////////////////////雷电散点
      if (num1 === 4 && num2 === 1) {
        scale = 0.4
        data = this.data.layer4_1_Data[curTimeKey]
        data = Object.entries(this.data.layer4_1_Data)[0][1]
      }
      if (data && data.length) {
        for (let i = 0; i < data.length; i++) {
          if (num1 === 2 && num2 === 2) {
            url = this.getIconUrl('dianchang', data[i].status === '1')
          }
          if (num1 === 2 && num2 === 3) {
            url = this.getIconUrl('shandian', data[i].status === '1')
          }
          if (num1 === 4 && num2 === 1) {
            const iconName = data[i].typeName === '正闪' ? 'zs' : (data[i].typeName === '负闪' ? 'fs' : 'ys')
            url = this.getIconUrl(`leidian_${iconName}`)
          }
          const item = {
            position: { lng: (num1 === 4 && num2 === 1) ? data[i].longtitude : data[i].longitude, lat: data[i].latitude },
            image: url,
            scale: scale
          }
          list.push(item)
        }
      }
      return list
    }
  }
}
</script>
<style lang="scss" scoped>
.viewer {
  width: 100%;
  height: calc(100vh - 50px) !important;
  background: black;
}
</style>
