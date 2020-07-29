<template>
  <a
    class="echo-button primary-shadow echo-button-link"
    target="_blank"
    @click="handlePlay"
    :title="title"
    :href="url"
    :class="{ 'echo-button-active': isPlaying }"
  >
    <!-- 按钮文本 -->
    <span class="echo-button-text">{{ text }}</span>
  </a>
</template>

<script>
export default {
  name: 'EchoButtonLink',
  props: {
    text: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.echo-button.echo-button-link {
  padding: 0 22px 0 22px;
}
</style>
