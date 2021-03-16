<template>
  <div class="fixed-bottom cs-layer-timeline">
    <div class="flex justify-center align-center mt-1 timeline-control" v-if="startTime !== null">
      <van-image width="22" height="22" v-if="!isplay" :src="playIcon" @click="play" />
      <van-image width="22" height="22" v-if="isplay" :src="stopIcon" @click="stop" />
      <van-image width="22" height="22" class="ml-h" :src="resetIcon" @click="reset" />
      <div class="ml-5 mr-5 position-relative bg-white font-small timeline-bar">
        <div class="position-absolute timeSta">
          {{ startTime | formatTimestamp("hh:mm") }}
        </div>
        <div class="position-absolute bar" :style="{
            left: ((curTime - startTime) / stepTime) * (200 / (timeLength-1)) + 'px',
          }">
          <p class="position-absolute">
            {{ curTime | formatTimestamp("hh:mm") }}
          </p>
        </div>
        <div class="position-absolute timeEnd">
          {{ endTime | formatTimestamp("hh:mm") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTimestamp } from '@/utils/datetimeUtils'

export default {
  name: 'LayerTimeline',
  props: {
    isContent: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      playIcon: require('@/assets/img/layerTimeline/play.png'),
      stopIcon: require('@/assets/img/layerTimeline/stop.png'),
      resetIcon: require('@/assets/img/layerTimeline/reset.png'),
      isplay: false,

      startTime: null, // 开始时间
      endTime: null, // 结束时间
      curTime: null, // 当前时间
      stepTime: 60 * 60 * 1000, // 播放步长 60分钟
      timeInterval: null,

      timeArr: [],
      timeLength: 24
    }
  },
  created() {
    this.reset()
  },
  filters: {
    formatTimestamp
  },
  methods: {
    // 播放
    play() {
      if (!this.isplay && this.timeInterval === null) {
        this.timeInterval = setInterval(() => {
          this.isplay = true
          if (this.curTime >= this.endTime) {
            this.curTime = this.startTime
            this.stop()
          } else {
            this.curTime += this.stepTime
          }
          this.$emit('getCurTime', [this.curTime, this.timeArr])
        }, 2000)
      }
    },
    // 暂停
    stop() {
      this.timeInterval !== null && clearInterval(this.timeInterval)
      this.timeInterval = null
      this.isplay = false
    },
    // 初始化
    reset() {
      const currentTime = new Date().getTime()
      if (this.isContent === 'content1') {
        this.timeLength = 24
        this.endTime = parseInt(currentTime / this.stepTime) * this.stepTime
        this.startTime = this.endTime - 23 * this.stepTime
        this.curTime = this.startTime
        for (let i = 0; i < this.timeLength; i++) {
          this.timeArr.push(formatTimestamp(this.startTime + i * this.stepTime, 'yyyy-MM-ddThh:00:00'))
        }
      }
      if (this.isContent === 'content2') {
        this.timeLength = 2
        this.startTime = parseInt(currentTime / this.stepTime) * this.stepTime + this.stepTime
        this.endTime = this.startTime + 1 * this.stepTime
        this.curTime = this.startTime
        for (let i = 0; i < this.timeLength; i++) {
          this.timeArr.push(formatTimestamp(this.startTime + i * this.stepTime, 'yyyy-MM-ddThh:00:00'))
        }
      }
      this.$emit('getCurTime', [this.curTime, this.timeArr])
      this.stop()
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
