<template>
  <div class="audit">
    <h2>审核</h2>
    <div v-if="!isLogin">
      <div class="audit-login">
        <el-input class="audit-input" v-model="login.username" placeholder="用户名"></el-input>
        <el-input class="audit-input" v-model="login.password" type="password" placeholder="密码"></el-input>
        <el-button class="audit-button" type="primary" @click="handleLogin">登录</el-button>
      </div>
    </div>

    <div v-else>
      <el-select v-model="currentClassification" placeholder="请选择分类">
        <el-option
          v-for="item in list"
          :key="item.button_classification"
          :label="item.button_classification"
          :value="item.button_classification">
        </el-option>
      </el-select>

      <el-table :data="currentList">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="voice_id" label="ID" width="60px">
          <template #default="{ row }">
            <span :title="row.voice_id">{{ row.voice_id.substr(0, 3) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="voice_name" label="语音名称">
          <template #default="{ row }">
            <el-input v-model="row.voice_name" size="small" placeholder="语音名称"></el-input>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="voice_detail" label="语音描述">
          <template #default="{ row }">
            <el-input v-model="row.voice_detail" size="small" placeholder="语音描述"></el-input>
          </template>
        </el-table-column> -->
        <el-table-column prop="voice_name" label="语音名称">
          <template #default="{ row }">
            <el-select
              v-model="row.button_classification"
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章标签">
              <el-option
                v-for="item in list"
                :key="item.button_classification"
                :label="item.button_classification"
                :value="item.button_classification">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="播放" width="80px">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="playButton(row)">播放</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160px">
          <template #default="{ row }">
            <el-button type="success" size="small" @click="passButton(row)">通过</el-button>
            <el-button type="danger" size="small" @click="failButton(row)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import * as api from '@/api'

// “”
export default {
  name: 'Audit',
  data() {
    return {
      isLogin: false,
      currentClassification: '',
      list: [],

      login: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    currentList() {
      const area = this.list.find(it => it.button_classification === this.currentClassification)
      return area ? area.button_list : []
    }
  },
  methods: {
    async handleLogin() {
      try {
        await api.login(this.login.username, this.login.password)
        this.isLogin = true
        await this.fetchData()
      } catch (err) {
        console.error(err)
        this.$message.error('发生错误: ' + err.message)
      }
    },
    // 页面加载时调用 获取所有未审核的按钮
    async fetchData() {
      try {
        // 从后端获取数据
        const list = await api.getUnverifiedList()
        // 给每个按钮加上 button_classification
        const copy = list.map(area => {
          return {
            ...area,
            button_list: area.button_list.map(it => {
              return {
                ...it,
                button_classification: area.button_classification
              }
            })
          }
        })
        this.list = copy
        // 自动选中第一个分类
        if (this.list[0]) {
          this.currentClassification = this.list[0].button_classification
        }
      } catch (err) {
        console.error(err)
        this.$message.error('发生错误，请查看控制台:' + err.message)
      }
    },
    // 播放按钮
    playButton(item) {
      const url = item.voice_url
      const audio = new Audio(url)
      audio.play()
    },
    // 通过
    passButton(item) {
      this.$confirm('你确定这个按钮没问题么？可能会被当成anti哦', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.verifyButton(item, 0)
      }).catch(() => {
        // do nothing
      })
    },
    // 驳回
    failButton(item) {
      this.verifyButton(item, 1)
    },
    // 上传审核结果到服务器
    async verifyButton(item, verifyResult) {
      try {
        await api.verifyButton(item.voice_id, verifyResult, item.voice_name, item.button_classification)
      } catch (err) {
        console.error(err)
        this.$message.error('发生错误，请查看控制台:' + err.message)
      }
    }
  }
}
</script>

<style>
.audit-login {
  width: 400px;
  margin: 0 auto;
}
.audit-input,
.audit-button {
  margin-top: 20px;
}
</style>
