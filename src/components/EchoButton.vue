<template>
  <div class="echo-button primary-shadow" @click="handlePlay">
    <!-- 按钮文本 -->
    <span class="echo-button-text">{{ text }}</span>

    <!-- 按钮右边的小黑桃 -->
    <div class="echo-button-active-box">
      <img src="@/assets/icon/spade-white-rotate.png" alt="" class="echo-button-active-img">
    </div>
  </div>
</template>

<script>
export default {
  name: 'EchoButton',
  props: {
    text: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      required: true
    }
  },
  // data() {
  //   return {
  //     audio: new Audio(this.url)
  //   }
  // },
  methods: {
    handlePlay() {
      const audio = new Audio(this.url)
      audio.play()
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
.echo-button:hover {
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
.echo-button:active .echo-button-active-img {
  transform: rotateX(0deg);
}
</style>
