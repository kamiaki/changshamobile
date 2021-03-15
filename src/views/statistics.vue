<template>
  <div class="cs-statistics-warp">
    <van-nav-bar title="数据统计" left-text="" left-arrow fixed @click-left="goBack()" />
    <div class="pt-5 px-1 pb-1">
      <van-tabs class="bg-white" type="card" background="#fff" color="#1989fa" style="margin-top: 4px" v-model="active1">
        <van-tab title="电场和雷电数据图">
          <scatterChart :id="'scatterChart'" height="320px" width="100%" />
        </van-tab>
      </van-tabs>

      <van-tabs class="mt-1 bg-white" type="card" background="#fff" color="#1989fa" v-model="active2" @change="changeLineChart">
        <van-tab class="cccc" :title="title[0]"></van-tab>
        <van-tab :title="title[1]"></van-tab>
        <div class="font-smaller p-1">{{ title[active2] }}雷电数量统计</div>
        <lineChart :id="'lineChart'" :data="lineChartData" height="220px" width="100%" />
      </van-tabs>
    </div>
  </div>
</template>

<script>
import scatterChart from '@/components/Charts/scatterChart'
import lineChart from '@/components/Charts/lineChart'

export default {
  name: 'statistics',
  data () {
    return {
      active1: 0,
      active2: 0,
      title: ['近24小时', '近7天'],
      lineChartData: {
        dataX: [],
        dataY1: []
      }
    }
  },
  components: { scatterChart, lineChart },
  created () {
    this.changeLineChart(0)
  },
  methods: {
    // 返回
    goBack () {
      this.$router.go(-1)
    },
    // 切换标签 生成折线图数据
    changeLineChart (name) {
      const data = {
        dataX: [],
        dataY1: []
      }
      const num = (name === 0 ? 24 : 7)
      for (let i = 0; i < num; i++) {
        data.dataX.push(i)
        data.dataY1.push(Math.floor(Math.random() * 50))
      }
      this.lineChartData = data
    }
  }
}
</script>

<style lang="scss">
.ccc {
  background: red;
}
</style>
