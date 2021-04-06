<template>
  <div class="cs-content-warp" v-if="!isLoading">
    <!--地图-->
    <Map2D :is-content="'content2'" v-if="showMap2d" :data="data" :date-times="dateTimes" :cur-time="curTime" />
    <Map3D :is-content="'content2'" v-else :data="data" :date-times="dateTimes" :cur-time="curTime" />
    <!--地图切换按钮-->
    <MapTabs :show-map2d="showMap2d" @sendMap2d="getMap2d" />
    <!-- 时间轴 -->
    <LayerTimeline :is-content="'content2'" @getCurTime="getCurTime" />
  </div>
</template>
<script>
import Map2D from '@/components/map2d/Map2D'
import Map3D from '@/components/map3d/Map3D'
import MapTabs from '@/components/MapTabs'
import LayerTimeline from '@/components/LayerTimeline'
import { Toast } from 'vant'
import {
  axiosGetWarningProduct // 预警色斑图
} from '@/api/api'

export default {
  name: 'Content2',
  data() {
    return {
      showMap2d: true,
      isLoading: true,
      data: {
        layer7_1_data: {} // 雷电预警---贴色斑图
      },
      provinceCode: '430000',
      stepMinute: 60,
      curTime: '', // 时间轴
      dateTimes: []
    }
  },
  components: { Map2D, Map3D, MapTabs, LayerTimeline },
  computed: {
    switches() {
      return this.$store.state.vuexContent2.switches
    },
    changeSwitch() {
      return Object.values(this.switches)
    }
  },
  watch: {
    changeSwitch() {
      this.getData()
    }
  },
  async created() {
    this.getData()
  },
  methods: {
    // 设置地图类别
    getMap2d(val) {
      this.showMap2d = val
    },
    // 获取时间轴当前时间(时间戳)
    getCurTime(val) {
      this.curTime = val[0]
      this.dateTimes = val[1]
    },
    async getData() {
      this.isLoading = true
      Toast.loading({ duration: 0, message: '加载中...', forbidClick: true })
      // /////////////////////////////////////////////雷达色斑图
      if (this.switches.switch7_1) {
        await this.getLayer7_1()
      }
      this.isLoading = false
      Toast.clear()
    },
    // content2 图层-获取预警色斑图
    async getLayer7_1() {
      const { provinceCode, stepMinute, dateTimes } = this
      return new Promise((resolve, reject) => {
        axiosGetWarningProduct({ provinceCode, stepMinute, dateTimes }).then(res => {
          console.log('预警色斑图')
          this.data.layer7_1_Data = res
          resolve()
        })
      })
    }
  }
}
</script>
