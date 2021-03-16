<template>
  <div class="cs-statistics-warp" v-if="!isLoading">
    <van-nav-bar title="数据统计" left-text="" left-arrow fixed @click-left="goBack()" />
    <div class="pt-5 px-1 pb-1">
      <van-field v-if="columns.length" readonly clickable label="选择站点：" :value="station" placeholder="选择站点" @click="showPicker = true" />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker title="选择站点" show-toolbar :default-index="selectIndex" :columns="columns" value-key="devicename" @cancel="showPicker = false" @confirm="onConfirm">
        </van-picker>
      </van-popup>

      <van-tabs class="bg-white" type="line" background="#fff" color="#00CCFF" style="margin-top: 4px;" line-width="0" v-model="active1">
        <van-tab title="电场和雷电数据统计" title-style="font-weight:bold;justify-content:left;">
          <div slot="title">
            <van-icon name="more-o" color="#00CCFF" style="font-weight:bold" /> 电场和雷电数据统计
          </div>
          <scatterChart :id="'scatterChart'" height="320px" width="100%" :data="scatterData" />
        </van-tab>
      </van-tabs>

      <van-tabs class="mt-1 bg-white" background="#fff" type="line" color="#00CCFF" title-active-color="#00CCFF" v-model="active2" :border='false' line-width="200" @change="changeLineChart">
        <van-tab title-style="font-weight:bold" :title="title[0]"></van-tab>
        <van-tab title-style="font-weight:bold" :title="title[1]"></van-tab>
        <div class="font-smaller p-1">{{ title[active2] }}雷电数量统计</div>
        <lineChart :id="'lineChart'" :data="lineChartData" height="220px" width="100%" :type='active2' />
      </van-tabs>
    </div>
  </div>
</template>

<script>
import scatterChart from '@/components/Charts/scatterChart'
import lineChart from '@/components/Charts/lineChart'
import {
  axiosGetElectricFieldStations, // 设备-电场
  axiosGetElectricChartData, // 电场曲线和散点
  axiosGetLightningFrequencyChartTable // 近24小时，近7天
} from '@/api/api'
import { Toast } from 'vant'
import { formatTimestamp } from '@/utils/datetimeUtils'

export default {
  name: 'statistics',
  data () {
    return {
      isLoading: true,
      selectIndex: '',
      station: '',
      stationId: '',
      showPicker: false,
      columns: [],
      active1: 0,
      active2: 0,
      title: ['近24小时', '近7天'],
      lineChartData: {},
      scatterData: {},
      dataValue: ''
    }
  },
  components: { scatterChart, lineChart },
  created () {
    const currentTime = new Date().getTime()
    this.dateValue = formatTimestamp(currentTime, 'yyyy-MM-ddThh:00:00.000Z')
    this.init(true)
  },
  methods: {
    // 页面初始化
    async init (isInit) {
      this.isLoading = true
      Toast.loading({ duration: 0, message: '加载中...', forbidClick: true })
      isInit && await this.getStationList()
      await this.getScatterChart()
      await this.getLineChart()
      this.isLoading = false
      Toast.clear()
    },
    // 获取站点列表
    async getStationList () {
      return new Promise((resolve, reject) => {
        axiosGetElectricFieldStations().then(res => {
          if (res && res.length) {
            this.columns = res
            this.selectIndex = 0
            this.stationId = res[0].num
            this.station = res[0].devicename
          }
          resolve()
        })
      })
    },
    // 获取电场曲线和电场散点
    async getScatterChart () {
      return new Promise((resolve, reject) => {
        axiosGetElectricChartData({
          dateValue: this.dateValue, provinceCode: 430000, station: this.stationId
        }).then(res => {
          console.log('电场曲线和电场散点')
          res && (this.scatterData = res)
          resolve()
        })
      })
    },
    // 获取24小时，近7天雷电数量
    async getLineChart () {
      return new Promise((resolve, reject) => {
        axiosGetLightningFrequencyChartTable({
          dateValue: this.dateValue, provinceCode: 430000, dateType: (this.active2 === 1 ? 'week' : 'day')
        }).then(res => {
          console.log('24小时，近7天雷电数量')
          res && res.chartData && (this.lineChartData = res.chartData)
          resolve()
        })
      })
    },
    // 选择站点
    onConfirm (item) {
      this.station = item.devicename
      this.stationId = item.num
      this.selectIndex = this.columns.findIndex(item => item.num === this.stationId)
      this.showPicker = false
      this.init(false)
    },
    // 返回
    goBack () {
      this.$router.go(-1)
    },
    // 切换标签 生成折线图数据
    async changeLineChart () {
      this.isLoading = true
      Toast.loading({ duration: 0, message: '加载中...', forbidClick: true })
      await this.getLineChart()
      this.isLoading = false
      Toast.clear()
    }
  }
}
</script>

<style lang="scss" >
.van-nav-bar .van-icon {
  color: #fefbfb;
}

.van-nav-bar__text {
  color: #fefbfb;
}
.van-nav-bar {
  background-image: linear-gradient(to right, #0099ff, #00ccff);
}
.cs-statistics-warp .van-nav-bar__title {
  color: #fefbfb;
}
</style>
