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
            <van-switch v-model="item[1]" size="18" class="ml-1" />
          </template>
        </van-cell>
        <template #reference>
          <van-button type="default" size="small" class="cs-button cs-button2">
            <van-image width="24" height="24" :src="layer.icon" />
            <p>{{ layer.title }}</p>
          </van-button>
        </template>
      </van-popover>
    </van-row>
    <van-row class="mt-1">
      <van-button type="info" size="small" class="cs-button" to="/statistics">
        <van-image width="24" height="24" :src="statistics.icon" />
        <p>{{ statistics.title }}</p>
      </van-button>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'LayerControl',
  data () {
    return {
      layerList: [
        {
          icon: require('@/assets/img/layerControl/wp.png'),
          title: '地图瓦片',
          showPopover: false,
          list: [
            ['地形图', false],
            ['街道图', false],
            ['影像图', true],
            ['影像标注', false],
            ['地形标注', false],
            ['矢量标注', false]
          ]
        },
        {
          icon: require('@/assets/img/layerControl/zt.png'),
          title: '设备状态',
          showPopover: false,
          list: [
            ['雷达', true],
            ['电场', false],
            ['闪电', false]
          ]
        },
        {
          icon: require('@/assets/img/layerControl/fs.png'),
          title: '组合反射',
          showPopover: false,
          list: [['组合反射率拼图', false]]
        },
        {
          icon: require('@/assets/img/layerControl/ld.png'),
          title: '雷电',
          showPopover: false,
          list: [
            ['散点', true],
            ['密度', true],
            ['强度', false],
            ['聚类', false]
          ]
        },
        {
          icon: require('@/assets/img/layerControl/dc.png'),
          title: '电场',
          showPopover: false,
          list: [
            ['色斑图', false],
            ['曲线', false]
          ]
        }
      ],
      statistics: {
        icon: require('@/assets/img/layerControl/tj.png'),
        title: '统计'
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
    padding: 8px 2px;
    width: 60px;
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
