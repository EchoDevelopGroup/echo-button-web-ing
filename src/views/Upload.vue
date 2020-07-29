<template>
  <div class="upload">
    <!-- 页面顶部的公告 -->
    <upload-notice>
      <p>欢迎使用桃按钮(｀・ω・´)</p>
      <p>如需新分类，请联系我们，联系方式见网页下方的关于。</p>
    </upload-notice>

    <ul class="upload-list">
      <upload-card
        v-for="item in classList"
        :key="item.hash"
        :title="item.name"
        class="upload-list-item"
        @choose="handleChooseFile(item, $event)"
      />
    </ul>

    <el-table :data="uploadList" class="upload-table">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="按钮名">
        <template #default="{ row }">
          <el-input v-model="row.name" size="small" :placeholder="row.file.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="按钮描述">
        <template #default="{ row }">
          <el-input v-model="row.detail" size="small" placeholder="请留空"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="classification" label="分类" width="160px"></el-table-column>
      <el-table-column label="进度" width="80px">
        <template #default="{ row }">
          <span v-if="row.status === 'ready'"></span>
          <i v-else-if="row.status === 'success'" class="upload-status el-icon-check" style="color: #67c23a"></i>
          <i v-else-if="row.status === 'failed'" class="upload-status el-icon-close" style="color: #f56c6c" :title="row.reason"></i>
          <i v-else-if="row.status === 'pending'" class="upload-status el-icon-loading" style="color: #fd6e9a"></i>
        </template>
      </el-table-column>
    </el-table>

    <div class="upload-actions">
      <el-input v-model="nickname" placeholder="您的尊姓大名"></el-input>
      <el-button class="upload-actions-button" type="primary" @click="upload" :disabled="isUploading">{{ hasFailed ? '重试' : '上传'}}</el-button>
      <p class="upload-tips" v-if="hasFailed">部分文件上传失败，将鼠标移动至"X"上查看错误原因，点击"重试"将重试未成功的任务</p>
    </div>
  </div>
</template>

<script>
import UploadNotice from '@/components/UploadNotice'
import UploadCard from '@/components/UploadCard'
import { mapGetters } from 'vuex'
import { sha1 } from '../util/sha1'
import * as api from '@/api'

/**
 * @typedef UploadItem
 * @property {string} name 语音名称
 * @property {string} detail 语音信息
 * @property {string} classification 语音分类
 * @property {File} file 要上传的文件
 * @property {'success'|'failed'|'ready'|'pending'} status 上传状态
 * @property {number} process 上传进度
 * @property {string} reason 错误原因
 */

/**
 * 移除文件名末尾的扩展名
 * @param {string} fileName 文件名
 */
function removeExt(fileName) {
  const pos = fileName.lastIndexOf('.')
  if (pos > 0) {
    return fileName.substr(0, pos)
  }
  return fileName
}

export default {
  name: 'Upload',
  components: {
    UploadNotice,
    UploadCard
  },
  data() {
    return {
      /**
       * @type {UploadItem[]} uploadList 要上传的列表
       */
      uploadList: [],

      // 是否正在上传 true的时候 用户点上传也不响应
      isUploading: false,

      // 用户昵称
      nickname: '',

      // 当有一部分文件上传失败的时候为真 重新上传的时候再次置为假
      hasFailed: false
    }
  },
  computed: {
    ...mapGetters({
      buttonClassificationList: 'buttonClassificationList'
    }),

    // 所有分类的列表 name是分类中文名 hash是sha1前8位
    classList() {
      return this.buttonClassificationList.map(it => {
        return {
          name: it,
          hash: sha1(it)
        }
      })
    }
  },
  methods: {
    // 用户把一个文件拖了进来 或在对话框中选择了一个文件
    async handleChooseFile({ name, hash }, file) {
      this.uploadList.push({
        name: removeExt(file.name),
        detail: '',
        classification: name,
        file: file,
        status: 'ready',
        process: 0
      })
    },
    async upload() {
      if (this.isUploading) {
        return
      }
      this.hasFailed = false

      this.isUploading = true

      const n = this.uploadList.length
      for (let i = 0; i < n; i++) {
        /**
         * @type {UploadItem} task
         */
        const task = this.uploadList[i]

        if (task.status === 'failed' || task.status === 'ready') {
          task.status = 'pending'
          try {
            await api.uploadButton(task.file, task.name, task.detail, task.classification, this.nickname)
            task.status = 'success'
          } catch (err) {
            task.status = 'failed'
            console.log(err)
            task.reason = err.message
            this.hasFailed = true
          }
        }
      }

      this.isUploading = false
    }
  }
}
</script>

<style>
.upload-list {
  /* -10是让这个框水平向外左右各拉伸10px 用于抵消最左边按钮左侧的10px边距和最右侧按钮右侧的10px边距 */
  margin: 20px -10px 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
}
.upload-list-item {
  margin: 10px;
}
.upload-table {
  margin-top: 20px;
}
.upload-actions {
  margin: 20px auto;
  width: 600px;
}
.upload-actions-button {
  margin-top: 20px;
}
.upload-status {
  font-weight: bold;
  font-size: 2em;
}
.upload-tips {
  font-size: 14px;
  color: #f56c6c;
}
</style>
