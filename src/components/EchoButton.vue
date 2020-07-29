<template>
  <div class="echo-button primary-shadow" @click="handlePlay" :title="title" :class="{ 'echo-button-active': isPlaying }">
    <!-- 按钮文本 -->
    <span class="echo-button-text">{{ text }}</span>

    <!-- <img v-if="isNew === 1" src="@/assets/icon/new.png" alt="new" class="echo-button-new"> -->

    <!-- 按钮右边的小黑桃 -->
    <div class="echo-button-active-box">
      <img src="@/assets/icon/spade-white-rotate.png" alt="" class="echo-button-active-img">
    </div>
  </div>
</template>

<script>
import * as api from '@/api'
// import bus from '@/api/bus.js'
import { mapGetters } from 'vuex'

export default {
  name: 'EchoButton',
  props: {
    text: {
      type: String,
      default: ''
    },
    voiceId: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    isNew: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 播放计数器 开始播放+1 结束播放-1
      // 等于0就是没有在播放
      plays: 0,
      songMenu: []
    }
  },
  computed: {
    ...mapGetters({
      playerConfig: 'playerConfig'
    }),
    // 播放控制器
    controller() {
      return this.playerConfig.controller
    },
    // 当前所有的播放任务
    taskList() {
      return this.controller.taskList
    },
    // 是否处于正在播放的状态
    isPlaying() {
      return !!this.taskList.find(it => it.voiceId === this.voiceId)
    }
  },
  methods: {
    // 播放音频
    handlePlay() {
      this.controller.playVoice(this.voiceId)
      api.playButton(this.voiceId).catch(err => {
        console.log('[EchoButton]play button failed', err)
      })
    }
  }
}
</script>

<style>
.echo-button {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  margin: 0 6px;
  padding: 0 8px 0 22px;
  border-radius: 15px;
  background-color: #fd507e;
  transition: background-color 0.4s;
  cursor: pointer;
}
.echo-button-new {
  position: absolute;
  display: block;
  top: -20px;
  left: -15px;
  width: 40px;
  height: auto;
}
.echo-button-text {
  color: #fff;
  font-weight: bold;
}
.echo-button:hover,
.echo-button-active {
  background-color: #d62986;
}
.echo-button-active-box {
  display: flex;
  justify-self: center;
  align-items: center;
}
.echo-button-active-img {
  display: block;
  width: 16px;
  height: auto;
  margin-left: 5px;
}

/* 动画效果 */
.echo-button-active-img {
  transform: rotateX(90.1deg);
  transition: transform 0.4s;
}
.echo-button-active .echo-button-active-img {
  transform: rotateX(0deg);
}
</style>
