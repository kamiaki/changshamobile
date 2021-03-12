<template>
  <div class="cs-content-warp">
    <!--地图-->
    <Map2D :is-content="'content1'" v-if="showMap2d" />
    <Map3D :is-content="'content1'" v-else />
    <!--地图切换按钮-->
    <MapTabs :show-map2d="showMap2d" @sendMap2d="getMap2d" />
    <!-- 发送请求示例 -->
    <van-button type="info" @click="demo" style="position:absolute;left:0;top:0;z-index:9999">默认按钮</van-button>
  </div>
</template>
<script>
import Map2D from '@/components/map2d/Map2D'
import Map3D from '@/components/map3d/Map3D'
import MapTabs from '@/components/MapTabs'

import { login } from '@/api/user'

export default {
  name: 'Content1',
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
    },
    demo () {
      const loginForm = {
        username: '15831867245',
        password: 'a12345678'
      }
      login({ loginName: loginForm.username, password: loginForm.password }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
