<template>
  <!-- 先用一个大概的划一下布局 -->
  <div class="main-layout">
    <!-- 导航栏 -->
    <div class="navigator">

    </div>

    <!-- 页面主要内容 白底的部分 -->
    <div class="page-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>

<style>
/* .main-layout {

} */
</style>

<style scoped>
.navigator {
  width: 100%;
  height: 50px;
  background-color: #fe709c;
}
.page-container {
  width: 1110px;
  min-height: 600px;
  margin: 15px auto 0;
  border-radius: 12px;
  background-color: #fff;
}
</style>
