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
    }
  },
  data () {
    return {
      chart: null
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
      const data = {
        dataX: [],
        dataY1: [],
        dataY2: []
      }
      for (let i = 0; i <= 60 * 4; i++) {
        data.dataX.push(i % 24 + '时')
        data.dataY1.push(Math.floor(Math.random() * 30 - 15))
        data.dataY2.push([
          i,
          Math.floor(Math.random() * 40 - 20),
          Math.floor(Math.random() * 3)
        ])
      }

      const iconPlus = 'path://M808.22679909 477.27937673L546.71996176 477.27937673 546.71996176 215.79108495c0-19.18046157-15.52029053-34.72062327-34.72062327-34.72062328-19.11952507 0-34.68088224 15.54016171-34.68088224 34.72062328l-0.01722124 261.48829047L215.81029331 477.27937673c-19.16059171 0-34.72062327 15.56003286-34.72062327 34.72062327 0 19.18046157 15.56003286 34.71929895 34.72062327 34.71929895l261.48564185 0-0.01722124 261.4896161c0 19.15926739 15.60109821 34.72194889 34.72062327 34.72194888 19.20033275 0 34.72062327-15.56268149 34.72062328-34.72194888L546.71996176 546.71929895l261.46974493 0c19.20033275 0 34.72062327-15.53883739 34.72062327-34.71929895S827.39003941 477.27937673 808.22679909 477.27937673z'
      const iconReduce = 'path://M843.97142286 478.10202084c0 18.73933342-15.202361 33.89797916-33.91785033 33.89797916l-596.09257244 0c-18.71681363 0-33.87545937-15.15732142-33.87545938-33.89797916l0 0c0-18.71681363 15.15732142-33.89533053 33.87545938-33.89533053l596.09257244 0C828.77038615 444.20669031 843.97142286 459.38520592 843.97142286 478.10202084L843.97142286 478.10202084z'
      const iconDot = 'path://M512 610.4375a98.4375 98.4375 0 1 0 0-196.875 98.4375 98.4375 0 0 0 0 196.875z'
      const iconArr = [iconPlus, iconReduce, iconDot]
      const scatterData = []
      data.dataY2.map(item => {
        const sItem = {
          value: [item[0], item[1]],
          symbol: iconArr[item[2]],
          symbolSize: item[2] === 0 ? [10, 10] : (item[2] === 1 ? [10, 1] : [2, 2]),
          itemStyle: {
            color: 'green'
          }
        }
        scatterData.push(sItem)
      })

      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        color: ['#0000fe', 'green'],
        backgroundColor: '#fff',
        grid: {
          left: 40,
          top: 70,
          right: 40,
          bottom: 35
        },
        xAxis: [
          {
            data: data.dataX,
            show: false
          },
          {
            data: data.dataX,
            show: false
          },
          {
            position: 'bottom',
            data: data.dataX,
            boundaryGap: false,
            axisLabel: { show: true },
            axisTick: { inside: true }
          },
          {
            position: 'top',
            data: data.dataX,
            boundaryGap: false,
            axisLabel: { show: false },
            axisTick: { inside: true }
          }
        ],
        legend: {
          show: true,
          icon: 'roundRect',
          itemWidth: 16,
          itemHeight: 10,
          top: 10
        },
        yAxis: [
          {
            name: '电场曲线',
            max: 60,
            min: -60,
            splitNumber: 8,
            splitLine: { show: false },
            axisTick: { inside: true }
          },
          {
            name: '电场散点',
            max: 60,
            min: -60,
            splitNumber: 8,
            position: 'right',
            splitLine: { lineStyle: { color: '#eee' } },
            axisTick: { inside: true }
          }
        ],
        series: [
          {
            name: '电场曲线',
            symbol: 'none',
            data: data.dataY1,
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#0000fe',
              width: 1
            }
          },
          {
            xAxisIndex: 1,
            yAxisIndex: 1,
            name: '电场散点',
            data: scatterData,
            type: 'scatter'
          }
        ]
      })
    }
  }
}
</script>
