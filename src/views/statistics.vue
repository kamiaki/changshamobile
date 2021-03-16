<template>
  <div class="cs-statistics-warp">
    <van-nav-bar title="数据统计" left-text="" left-arrow fixed @click-left="goBack()" />
    <div class="pt-5 px-1 pb-1">
    <van-tabs class="bg-white" type="line" background="#fff" color="#00CCFF"  style="margin-top: 4px;" line-width="0" v-model="active1">
        <van-tab title="电场和雷电数据统计" title-style="font-weight:bold;justify-content:left;">
          <div slot="title">
           <van-icon name="more-o" color="#00CCFF" style="font-weight:bold"/> 电场和雷电数据统计
          </div>
          <scatterChart :id="'scatterChart'" height="320px" width="100%" />
        </van-tab>
      </van-tabs>

      <van-tabs class="mt-1 bg-white" background="#fff" type="line" color="#00CCFF" title-active-color="#00CCFF" v-model="active2" border=true line-width="200" @change="changeLineChart">
        <van-tab title-style="font-weight:bold" :title="title[0]"></van-tab>
        <van-tab title-style="font-weight:bold" :title="title[1]"></van-tab>
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

<style lang="scss" >
.van-ellipsis {
    color: #fefbfb;
  }

 .van-nav-bar .van-icon {
    color: #fefbfb;
  }

 .van-nav-bar__text {
    color: #fefbfb;
  }
.van-nav-bar{
background-image: linear-gradient(to right, #0099FF, #00CCFF);
}

</style>
