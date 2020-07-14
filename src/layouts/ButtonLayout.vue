<template>
  <!-- 桃按钮和上传页面采用的布局 -->
  <div class="button-layout">
    <div class="button-layout-navigator">
      <!-- 左侧的按钮组列表 导航组 -->
      <button-navigator :button-list="buttons"></button-navigator>
      <div class="button-layout-navigator-placeholder"></div>

      <!-- 上传和审核按钮 -->
      <router-link to="/upload" class="button-layout-navigator-button" v-slot="{ href, navigate }">
        <round-button :href="href" which="upload" @click="navigate"></round-button>
      </router-link>
      <router-link to="/" class="button-layout-navigator-button" v-slot="{ href, navigate }">
        <round-button :href="href" which="audit" @click="navigate"></round-button>
      </router-link>
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
import RoundButton from '@/components/RoundButton'

export default {
  name: 'ButtonLayout',
  components: {
    ButtonNavigator,
    RoundButton
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
.button-layout-navigator {
  display: flex;
  align-items: center;
}
.button-layout-navigator-placeholder {
  flex: 1 0 auto;
}
.button-layout-navigator-button {
  margin-left: 15px;
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
