<template>
  <!-- 按钮导航栏 用于切换页面 -->
  <div class="button-navigator primary-shadow slant-border">
    <ul class="button-navigator-list">
      <!-- 最开头的黑桃 -->
      <li class="button-navigator-item" @click="handleClick(0)">
        <div class="button-navigator-main" @click.stop="handleClick(-1)">
          <router-link to="/">
            <img src="@/assets/icon/spade-white.png" alt="spade" class="button-navigator-spade-img">
          </router-link>
        </div>
      </li>

      <!-- 各个按钮 -->
      <li
        v-for="(item, index) in buttonList"
        :key="index"
        @click="handleClick(index + 1)"
        class="button-navigator-item"
      >
        <div class="button-navigator-main" @click.stop="handleClick(index)">
          <router-link :to="{ name: 'button', params: { id: item.hash } }" class="button-navigator-link">
            <span class="button-navigator-text">{{ item.name }}</span>
            <svg v-if="!isHat" class="button-navigator-triangle left" width="20px" height="10px" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polygon points="0,10 20,10 10,0" />
            </svg>
            <svg v-if="!isHat" class="button-navigator-triangle right" width="20px" height="10px" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polygon points="0,10 20,10 10,0" />
            </svg>
            <div v-if="isHat" class="button-navigator-hat-rotate">
              <img src="@/assets/hat.png" alt="hat" class="button-navigator-hat">
            </div>
          </router-link>
        </div>
      </li>

      <!-- 友情链接 -->
      <li
        class="button-navigator-item"
      >
        <div class="button-navigator-main" @click.stop="handleClick(buttonList.length)">
          <router-link :to="{ name: 'links' }" class="button-navigator-link">
            <span class="button-navigator-text">友情链接</span>
            <svg v-if="!isHat" class="button-navigator-triangle left" width="20px" height="10px" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polygon points="0,10 20,10 10,0" />
            </svg>
            <svg v-if="!isHat" class="button-navigator-triangle right" width="20px" height="10px" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polygon points="0,10 20,10 10,0" />
            </svg>
            <div v-if="isHat" class="button-navigator-hat-rotate">
              <img src="@/assets/hat.png" alt="hat" class="button-navigator-hat">
            </div>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ButtonNavigator',
  props: {
    buttonList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters({
      isHat: 'isHat'
    })
  },
  methods: {
    // 用户点击某一个按钮
    handleClick(index) {
      // 抛出事件 参数是第几个按钮 -1表示点了最前面的黑桃
      this.$emit('click', index)
    }
  }
}
</script>

<style>
.button-navigator {
  /* overflow: hidden; */
  height: 38px;
  /* 最外层剪裁 用于去掉第一个按钮的左侧和最后一个按钮的右侧 */
  /* 参见main.css .slant-border */
}
.button-navigator-list {
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: row;
  list-style: none;
}
.button-navigator-item {
  height: 100%;
  padding-right: 1px;
  cursor: pointer;
}
.button-navigator-main {
  display: flex;
  height: 100%;
  margin-left: -1px;
  padding: 0 28px 0 23px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* 参见main.css .slant-border-right */
  border-bottom-right-radius: 28px; /* 27.735 */
  border-top-right-radius: 4px; /* 4.1925 */
  cursor: pointer;
}
.button-navigator-item:nth-child(1) {
  overflow: hidden;
  /* 参见main.css .slant-border-left */
  border-top-left-radius: 23px; /* 22.8975 */
  border-bottom-left-radius: 8px; /* 7.4125 */
}
.button-navigator-item:nth-child(2n+1) {
  background-color: #fd6e9a;
}
.button-navigator-item:nth-child(2n+1) > .button-navigator-main {
  background-color: #e64e8c;
}
.button-navigator-item:nth-child(2n+1) .button-navigator-triangle {
  fill: #e64e8c;
}
.button-navigator-item:nth-child(2n) {
  background-color: #e64e8c;
}
.button-navigator-item:nth-child(2n) > .button-navigator-main {
  background-color: #fd6e9a;
}
.button-navigator-item:nth-child(2n) .button-navigator-triangle {
  fill: #fd6e9a;
}
.button-navigator-item:last-child {
  background-color: transparent;
  cursor: inherit;
  padding-right: 0;
}
.button-navigator-spade-img {
  width: auto;
  height: 23px;
}
.button-navigator-triangle {
  position: absolute;
  top: -9px;
  transform: scaleY(0.001);
  transform-origin: 50% 100%;
  transition: transform 0.4s cubic-bezier(.5,2.4,.6,.6);
}
.button-navigator-triangle.left {
  left: -10px;
}
.button-navigator-triangle.right {
  right: -10px;
}
.router-link-active .button-navigator-triangle {
  transform: scaleY(1);
}
.button-navigator-hat-rotate {
  position: absolute;
  top: 5px;
  right: -45px;
}
.button-navigator-hat {
  display: block;
  width: 50px;
  height: auto;
  transform: scale(0);
  transition: transform 0.4s;
}
.button-navigator-hat-rotate {
  transform: rotate(180deg);
  transition: transform 0.4s;
}
.router-link-active .button-navigator-hat-rotate {
  transform: rotate(0deg);
}
.router-link-active .button-navigator-hat {
  transform: scale(1) translateY(-45px);
}
.button-navigator-link {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button-navigator-text {
  color: #fff;
}

@media screen and (max-width: 1050px) {
  .button-navigator-main {
    padding: 0 23px 0 18px;
  }
}
@media screen and (max-width: 950px) {
  .button-navigator-main {
    padding: 0 18px 0 13px;
  }
}
@media screen and (max-width: 850px) {
  .button-navigator-main {
    padding: 0 13px 0 8px;
  }
}
</style>
