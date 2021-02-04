<template>
  <div class="fixed-top cs-layer-control">
    <van-row v-for="(layer, index) in layerList" :key="index">
      <van-popover
        v-model="layer.showPopover"
        placement="left-start"
        trigger="click"
      >
        <van-cell
          v-for="item in layer.list"
          :key="item[0]"
          center
          :title="item[0]"
        >
          <template #right-icon>
            <van-switch
              v-model="item[1]"
              size="18"
              class="ml-1"
              @input="watchTileLayer(index, item)"
              :disabled="item[2] === 'disabled'"
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
    <van-row v-if="isContent === 'content1'" class="mt-1">
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
    is2d: {
      type: Boolean,
      default: true
    },
    switches: {
      type: Object,
      default () {
        return {}
      }
    },
    isContent: {
      type: String,
      default: ''
    }
  },
  created () { },
  data () {
    const tiles2d = [
      ['地形图', false, 1],
      ['街道图', false, 2],
      ['影像图', true, 3],
      ['影像标注', false, 4],
      ['地形标注', false, 5],
      ['矢量标注', false, 6]
    ]
    const tiles3d = [
      ['影像地图', true, 'img_c'],
      ['矢量地图', false, 'vec_c'],
      ['地形晕渲', false, 'ter_c']
    ]
    let layerList = [
      {
        icon: require('@/assets/img/layerControl/wp.png'),
        title: '地图瓦片',
        showPopover: false,
        list: this.is2d ? tiles2d : tiles3d
      }
    ]
    if (this.isContent === 'content1') {
      const content1Layer = [
        {
          icon: require('@/assets/img/layerControl/zt.png'),
          title: '设备状态',
          showPopover: false,
          list: [
            ['雷达', this.switches.switch2_1, '', [2, 1]],
            ['电场', this.switches.switch2_2, '', [2, 2]],
            ['闪电', this.switches.switch2_3, '', [2, 3]]
          ]
        },
        {
          icon: require('@/assets/img/layerControl/fs.png'),
          title: '组合反射',
          showPopover: false,
          list: [['组合反射率拼图', this.switches.switch3_1, '', [3, 1]]]
        },
        {
          icon: require('@/assets/img/layerControl/ld.png'),
          title: '雷电',
          showPopover: false,
          list: [
            ['散点', this.switches.switch4_1, '', [4, 1]],
            ['密度', this.switches.switch4_2, 'disabled', [4, 2]],
            ['强度', this.switches.switch4_3, 'disabled', [4, 3]],
            ['聚类', this.switches.switch4_4, 'disabled', [4, 4]]
          ]
        },
        {
          icon: require('@/assets/img/layerControl/dc.png'),
          title: '电场',
          showPopover: false,
          list: [['色斑图', this.switches.switch5_1, '', [5, 1]]]
        }
      ]
      layerList = layerList.concat(content1Layer)
    }
    if (this.isContent === 'content2') {
      const content2Layer = [
        {
          icon: require('@/assets/img/layerControl/ldyj.png'),
          title: '雷电预警',
          showPopover: false,
          list: [
            ['雷达', this.switches.switch6_1, '', [6, 1]],
            ['电场', this.switches.switch6_2, '', [6, 2]],
            ['闪电', this.switches.switch6_3, '', [6, 3]]
          ]
        }
      ]
      layerList = layerList.concat(content2Layer)
    }
    return {
      layerList: layerList,
      statistics: {
        icon: require('@/assets/img/layerControl/tj.png'),
        title: '统计'
      }
    }
  },
  methods: {
    // layer图层控制
    watchTileLayer (index, item) {
      index === 0 && this.changeLayer1(item[2])
      index !== 0 && this.changeLayer(item[3])
      setTimeout(() => (this.layerList[index].showPopover = false), 300)
    },
    // 地图瓦片切换
    changeLayer1 (val) {
      this.layerList[0].list.map((item) => {
        item[1] = item[2] === val
        return item
      })
      this.$emit('watchTileLayer', val)
    },
    // 设备状态、组合反射、雷电、电场切换
    changeLayer (arr) {
      if (this.isContent === 'content1') {
        this.$store.dispatch('vuexContent1/switchesAction', arr)
      }
      if (this.isContent === 'content2') {
        this.$store.dispatch('vuexContent2/switchesAction', arr)
      }
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
