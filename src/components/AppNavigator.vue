<template>
  <!-- 整个网站的导航栏 顶部写着网址的那个 -->
  <div class="app-navigator primary-shadow">
    <div class="app-navigator-frame">
      <!-- 桃按钮网站图标 -->
      <a href="" class="app-navigator-logo-link">
        <img src="@/assets/logo-horizontal.png" alt="logo" title="桃按钮" class="app-navigator-logo">
      </a>

      <!-- 录播站按钮 -->
      <a href="https://rec.sepeach.com/" class="app-navigator-link-button primary-shadow">Echo录播存放处</a>

      <!-- 占满水平剩余宽度的占位div -->
      <div class="app-navigator-placeholder"></div>

      <!-- 音量和语言按钮 -->
      <div class="app-navigator-button" @click="handleEditVolume">
        <img src="@/assets/icon/volume.png" alt="音量" class="app-navigator-button-img">
      </div>
      <div class="app-navigator-button" @click="handleEditLanguage">
        <img src="@/assets/icon/language.png" alt="语言" class="app-navigator-button-img">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppNavigator',
  methods: {
    handleEditVolume() {
      this.$alert('请自己调整系统音量', 'echo说', {
        confirmButtonText: '对呀对呀',
        cancelButtonText: '下次一定',
        showCancelButton: true,
        callback: action => {
          // nothing
        }
      })
    },
    handleEditLanguage() {
      this.$alert('等echo不涩的时候多语言功能就有了', 'echo说', {
        confirmButtonText: '对呀对呀',
        cancelButtonText: '下次一定',
        showCancelButton: true,
        callback: action => {
          // nothing
        }
      })
    }
  }
}
</script>

<style>
.app-navigator {
  width: 100%;
  min-width: 1000px;
  height: 50px;
  background-color: #fe76a1;
  background: linear-gradient(to right, #fec2d2, #fe6990);
}
/* 加一层框 宽度等于 1110 + 70 * 2 看起来好看一点 */
.app-navigator-frame {
  box-sizing: border-box;
  width: 1300px;
  height: 100%;
  margin: 0 auto;
  padding: 0 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.app-navigator-logo-link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.app-navigator-logo {
  width: auto;
  height: 40px;
}
.app-navigator-link-button {
  margin-left: 20px;
  padding: 6px 20px;
  border-radius: 6px;
  color: #fe7ba5;
  background-color: #fff;
}
.app-navigator-placeholder {
  flex: 1 0 auto;
  height: 100%;
}
.app-navigator-button {
  display: flex;
  height: 50px;
  width: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.app-navigator-button-img {
  display: block;
  width: auto;
  height: 33px;
}

@media screen and (max-width: 1300px) {
  .app-navigator-frame {
    width: 100%;
  }
}
</style>
