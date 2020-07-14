<template>
  <li class="upload-notice primary-shadow">
    <div class="upload-notice-text">
      <slot>
        <span>{{ content }}</span>
      </slot>
    </div>
  </li>
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
  text-align: left;
}
.upload-notice-text {
  width: 100%;
  /* 5.2em = 1.3em * 4 */
  height: 5.2em;
  font-size: 16px;
  line-height: 1.3em;
}
</style>
