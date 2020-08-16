<template>
  <a
    class="round-button primary-shadow"
    :style="{ backgroundColor }"
    :title="alt"
    :href="href"
    @click.prevent="handleClick()"
  >
    <!-- 根据which选择其中一张图片显示 -->
    <img :src="url" :alt="alt" class="round-button-img" :style="{ height: `${height}px` }">
  </a>
</template>

<script>
import uploadPng from '@/assets/icon/upload.png'
import cavePng from '@/assets/icon/cave.png'
import auditPng from '@/assets/icon/audit.png'
import { mapGetters } from 'vuex'

const icons = [
  {
    name: 'upload',
    url: uploadPng,
    height: 27,
    backgroundColor: '#e54bb0'
  },
  {
    name: 'cave',
    url: cavePng,
    height: 44,
    backgroundColor: '#fd507e'
  },
  {
    name: 'audit',
    url: auditPng,
    height: 14,
    backgroundColor: '#fd507e'
  }
]

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
        return icons.map(it => it.name).includes(v)
      },
      default: 'upload'
    },
    alt: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      clientWidth: 'clientWidth'
    }),
    // 当前选择的那个icon的各种属性
    current() {
      return icons.find(it => it.name === this.which) || icons[0]
    },
    // 背景色 上传和审核按钮颜色不一样
    backgroundColor() {
      return this.current.backgroundColor
    },
    // 图标高度
    height() {
      return this.clientWidth > 600 ? this.current.height : this.current.height * 0.6
    },
    // 图标图片路径
    url() {
      return this.current.url
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
}
@media screen and (max-width: 600px) {
  .round-button {
    width: 30px;
    height: 30px;
  }
}
</style>
