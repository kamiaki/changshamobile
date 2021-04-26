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
    },
    type: {
      type: [String, Number],
      default: 0
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
          right: 38,
          bottom: 35
        },
        xAxis: {
          name: this.type === 1 ? '日' : '(时)',
          data: this.data.dataX,
          boundaryGap: false,
          axisTick: { inside: true }
        },
        yAxis: {
          name: '(次)',
          nameLocation: 'end',
          nameGap: 10,
          splitLine: { lineStyle: { color: '#eee' } },
          axisTick: { inside: true }
        },
        series: [
          {
            // symbol: 'none',
            data: this.data.dataY3,
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#f96a0b',
              width: 2
            }
          }
        ]
      })
    }
  }
}
</script>
