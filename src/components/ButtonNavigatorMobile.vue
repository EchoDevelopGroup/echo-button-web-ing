<template>
  <div class="button-navigator-mobile">
    <!-- 上部的选择框 -->
    <div class="button-navigator-mobile-selector primary-shadow slant-border" @click="showList = !showList">
      <div class="button-navigator-mobile-select-area">
        <img src="@/assets/icon/spade-white.png" alt="spade" class="button-navigator-mobile-spade-img">
      </div>
      <div class="button-navigator-mobile-pop-area">
        <img
          :class="{ 'button-navigator-mobile-selector-arrow-active': showList }"
          src="@/assets/icon/selector-arrow.png"
          alt="arrow"
          class="button-navigator-mobile-selector-arrow"
        >
      </div>
    </div>

    <!-- 下部的弹出菜单 -->
    <div :class="{ 'button-navigator-mobile-list-active': showList}" class="button-navigator-mobile-list primary-shadow">
      <ul class="button-navigator-mobile-ul">
        <li v-for="(item, index) in buttonList" :key="item.hash" class="button-navigator-mobile-item">
          <div class="button-navigator-mobile-clickable" @click="handleClick(index)">
            <router-link :to="{ name: 'button', params: { id: item.hash } }" class="button-navigator-mobile-link">{{ item.name }}</router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonNavigatorMobile',
  props: {
    buttonList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 是否显示弹出的列表
      showList: false
    }
  },
  methods: {
    // 用户点击某一个按钮
    handleClick(index) {
      // 抛出事件 参数是第几个按钮 -1表示点了最前面的黑桃
      this.$emit('click', index)
      // 点击后收回菜单
      this.showList = false
    }
  }
}
</script>

<style>
.button-navigator-mobile {
  position: relative;
}
.button-navigator-mobile-selector {
  position: relative;
  z-index: 100;
  background-color: #e64e8c;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.button-navigator-mobile-select-area {
  box-sizing: border-box;
  margin: 5px 0 5px 12px;
  padding-right: 8px;
  width: 210px;
  height: 18px;
  border-right: 2px solid #fff;
  text-align: center;
}
.button-navigator-mobile-pop-area {
  width: 42px;
  text-align: center;
}
.button-navigator-mobile-spade-img {
  height: 18px;
  width: auto;
  user-select: none;
}
.button-navigator-mobile-selector-arrow {
  height: 9px;
  width: auto;
  user-select: none;
  transition: transform 0.4s;
}
.button-navigator-mobile-selector-arrow-active {
  transform: rotate(180deg);
}
.button-navigator-mobile-list {
  position: absolute;
  z-index: 99;
  top: 28px;
  left: 12px;
  width: 200px;
  background-color: #fd6e9a;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  transform-origin: 50% 0%;
  transform: scaleY(0);
  transition: transform 0.4s;
}
.button-navigator-mobile-list-active {
  transform: scaleY(1);
}
.button-navigator-mobile-ul,
.button-navigator-mobile-item {
  list-style: none;
  margin: 0;
  padding: 0;
}
.button-navigator-mobile-clickable {
  box-sizing: border-box;
  height: 22px;
  margin: 0 8px;
  /* 这里按设计图应该是5px 但是考虑文本本身内部有空白 这里适当缩小了 */
  padding: 2px 0;
  border-top: 1px solid #fbb4c9;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
}
.button-navigator-mobile-link {
  color: #fff;
}
.button-navigator-mobile-item:first-child .button-navigator-mobile-clickable {
  border-top: none;
}
</style>
