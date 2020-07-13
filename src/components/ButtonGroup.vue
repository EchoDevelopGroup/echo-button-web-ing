<template>
  <div class="button-group primary-shadow">
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
</style>
