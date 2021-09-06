<template>
  <div class="layout">
    <keep-alive include="Content1">
      <router-view />
    </keep-alive>
    <van-tabbar
      class="cs-tabbar"
      v-model="active"
      route
      active-color="#1989fa"
      inactive-color="#d7d7d7"
    >
      <van-tabbar-item
        replace
        :to="item.path"
        v-for="(item, index) in tabbar"
        :key="item.name"
        :class="active === index ? 'cs-tabbar-item-active' : ''"
      >
        <span>{{ item.name }}</span>
        <template #icon="props">
          <img :src="props.active ? item.icon_active : item.icon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      tabbar: [
        {
          name: '综合监测',
          path: '/content1',
          icon: require('@/assets/img/tabbar/tab1_inactive.png'),
          icon_active: require('@/assets/img/tabbar/tab1_active.png')
        },
        {
          name: '雷达预警',
          path: '/content2',
          icon: require('@/assets/img/tabbar/tab2_inactive.png'),
          icon_active: require('@/assets/img/tabbar/tab2_active.png')
        }
        // ,{
        //   name: '专项服务',
        //   path: '/content3',
        //   icon: require('@/assets/img/tabbar/tab3_inactive.png'),
        //   icon_active: require('@/assets/img/tabbar/tab3_active.png')
        // }
      ],
      active: 0
    }
  },
  created () {
    // 根据路由位置充值活跃标签active值
    const activeIndex = this.tabbar.findIndex(
      (item) => item.path === this.$route.path
    )
    this.active = activeIndex === -1 ? 0 : activeIndex
  }
}
</script>

<style lang="scss" scoped>
.cs-tabbar {
  background: #222222;
  z-index: 9999;
}
.cs-tabbar::after {
  border-width: 0;
}
.cs-tabbar-item-active {
  background: #222222;
}
</style>
