<template>
  <a
    class="round-button primary-shadow"
    :style="{ backgroundColor }"
    :title="alt"
    :href="href"
    @click.prevent="handleClick()"
  >
    <!-- 根据which选择其中一张图片显示 -->
    <img v-if="which === 'upload'" src="@/assets/icon/upload.png" :alt="alt" class="round-button-img" :style="{ height }">
    <img v-else src="@/assets/icon/audit.png" :alt="alt" class="round-button-img" :style="{ height }">
  </a>
</template>

<script>
export default {
  name: 'RoundButton',
  props: {
    href: {
      type: String,
      default: '/'
    },
    which: {
      type: String,
      validator(v) {
        return v === 'upload' || v === 'audit' || v === 'cave'
      },
      default: 'upload'
    },
    alt: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 背景色 上传和审核按钮颜色不一样
    backgroundColor() {
      return this.which === 'upload' ? '#e54bb0' : '#fd507e'
    },
    // 图标高度
    height() {
      return this.which === 'upload' ? '27px' : '14px'
    }
  },
  methods: {
    // 用户点击这个按钮的时候
    handleClick() {
      this.$emit('click', this.which)
    }
  }
}
</script>

<style>
.round-button {
  box-sizing: border-box;
  display: flex;
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
}
.round-button-img {
  width: auto;
  height: 27px;
}
</style>
