<template>
  <div class="echo-button primary-shadow" @click="handlePlay" :title="title" :class="{ 'echo-button-active': isPlaying }">
    <!-- 按钮文本 -->
    <span class="echo-button-text">{{ text }}</span>

    <!-- 按钮右边的小黑桃 -->
    <div class="echo-button-active-box">
      <img src="@/assets/icon/spade-white-rotate.png" alt="" class="echo-button-active-img">
    </div>
  </div>
</template>

<script>
import * as api from '@/api'
import bus from '@/api/bus.js'
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
    // 是否处于正在播放的状态
    isPlaying() {
      return this.plays !== 0
    }
  },
  methods: {
    // 播放音频
    handlePlay() {
      const audio = new Audio(this.url)
      this.songMenu.push(audio)
      audio.play()
      this.plays++
      console.log(this.plays)
      bus.$emit('a', 2)
      audio.onended = () => {
        this.plays--
      }
      api.playButton(this.voiceId).catch(err => {
        console.log('[EchoButton]play button failed', err)
      })
    },
    // 暂停音频
    stop() {
      console.log('成功1')
      for (let i = 0; i++; i <= this.songMenu.lenght) {
        this.songMenu[i].pause()
        console.log('成功')
      }
    }
  }
}
</script>

<style>
.echo-button {
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
  transform: rotateX(90deg);
  transition: transform 0.4s;
}
.echo-button-active .echo-button-active-img {
  transform: rotateX(0deg);
}
</style>
