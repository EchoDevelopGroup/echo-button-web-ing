<template>
  <div class="button-group primary-shadow">
    <!-- 按钮组底部的“爽了”的表情 -->
    <img src="@/assets/echo-feels-well.png" alt="echo" class="button-group-background">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ButtonGroup'
}
</script>

<style>
.button-group {
  position: relative;
  box-sizing: border-box;
  margin-top: 25px;
  /* 左右减去6px 等于半个两按钮间间距 */
  padding: 16px 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: start;
  background-color: #ffa6c6;
  border-radius: 12px;
  min-height: 122px;
}
.button-group-background {
  position: absolute;
  user-select: none;
  bottom: 0;
  right: 0;
  width: 160px;
  height: auto;
  opacity: 0.3;
}
@media screen and (max-width: 950px) {
  .button-group {
    margin-top: 20px;
    padding: 12px 8px;
  }
}
@media screen and (max-width: 850px) {
  .button-group {
    margin-top: 12px;
    padding: 8px 6px;
  }
}
</style>
