<template>
  <div class="cs-content1-warp">
    <!------------------------------------------------------>
    <!------------------------------------------------------>
    <div>
      <!--地图-->
      <Map2D1></Map2D1>
      <!-- <Map3D1 v-show="!showMap2D"></Map3D1> -->
      <!--地图切换按钮-->
      <div class="fixed-top cs-control-btns">
        <van-button
          type="info"
          size="small"
          class="cs-button"
          :plain="!showMap2D"
          @click="showMap2D = !showMap2D"
        >
          地图
        </van-button>
        <van-button
          type="info"
          size="small"
          :plain="showMap2D"
          class="cs-button"
          @click="showMap2D = !showMap2D"
        >
          三维
        </van-button>
      </div>
      <!------------------------------------------------------>
      <!------------------------------------------------------>
    </div>
  </div>
</template>
<script>
import Map2D1 from '@/components/content1/map2d/Map2D1'

export default {
  name: 'Content2',
  data () {
    return {
      showMap2D: true
    }
  },
  components: { Map2D1 }
}
</script>
<style lang="scss" scoped>
.cs-content1-warp {
  height: calc(100vh - 50px);
  .cs-control-btns {
    left: 10px;
    top: 20px;
    .cs-button {
      padding: 0 15px;
      border: 0;
    }
  }
}
</style>
