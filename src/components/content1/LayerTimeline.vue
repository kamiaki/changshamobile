<template>
  <div class="fixed-bottom cs-layer-timeline">
    <div class="flex justify-center align-center mt-1 timeline-control">
      <van-image width="22" height="22" v-if="isplay" :src="playIcon" />
      <van-image width="22" height="22" v-if="!isplay" :src="stopIcon" />
      <van-image width="22" height="22" class="ml-h" :src="resetIcon" />
      <div class="ml-5 mr-5 position-relative bg-white font-small timeline-bar">
        <div class="position-absolute timeSta">08:48</div>
        <div class="position-absolute bar" style="left: 20px">
          <p class="position-absolute">09:18</p>
        </div>
        <div class="position-absolute timeEnd">10:42</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayerTimeline',
  data () {
    return {
      playIcon: require('@/assets/img/layerTimeline/play.png'),
      stopIcon: require('@/assets/img/layerTimeline/stop.png'),
      resetIcon: require('@/assets/img/layerTimeline/reset.png'),
      isplay: true
    }
  }
}
</script>

<style lang="scss" scoped>
.cs-layer-timeline {
  bottom: 50px;
  left: 0;
  right: 0;
  height: 55px;
  background: rgba(255, 255, 255, 0.8);
  .timeline-bar {
    width: 200px;
    height: 5px;
    .timeSta {
      left: -40px;
      top: -5px;
    }
    .timeEnd {
      right: -40px;
      top: -5px;
    }
    .bar {
      width: 3px;
      height: 5px;
      background-color: #369;
      top: 0;
      left: 0;
      cursor: pointer;
      font-weight: 700;
      p {
        width: 67px;
        text-align: center;
        left: -30px;
        top: 13px;
        line-height: 15px;
        color: #000;
      }
    }
  }
}
</style>
