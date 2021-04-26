<template>
  <div class="fixed-bottom flex flex-nowrap align-end cs-layer-legend">
    <div class="mr-1" v-for="item in legendList" :key="item.title">
      <van-list v-if="switches[item.switch]">
        <van-cell class="cs-cell text-center" :title="item.title" />
        <van-cell v-if="item.unit" class="cs-cell text-center" :title="item.unit" />
        <van-cell class="cs-cell text-center" v-for="item in item.data" :key="item[0]" :style="{ background: item[2] }" :title="getRangeText(item[0], item[1])" />
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
  data() {
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
        ].reverse()
      }
    ]
    const content2List = [{
      title: '雷电预警',
      switch: 'switch7_1',
      unit: '分钟',
      data: [
        [0, 6, 'rgb(229,19,102)'],
        [6, 12, 'rgb(218,26,144)'],
        [12, 18, 'rgb(206,33,186)'],
        [18, 24, 'rgb(164,35,208)'],
        [24, 30, 'rgb(108,34,221)'],
        [30, 36, 'rgb(51,33,234)'],
        [36, 42, 'rgb(14,54,242)'],
        [42, 48, 'rgb(14,116,242)'],
        [48, 54, 'rgb(14,180,242)'],
        [54, 60, 'rgb(14,242,242)']
      ]
    }]
    return {
      content1List: content1List,
      content2List: content2List,
      legendList: []
    }
  },
  created() {
    this.legendList = (this.isContent === 'content1' ? this.content1List : this.content2List)
  },
  watch: {
    isContent(val, oldVal) {
      if (val !== oldVal) { this.legendList = (this.isContent === 'content1' ? this.content1List : this.content2List) }
    }
  },
  computed: {
    switches() {
      return this.isContent === 'content1' ? this.$store.state.vuexContent1.switches : this.$store.state.vuexContent2.switches
    }
  },
  methods: {
    // 图例文字计算规则
    getRangeText(min, max) {
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
