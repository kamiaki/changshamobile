<template>
  <div class="fixed-bottom cs-layer-timeline">
    <div
      class="flex justify-center align-center mt-1 timeline-control"
      v-if="startTime !== null"
    >
      <van-image
        width="22"
        height="22"
        v-if="!isplay"
        :src="playIcon"
        @click="play"
      />
      <van-image
        width="22"
        height="22"
        v-if="isplay"
        :src="stopIcon"
        @click="stop"
      />
      <van-image
        width="22"
        height="22"
        class="ml-h"
        :src="resetIcon"
        @click="reset"
      />
      <div class="ml-5 mr-5 position-relative bg-white font-small timeline-bar">
        <div class="position-absolute timeSta">
          {{ startTime | formateTime }}
        </div>
        <div
          class="position-absolute bar"
          :style="{ left: ((curTime - startTime) / stepTime) * 10 + 'px' }"
        >
          <p class="position-absolute">{{ curTime | formateTime }}</p>
        </div>
        <div class="position-absolute timeEnd">
          {{ endTime | formateTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTimestamp } from '@/utils/datetimeUtils'

export default {
  name: 'LayerTimeline',
  data () {
    return {
      playIcon: require('@/assets/img/layerTimeline/play.png'),
      stopIcon: require('@/assets/img/layerTimeline/stop.png'),
      resetIcon: require('@/assets/img/layerTimeline/reset.png'),
      isplay: false,

      startTime: null, // 开始时间
      endTime: null, // 结束时间
      curTime: null, // 当前时间
      stepTime: 6 * 60 * 1000, // 播放步长 6分钟
      timeInterval: null
    }
  },
  created () {
    this.reset()
  },
  filters: {
    formateTime (val) {
      return formatTimestamp(val, 'hh:mm')
    }
  },
  methods: {
    // 播放
    play () {
      if (!this.isplay && this.timeInterval === null) {
        this.timeInterval = setInterval(() => {
          this.isplay = true
          if (this.curTime >= this.endTime) {
            this.curTime = this.startTime
          } else {
            this.curTime += this.stepTime
          }
          this.$emit('getCurTime', this.curTime)
        }, 2000)
      }
    },
    // 暂停
    stop () {
      this.timeInterval !== null && clearInterval(this.timeInterval)
      this.timeInterval = null
      this.isplay = false
    },
    // 初始化
    reset () {
      let currentTime = new Date().getTime()
      currentTime = this.getValidatedTime(currentTime)
      this.endTime = currentTime
      this.startTime = currentTime - 20 * this.stepTime
      this.curTime = this.startTime
      this.stop()
    },
    // 获取 :00 :06 :12...:54 格式的时间
    getValidatedTime (num) {
      const sixSecondsNum = parseInt(num / this.stepTime)
      return sixSecondsNum * this.stepTime
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
      transform: translateX(-1px);
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
