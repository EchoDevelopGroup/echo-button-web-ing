<template>
  <!-- 先用一个大概的划一下布局 -->
  <div class="main-layout">
    <!-- 导航栏 -->
    <app-navigator></app-navigator>

    <!-- 页面主要内容 白底的部分 -->
    <div class="main-layout-page-container primary-shadow">
      <slot></slot>
    </div>

    <div class="app-footer">
      <a class="app-footer-link" href="javascript:;" @click="aboutVisible = true">关于及贡献人员</a>
      <p class="app-footer-text">本站为echo粉丝作品，与echo本人及hololive官方没有关联！</p>
      <p class="app-footer-text">Echo Button Production Committee 2019-2020.</p>

      <el-dialog
        title="关于"
        :visible.sync="aboutVisible"
        width="50%">
        <about-content class="about-text"></about-content>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="aboutVisible = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import AppNavigator from '@/components/AppNavigator'
import AboutContent from '@/components/AboutContent'

export default {
  name: 'MainLayout',
  components: {
    AppNavigator,
    AboutContent
  },
  data() {
    return {
      aboutVisible: false
    }
  }
}
</script>

<style>
.main-layout-page-container {
  width: 1110px;
  min-height: 600px;
  margin: 15px auto;
  border-radius: 12px;
  background-color: #fff;
}
.app-footer {
  box-sizing: border-box;
  min-width: 1000px;
  padding: 12px 0;
  background-color: #ffa6c6;
  font-size: 14px;
}
.app-footer-link {
  color: #2c3e50;
  font-weight: bold;
}
.app-footer-text {
  margin: 12px 0 0;
}
.about-text {
  white-space: pre-wrap;
  text-align: center;
  line-height: 1.1em;
}
.about-text p {
  margin: 4px 0;
}

@media screen and (max-width: 1110px) {
  .main-layout-page-container {
    width: 100%;
    min-width: 1000px;
  }
}
</style>
