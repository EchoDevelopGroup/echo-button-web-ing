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
        <div class="about-text">
          <p>关于重构按钮站相关事宜</p>
          <p>目前我组在重构按钮站 完全不同于当前站的样式和体验 重构了前端vue 以及开发了新的后端 功能很强大 届时还可以上传音源 会有更好的体验 敬请期待！如有相关问题请进群：1131913495</p>
          <br>
          <p>Speach Echo野生开发组</p>
          <p>（当前线上版本维护者）</p>
          <p>网站运维：ShenYun 疯狂的小智</p>
          <p>音频剪辑：洗衣机Official 扶他小M 错恒所次</p>
          <br>
          <p>(新版本开发中的组员)</p>
          <p>吉祥物：柚子不幼</p>
          <p>摸鱼打杂：ShenYun</p>
          <p>前端：FinnTenzor 疯狂的小智 惠惠 芦花鸡</p>
          <p>神龙后端：寻_風</p>
          <p>UI绘制：芦花鸡 洗衣机Official</p>
          <br>
          <p>寶貝仓库</p>
          <p>音源剪辑：思寻罢 心情链环</p>
          <br>
          <p>捕桃事务所</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="aboutVisible = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import AppNavigator from '@/components/AppNavigator'

export default {
  name: 'MainLayout',
  components: {
    AppNavigator
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
</style>
