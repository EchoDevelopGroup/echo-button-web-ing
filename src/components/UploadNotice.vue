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
      default: '上传说明'
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
  padding: 20px;
  border-radius: 12px;
  border-bottom-right-radius: 55px;
  background-color: #fa96a3;
  font-size: 19px;
  color: #fff;
}
</style>
