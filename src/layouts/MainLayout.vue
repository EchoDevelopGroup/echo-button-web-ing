<template>
  <!-- 先用一个大概的划一下布局 -->
  <div class="main-layout">
    <!-- 导航栏 -->
    <app-navigator></app-navigator>

    <!-- 页面主要内容 白底的部分 -->
    <div class="main-layout-page-container primary-shadow">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import AppNavigator from '@/components/AppNavigator'

export default {
  name: 'MainLayout',
  components: {
    AppNavigator
  }
}
</script>

<style>
.main-layout-page-container {
  width: 1110px;
  min-height: 600px;
  margin: 15px auto 0;
  border-radius: 12px;
  background-color: #fff;
}
</style>
