<template>
  <div class="upload-button primary-shadow">
    <img src="@/assets/icon/upload.png" alt="upload" class="upload-button-img">
  </div>
</template>

<script>
export default {
  name: 'UploadButton'
}
</script>

<style>
.upload-button {
  box-sizing: border-box;
  display: flex;
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #e54bb0;
}
.upload-button-img {
  width: auto;
  height: 27px;
}
</style>
