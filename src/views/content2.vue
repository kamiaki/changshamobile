<template>
  <div class="cs-content-warp">
    <!--地图-->
    <Map2D :is-content="'content2'" v-if="showMap2d" />
    <Map3D :is-content="'content2'" v-else />
    <!--地图切换按钮-->
    <MapTabs :show-map2d="showMap2d" @sendMap2d="getMap2d" />
  </div>
</template>
<script>
import Map2D from '@/components/map2d/Map2D'
import Map3D from '@/components/map3d/Map3D'
import MapTabs from '@/components/MapTabs'

export default {
  name: 'Content2',
  data () {
    return {
      showMap2d: true
    }
  },
  components: { Map2D, Map3D, MapTabs },
  methods: {
    // 设置地图类别
    getMap2d (val) {
      this.showMap2d = val
    }
  }
}
</script>
