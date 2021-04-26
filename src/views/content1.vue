<template>
  <div class="cs-content-warp">
    <div v-if="!isLoading">
      <!--地图-->
      <Map2D :is-content="'content1'" v-if="showMap2d" :data="data" :date-times="dateTimes" :cur-time="curTime" />
      <Map3D :is-content="'content1'" v-else :data="data" :date-times="dateTimes" :cur-time="curTime" />
      <!--地图切换按钮-->
      <MapTabs :show-map2d="showMap2d" @sendMap2d="getMap2d" />
    </div>
    <!-- 时间轴 -->
    <LayerTimeline :is-content="'content1'" @getCurTime="getCurTime" />
  </div>
</template>
<script>
import Map2D from '@/components/map2d/Map2D'
import Map3D from '@/components/map3d/Map3D'
import MapTabs from '@/components/MapTabs'
import LayerTimeline from '@/components/LayerTimeline'
import { Toast } from 'vant'
import {
  axiosGetElectricFieldStations, // 设备-电场
  axiosGetThunderStations, // 设备-闪电
  axiosGetRadarPuzzle, // 组合反射率-色斑图
  axiosGetLightningScatter, // 雷电散点
  axiosGetElectricFieldPattern // 电场色斑图
} from '@/api/api'

export default {
  name: 'Content1',
  data () {
    return {
      showMap2d: true,
      isLoading: true,
      data: {
        layer2_1_Data: [], // 设备雷达---散点 --- !!!暂无接口
        layer2_2_Data: [], // 设备电场---散点   √
        layer2_3_Data: [], // 设备闪电---散点   √
        layer3_1_Data: {}, // 组合反射率拼图---贴色斑图   √
        layer4_1_Data: {}, // 雷电散点---散点(正闪“+”负闪“-”云闪“·”)   √
        layer4_2_Data: {}, // 雷电密度---贴色斑图---!!!暂时不做
        layer4_3_Data: {}, // 雷电强度---贴色斑图---!!!暂时不做
        layer4_4_Data: {}, // 雷电聚类---聚类---!!!暂时不做
        layer5_1_Data: {}// 电场色斑图---贴色斑图   √
      },
      provinceCode: '430000',
      stepMinute: 60,
      curTime: '', // 时间轴
      dateTimes: []
    }
  },
  components: { Map2D, Map3D, MapTabs, LayerTimeline },
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
      this.getData()
    }
  },
  async mounted () {
    this.getData()
  },
  methods: {
    // 设置地图类别
    getMap2d (val) {
      this.showMap2d = val
    },
    // 获取时间轴当前时间(时间戳)
    getCurTime (val) {
      this.curTime = val[0]
      this.dateTimes = val[1]
    },
    // 加载页面数据
    async getData () {
      this.isLoading = true
      Toast.loading({ duration: 0, message: '加载中...', forbidClick: true })
      // /////////////////////////////////////////////设备
      if (this.switches.switch2_2) {
        await this.getLayer2_2()
      }
      if (this.switches.switch2_3) {
        await this.getLayer2_3()
      }
      // /////////////////////////////////////////////组合反射率
      if (this.switches.switch3_1) {
        await this.getLayer3_1()
      }
      // /////////////////////////////////////////////雷电
      if (this.switches.switch4_1) {
        await this.getLayer4_1()
      }
      // /////////////////////////////////////////////电场
      if (this.switches.switch5_1) {
        await this.getLayer5_1()
      }
      this.isLoading = false
      Toast.clear()
    },
    // content1 图层-获取电场设备
    async getLayer2_2 () {
      return new Promise((resolve, reject) => {
        axiosGetElectricFieldStations({ provinceCode: this.provinceCode }).then(res => {
          console.log('电场设备')
          res.success && res.data && (this.data.layer2_2_Data = res.data, resolve())
        })
      })
    },
    // content1 图层-获取闪电设备
    async getLayer2_3 () {
      return new Promise((resolve, reject) => {
        axiosGetThunderStations({ provinceCode: this.provinceCode }).then(res => {
          console.log('闪电设备')
          res.success && res.data && (this.data.layer2_3_Data = res.data, resolve())
        })
      })
    },
    // content1 图层-获取雷电散点
    async getLayer4_1 () {
      const { provinceCode, stepMinute, dateTimes } = this
      return new Promise((resolve, reject) => {
        axiosGetLightningScatter({ provinceCode, stepMinute, dateTimes }).then(res => {
          console.log('雷电散点')
          res.success && res.data && (this.data.layer4_1_Data = res.data, resolve())
        })
      })
    },
    // content1 组合反射率拼图
    async getLayer3_1 () {
      const { provinceCode, stepMinute, dateTimes } = this
      return new Promise((resolve, reject) => {
        axiosGetRadarPuzzle({ provinceCode, stepMinute, dateTimes }).then(res => {
          console.log('组合反射率拼图')
          res.success && res.data && (this.data.layer3_1_Data = res.data, resolve())
        })
      })
    },
    // content1 电场色斑图
    async getLayer5_1 () {
      const { provinceCode, stepMinute, dateTimes } = this
      return new Promise((resolve, reject) => {
        axiosGetElectricFieldPattern({ provinceCode, stepMinute, dateTimes }).then(res => {
          console.log('电场色斑图')
          res.success && res.data && (this.data.layer5_1_Data = res.data, resolve())
        })
      })
    }
  }
}
</script>
