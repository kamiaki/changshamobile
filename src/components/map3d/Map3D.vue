<template>
  <div class="viewer">
    <!-- 地图 -->
    <vc-viewer ref="myViewer">
      <!-- content1 产品图层 -->
      <vc-collection-primitive
        :show="switches.switch2_1 && isContent === 'content1'"
      >
        <vc-collection-primitive-billboard :billboards="dataSource2_1" />
      </vc-collection-primitive>
      <vc-collection-primitive
        :show="switches.switch2_2 && isContent === 'content1'"
      >
        <vc-collection-primitive-billboard :billboards="dataSource2_2" />
      </vc-collection-primitive>
      <vc-collection-primitive
        :show="switches.switch2_3 && isContent === 'content1'"
      >
        <vc-collection-primitive-billboard :billboards="dataSource2_3" />
      </vc-collection-primitive>
      <vc-collection-primitive
        :show="switches.switch4_1 && isContent === 'content1'"
      >
        <vc-collection-primitive-billboard :billboards="dataSource4_1" />
      </vc-collection-primitive>
      <vc-primitive-ground
        :show="switches.switch3_1 && isContent === 'content1'"
        :appearance="dataSource3_1"
      >
        <vc-instance-geometry>
          <vc-geometry-rectangle :rectangle="rectangle" />
        </vc-instance-geometry>
      </vc-primitive-ground>

      <vc-primitive-ground
        :show="switches.switch5_1 && isContent === 'content1'"
        :appearance="dataSource5_1"
      >
        <vc-instance-geometry>
          <vc-geometry-rectangle :rectangle="rectangle" />
        </vc-instance-geometry>
      </vc-primitive-ground>

      <!-- content2 产品图层 -->
      <vc-collection-primitive
        :show="switches.switch6_1 && isContent === 'content2'"
      >
        <vc-collection-primitive-billboard :billboards="dataSource6_1" />
      </vc-collection-primitive>
      <vc-collection-primitive
        :show="switches.switch6_2 && isContent === 'content2'"
      >
        <vc-collection-primitive-billboard :billboards="dataSource6_2" />
      </vc-collection-primitive>
      <vc-collection-primitive
        :show="switches.switch6_3 && isContent === 'content2'"
      >
        <vc-collection-primitive-billboard :billboards="dataSource6_3" />
      </vc-collection-primitive>

      <!-- 天地图 -->
      <vc-layer-imagery ref="layerText" :sortOrder="20">
        <vc-provider-imagery-tianditu mapStyle="cva_c" :token="token" />
      </vc-layer-imagery>
      <vc-layer-imagery :sortOrder="10">
        <vc-provider-imagery-tianditu :mapStyle="mapStyle" :token="token" />
      </vc-layer-imagery>
    </vc-viewer>
    <!-- 图层控制 -->
    <LayerControl
      :is2d="false"
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
import { randomFlow } from 'aki_js_utils'
import LayerControl from '../LayerControl'
import LayerTimeline from '../LayerTimeline'
import LayerLegend from '../LayerLegend'
import mixin from '../mixin'

export default {
  name: 'Map3D1',
  mixins: [mixin],
  props: {
    isContent: {
      type: String,
      default: ''
    }
  },
  components: { LayerControl, LayerTimeline, LayerLegend },
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
      dataSource6_1: [], // 预警雷达---散点   √
      dataSource6_2: [], // 预警电场---散点   √
      dataSource6_3: [], // 预警闪电---散点   √
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
            if (this.isContent === 'content1') {
              this.dataSource2_1 = this.setRandomPoints(2, 1)
              this.dataSource2_2 = this.setRandomPoints(2, 2)
              this.dataSource2_3 = this.setRandomPoints(2, 3)
              this.dataSource4_1 = this.setRandomPoints(4, 1)
              const name = randomFlow(1, 4, 0)
              this.dataSource3_1 = new Cesium.MaterialAppearance({
                material: new Cesium.Material({ fabric: { type: 'Image', uniforms: { image: require(`@/assets/carouselImg/${name}.png`) } } })
              })
              const name2 = randomFlow(1, 4, 0)
              this.dataSource5_1 = new Cesium.MaterialAppearance({
                material: new Cesium.Material({ fabric: { type: 'Image', uniforms: { image: require(`@/assets/timeline/layer1/${name2}.png`) } } })
              })
            }
            if (this.isContent === 'content2') {
              this.dataSource6_1 = this.setRandomPoints(2, 1)
              this.dataSource6_2 = this.setRandomPoints(2, 2)
              this.dataSource6_3 = this.setRandomPoints(2, 3)
            }
            // /////////////////////////////////////////////显示数据
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
      if (val !== oldVal) {
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
      if (this.isContent === 'content1') {
        this.dataSource2_1 = this.setRandomPoints(2, 1)
        this.dataSource2_2 = this.setRandomPoints(2, 2)
        this.dataSource2_3 = this.setRandomPoints(2, 3)
        this.dataSource4_1 = this.setRandomPoints(4, 1)
        const name = randomFlow(1, 4, 0)
        const name2 = randomFlow(1, 4, 0)
        this.dataSource3_1.material.uniforms.image = require(`@/assets/carouselImg/${name}.png`)
        this.dataSource5_1.material.uniforms.image = require(`@/assets/timeline/layer1/${name2}.png`)
      }
      if (this.isContent === 'content2') {
        this.dataSource6_1 = this.setRandomPoints(2, 1)
        this.dataSource6_2 = this.setRandomPoints(2, 2)
        this.dataSource6_3 = this.setRandomPoints(2, 3)
      }
    },
    // 生成随机散点
    setRandomPoints (num1, num2) {
      const list = []
      let url = null
      let scale = 0.2
      // /////////////////////////////////////////////设备-雷达
      if (num1 === 2 && num2 === 1) {
        url = this.getIconUrl('leida')
        scale = 0.2
      }
      // /////////////////////////////////////////////设备-电场
      if (num1 === 2 && num2 === 2) {
        url = this.getIconUrl('dianchang')
        scale = 0.12
      }
      // /////////////////////////////////////////////设备-闪电
      if (num1 === 2 && num2 === 3) {
        url = this.getIconUrl('shandian')
        scale = 0.2
      }
      // /////////////////////////////////////////////雷电散点
      if (num1 === 4 && num2 === 1) {
        scale = 0.4
      }
      for (let i = 0; i < 20; i++) {
        if (num1 === 4 && num2 === 1) {
          const iconArr = ['zs', 'fs', 'ys']
          const iconIndex = randomFlow(0, 2, 0)
          url = this.getIconUrl(`leidian_${iconArr[iconIndex]}`)
        }
        const y = randomFlow(26.663183, 29.806257, 2)
        const x = randomFlow(110.335938, 113.279785, 2)
        const item = {
          position: { lng: x, lat: y },
          image: url,
          scale: scale
        }
        list.push(item)
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
