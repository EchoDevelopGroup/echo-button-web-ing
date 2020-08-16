<template>
  <div class="cave">
    <h2>桃树洞</h2>
    <el-input
      type="textarea"
      :rows="10"
      placeholder="把你想说的话都写下来吧"
      v-model="text">
    </el-input>

    <div class="cave-action-line">
      <el-checkbox v-model="publicCondemn">愿意公开处刑</el-checkbox>
    </div>

    <div class="cave-action-line">
      <el-button type="primary" icon="el-icon-s-promotion" @click="handleSend()">发送</el-button>
    </div>
  </div>
</template>

<script>
import { makeLocalStorage } from '@/util/storage'
import * as api from '@/api'

const localText = makeLocalStorage('echo_button_cave_text')

export default {
  name: 'Cave',
  data() {
    return {
      text: '',
      publicCondemn: false
    }
  },
  watch: {
    text() {
      // 每次用户输入的时候 就把当前的文本存到本地存储
      localText.set({
        text: this.text,
        version: 1
      })
    }
  },
  created() {
    // 读取本地存储
    const text = localText.get()
    if (text && text.version === 1) {
      this.text = text.text
    }
  },
  methods: {
    // 当用户点击发送按钮
    async handleSend() {
      try {
        api.uploadCave(this.text, this.publicCondemn ? 1 : 0)
        this.$message.success('发送成功！')
      } catch (err) {
        this.$message.error(err.message)
      }
    }
  }
}
</script>

<style>
.cave-action-line {
  margin-top: 12px;
}
</style>
