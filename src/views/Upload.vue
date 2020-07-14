<template>
  <div class="upload">
    <!-- 页面顶部的公告 -->
    <upload-notice>
      <p>欢迎使用桃按钮(｀・ω・´)</p>
    </upload-notice>

    <ul class="upload-list">
      <upload-card
        v-for="(item, index) in classes"
        :key="index"
        :title="item"
        class="upload-list-item"
      />
    </ul>
  </div>
</template>

<script>
import UploadNotice from '@/components/UploadNotice'
import UploadCard from '@/components/UploadCard'

export default {
  name: 'Upload',
  components: {
    UploadNotice,
    UploadCard
  },
  data() {
    return {
      classes: [
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
.upload-list {
  /* -10是让这个框水平向外左右各拉伸10px 用于抵消最左边按钮左侧的10px边距和最右侧按钮右侧的10px边距 */
  margin: 0 -10px;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
}
.upload-list-item {
  margin: 10px;
}
</style>
