<template>
  <div class="audit">
    <h2>审核页面</h2>
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
</template>

<script>
import * as api from '@/api'

// “你确定这个按钮没问题么？可能会被当成anti哦”
export default {
  name: 'Audit',
  data() {
    return {
      currentClassification: '',
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    currentList() {
      const area = this.list.find(it => it.button_classification === this.currentClassification)
      return area ? area.button_list : []
    }
  },
  methods: {
    // 页面加载时调用 获取所有未审核的按钮
    async fetchData() {
      try {
        const list = await api.getUnverifiedList()
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
      this.verifyButton(item, 0)
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

</style>
