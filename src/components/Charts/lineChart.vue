<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '100%'
    },
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    data: {
      handler (val, oldVal) {
        if (val !== oldVal) {
          this.initChart()
        }
      },
      deep: true
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        backgroundColor: '#fff',
        grid: {
          left: 40,
          top: 25,
          right: 20,
          bottom: 35
        },
        xAxis: {
          data: this.data.dataX,
          boundaryGap: false,
          axisTick: { inside: true }
        },
        yAxis: {
          name: '(次)',
          nameLocation: 'end',
          nameGap: 10,
          splitLine: { lineStyle: { color: '#eee' } },
          axisTick: { show: false }
        },
        series: [
          {
            symbol: 'none',
            data: this.data.dataY1,
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#0000fe',
              width: 1
            }
          }
        ]
      })
    }
  }
}
</script>
