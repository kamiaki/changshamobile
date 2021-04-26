<template>
  <div class="fixed-bottom flex flex-nowrap align-end cs-layer-legend">
    <div class="mr-1" v-for="item in legendList" :key="item.title">
      <van-list v-if="switches[item.switch]">
        <van-cell class="cs-cell text-center" :title="item.title" />
        <van-cell v-if="item.unit" class="cs-cell text-center" :title="item.unit" />
        <van-cell class="cs-cell text-center" v-for="i in item.data" :key="i[0]" :style="{ background: i[2] }" :title="getRangeText(item.title,i[0], i[1])" />
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayerLegend',
  props: {
    isContent: {
      type: String,
      default: ''
    }
  },
  data () {
    const content1List = [
      {
        title: '组合反射',
        switch: 'switch3_1',
        unit: '',
        data: [
          [70, 999, '#ad91f1'],
          [65, 70, '#9700b5'],
          [60, 65, '#ff00f1'],
          [55, 60, '#c10000'],
          [50, 55, '#d70000'],
          [45, 50, '#ff0000'],
          [40, 45, '#ff9100'],
          [35, 40, '#e7c100'],
          [30, 35, '#ffff00'],
          [25, 30, '#009100'],
          [20, 25, '#00d900'],
          [15, 20, '#00eded'],
          [10, 15, '#00a1f7'],
        ]
      },
      {
        title: '电场',
        switch: 'switch5_1',
        unit: 'KV/m',
        data: [
          [12, 999, 'rgba(20,48,253,1)'],
          [11, 12, 'rgba(20,48,253,0.9163)'],
          [10, 11, 'rgba(20,48,253,0.833)'],
          [9, 10, 'rgba(20,48,253,0.7479)'],
          [8, 9, 'rgba(20,48,253,0.6664)'],
          [7, 8, 'rgba(20,48,253,0.5831)'],
          [6, 7, 'rgba(20,48,253,0.4998)'],
          [5, 6, 'rgba(20,48,253,0.4165)'],
          [4, 5, 'rgba(20,48,253,0.3332)'],
          [3, 4, 'rgba(20,48,253,0.2499)'],
          [2, 3, 'rgba(20,48,253,0.1666)'],
          [1, 2, 'rgba(20,48,253,0.0833)'],
          [-999, 1, 'rgba(20,48,253,0)']
        ]
      },
      {
        title: '雷电',
        switch: 'switch4_1',
        unit: '',
        data: [
          ['+', '正闪', '#9dc64e'],
          ['-', '负闪', '#b81319'],
          ['·', '云闪', '#e0d394'],
        ]
      },
    ]
    const content2List = [{
      title: '雷电预警',
      switch: 'switch7_1',
      unit: '%',
      data: [
        [80, 90, 'rgba(255,8,5,1)'],
        [70, 80, 'rgba(255,8,5,0.88)'],
        [60, 70, 'rgba(255,8,5,0.77)'],
        [50, 60, 'rgba(255,8,5,0.66)'],
        [40, 50, 'rgba(255,8,5,0.55)'],
        [30, 40, 'rgba(255,8,5,0.44)'],
        [20, 30, 'rgba(255,8,5,0.33)'],
        [10, 20, 'rgba(255,8,5,0.22)'],
        [0, 10, 'rgba(255,8,5,0.11)'],
      ]
    }]
    return {
      content1List: content1List,
      content2List: content2List,
      legendList: []
    }
  },
  created () {
    this.legendList = (this.isContent === 'content1' ? this.content1List : this.content2List)
  },
  watch: {
    isContent (val, oldVal) {
      if (val !== oldVal) { this.legendList = (this.isContent === 'content1' ? this.content1List : this.content2List) }
    }
  },
  computed: {
    switches () {
      return this.isContent === 'content1' ? this.$store.state.vuexContent1.switches : this.$store.state.vuexContent2.switches
    }
  },
  methods: {
    // 图例文字计算规则
    getRangeText (title, min, max) {
      console.log(title)
      if (title !== '雷电') {
        const arr = []
        arr[0] = min === -999 ? '' : min
        arr[1] = '~'
        arr[2] = max === 999 ? '' : max
        if (arr[0] === '') {
          arr[1] = '<'
        }
        if (arr[2] === '') {
          arr[1] = '>'
          arr[2] = arr[0]
          arr[0] = ''
        }
        return arr.join('')
      } else {
        return `${min} (${max})`
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.cs-layer-legend {
  left: 10px;
  right: auto;
  bottom: 115px;
  transform: scale(0.8);
  transform-origin: left bottom;
  .van-list {
    background-color: #fff;
    .van-cell::after {
      display: none;
    }
    .cs-cell {
      padding: 0;
      border: 0;
      min-width: 46px;
      span {
        display: block;
        font-size: 12px;
        height: 16px;
        line-height: 16px;
      }
    }
  }
}
</style>
