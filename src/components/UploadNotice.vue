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
      default: ''
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
  padding: 0 20px;
  border-radius: 12px;
  border-bottom-right-radius: 55px;
  background-color: #fa96a3;
  font-size: 19px;
  color: #fff;
  text-align: left;
  word-break: break-all;
}
.upload-notice-text {
  width: 100%;
  /* 5.2em = 1.3em * 4 */
  font-size: 16px;
  line-height: 1.3em;
}
</style>
