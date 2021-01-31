<template>
  <div class="fixed-top cs-control-btns">
    <van-button
      type="info"
      size="small"
      class="cs-button"
      :plain="!showMap2d"
      @click="handleClick(true)"
    >
      地图
    </van-button>
    <van-button
      type="info"
      size="small"
      :plain="showMap2d"
      class="cs-button"
      @click="handleClick(false)"
    >
      三维
    </van-button>
  </div>
</template>

<script>
export default {
  name: 'mapTabs',
  props: {
    showMap2d: Boolean,
    default () {
      return true
    }
  },
  methods: {
    handleClick (boolean) {
      this.$emit('sendMap2d', boolean)
    }
  }
}
</script>

<style lang="scss" scoped>
.cs-control-btns {
  left: 10px;
  top: 10px;
  .cs-button {
    padding: 0 15px;
    border: 0;
    border-radius: 0;
  }
}
</style>
