<template>
  <div class="fixed-top cs-layer-control">
    <van-row v-for="(layer, index) in layerList" :key="index">
      <van-popover
        v-model="layer.showPopover"
        placement="left-start"
        trigger="click"
      >
        <van-cell
          v-for="(item, itemIndex) in layer.list"
          :key="item[0]"
          center
          :title="item[0]"
        >
          <template #right-icon>
            <van-switch
              v-model="item[1]"
              size="18"
              class="ml-1"
              @input="watchTileLayer(index, item, itemIndex)"
              :disabled="item[2] && item[2] === 'disabled'"
            />
          </template>
        </van-cell>
        <template #reference>
          <van-button type="default" size="small" class="cs-button cs-button2">
            <van-image width="20" height="20" :src="layer.icon" />
            <p>{{ layer.title }}</p>
          </van-button>
        </template>
      </van-popover>
    </van-row>
    <van-row class="mt-1">
      <van-button type="info" size="small" class="cs-button" to="/statistics">
        <van-image width="20" height="20" :src="statistics.icon" />
        <p>{{ statistics.title }}</p>
      </van-button>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'LayerControl',
  props: {
    switches: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  created () { },
  data () {
    return {
      layerList: [
        {
          icon: require('@/assets/img/layerControl/wp.png'),
          title: '地图瓦片',
          showPopover: false,
          list: [
            ['地形图', false, 1],
            ['街道图', false, 2],
            ['影像图', true, 3],
            ['影像标注', false, 4],
            ['地形标注', false, 5],
            ['矢量标注', false, 6]
          ]
        },
        {
          icon: require('@/assets/img/layerControl/zt.png'),
          title: '设备状态',
          showPopover: false,
          list: [
            ['雷达', this.switches.switch2_1],
            ['电场', this.switches.switch2_2],
            ['闪电', this.switches.switch2_3]
          ]
        },
        {
          icon: require('@/assets/img/layerControl/fs.png'),
          title: '组合反射',
          showPopover: false,
          list: [['组合反射率拼图', this.switches.switch3_1]]
        },
        {
          icon: require('@/assets/img/layerControl/ld.png'),
          title: '雷电',
          showPopover: false,
          list: [
            ['散点', this.switches.switch4_1],
            ['密度', this.switches.switch4_2, 'disabled'],
            ['强度', this.switches.switch4_3, 'disabled'],
            ['聚类', this.switches.switch4_4, 'disabled']
          ]
        },
        {
          icon: require('@/assets/img/layerControl/dc.png'),
          title: '电场',
          showPopover: false,
          list: [['色斑图', this.switches.switch5_1]]
        }
      ],
      statistics: {
        icon: require('@/assets/img/layerControl/tj.png'),
        title: '统计'
      }
    }
  },
  methods: {
    // layer图层控制
    watchTileLayer (index, item, itemIndex) {
      index === 0 && this.changeLayer1(item[2])
      index !== 0 && this.changeLayer(index, itemIndex)
      setTimeout(() => (this.layerList[index].showPopover = false), 300)
    },
    // 地图瓦片切换
    changeLayer1 (number) {
      this.layerList[0].list.map((item) => {
        item[1] = item[2] === number
        return item
      })
      this.$emit('watchTileLayer', number)
    },
    // 设备状态、组合反射、雷电、电场切换
    changeLayer (index, itemIndex) {
      index++
      itemIndex++
      this.$store.dispatch('vuexContent1/switchesAction', [index, itemIndex])
    }
  }
}
</script>
<style lang="scss" scoped>
.cs-layer-control {
  left: auto;
  right: 10px;
  top: 20%;
  height: 500px;
  .cs-button {
    padding: 8px 0;
    width: 56px;
    height: auto;
  }
  .cs-button2 {
    border: 0;
    border-radius: 0;
    color: #323233;
    background: rgba(255, 255, 255, 0.8);
  }
}
</style>
