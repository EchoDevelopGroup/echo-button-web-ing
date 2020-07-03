<template>
  <div class="upload-notice">
    <slot>
      <span class="upload-notice-text">{{ content }}</span>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'UploadNotice',
  props: {
    content: {
      type: String,
      default: '上传说明\n  上传说明\n上传说明\n上传说明'
    }
  }
}
</script>

<style>
.upload-notice {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1040px;
  height: 100px;
  padding: 0 20px;
  border-radius: 12px;
  border-bottom-right-radius: 55px;
  background-color: #fa96a3;
  font-size: 19px;
  color: #fff;
  white-space: pre;
  /**
   * 21deg = 180deg - 159deg
   * 0.5px = 5px * 0.2775 * sin(21deg)
   * 1.3px = 5px * 0.2775 * cos(21deg)
   * 7.2px = 26px * 0.2775
   */
  box-shadow: 0.5px 1.3px 7.2px #963a5b5c;
}
.upload-notice-text {
  width: 100%;
  /* 5.2em = 1.3em * 4 */
  height: 5.2em;
  font-size: 16px;
  line-height: 1.3em;
  text-align: left;
}
</style>
