<template>
  <!-- 桃按钮和上传页面采用的布局 -->
  <div class="button-layout">
    <div class="navigator">
      <button-navigator :button-list="buttons"></button-navigator>
      <div style="height: 20px; width: 30px"></div>
      <button>上传</button>
      <button>审核</button>
    </div>
    <div class="main-container">
      <slot>
        <router-view></router-view>
      </slot>
    </div>
  </div>
</template>

<script>
import ButtonNavigator from '@/components/ButtonNavigator'

export default {
  name: 'ButtonLayout',
  components: {
    ButtonNavigator
  },
  data() {
    return {
      buttons: [
        '镇站之宝',
        '软桃',
        '通用',
        'HSO',
        '怪叫'
      ]
    }
  }
}
</script>

<style>
.button-layout {
  padding: 30px 40px;
}
</style>

<style scoped>
.navigator {
  display: flex;
  flex-direction: row;
}
.button-list {
  margin: 0;
  padding: 0;
  flex: 1;
  list-style: none;
  display: flex;
}
.button-list li {
  padding: 10px;
  background-color: #e64e8c;
}
.button-list li:nth-child(2n) {
  background-color: #fd6e9a;
}
.main-container {
  margin-top: 25px;
}
</style>
