<template>
  <div class="upload-card">
    <div
      class="upload-card-box"
      @click="uploadClick"
      @drop.prevent="uploadDrop"
      @dragover.prevent
      @dragleave.prevent
    >
      <img src="@/assets/upload-icon.png" alt="">
      <span class="upload-card-title">{{ title }}</span>
      <input
        ref="upload"
        class="upload-card-file"
        type="file"
        name="file"
        @change="uploadSubmit"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadCard',
  props: {
    title: {
      type: String,
      default: '镇站之宝'
    }
  },
  methods: {
    // 用户点击虚线区时触发
    uploadClick() {
      this.$refs.upload.click()
    },
    // 通过点击的方式选择文件 好像已经没用了
    uploadSubmit() {
      const files = this.$refs.upload.files
      this.emitChooseFiles(files[0])
    },
    // 通过拖拽的方式选择文件
    uploadDrop(evt) {
      const files = evt.dataTransfer.files
      this.emitChooseFiles(files[0])
    },
    // 抛出选择文件事件
    emitChooseFiles(file) {
      // 抛出事件
      this.$emit('choose', file)

      // 清空值，防止下次选择同一文件时失败
      this.$refs.upload.value = ''
    }
  }
}
</script>

<style>
.upload-card {
  box-sizing: border-box;
  width: 330px;
  height: 210px;
  padding: 15px;
  border-radius: 15px;
  background-color: #ffa6c6;
  /**
   * 21deg = 180deg - 159deg
   * 0.5px = 5px * 0.2775 * sin(21deg)
   * 1.3px = 5px * 0.2775 * cos(21deg)
   * 7.2px = 26px * 0.2775
   */
  box-shadow: 0.5px 1.3px 7.2px #963a5b5c;
}
.upload-card-box {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 18px solid #fff;
  border-image: url('~@/assets/upload-border.png') 18 round;
  border-radius: 15px;
  cursor: pointer;
}
.upload-card-title {
  margin-top: 10px;
  color: #fff;
  font-size: 19px;
}
.upload-card-file {
  display: none;
}
</style>
