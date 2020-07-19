<template>
  <div class="home">
    <!-- 按钮组 -->
    <button-group
      v-for="(item, i) in buttonGroupList"
      :key="i"
    >
      <!-- 按钮 -->
      <echo-button
        v-for="item in buttonGroupList[i]"
        :key="item.voice_id"
        :text="item.voice_name"
        :url="item.voice_url"
        :is-new="item.new_upload"
      ></echo-button>
    </button-group>

    <!-- 右下角的播放控制器 -->
    <player-control-panel></player-control-panel>

    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div v-for="list in voices" :key="list.button_classification">
      <p>{{ list.button_classification }}</p>
      <div v-for="voice in list.button_list" :key="voice.voice_id">
        <el-button @click="playVoice(voice)">{{ voice.voice_name }}</el-button>
      </div>
    </div>

    <div>
      <p>这是一个超丑的上传界面</p>
      <input type="file" name="" id="" @change="onChooseFile" ref="file">
      <span>语音名称</span> <el-input v-model="form.voiceName" label="语音名称"></el-input>
      <span>语音信息</span> <el-input v-model="form.voiceDetail" label="语音信息"></el-input>
      <span>语音分类</span> <el-input v-model="form.voiceClassification" label="语音分类"></el-input>
      <span>上传用户</span> <el-input v-model="form.uploadUser" label="上传用户"></el-input>
      <el-button @click="upload()">上传</el-button>
    </div> -->
  </div>
</template>

<script>
import ButtonGroup from '@/components/ButtonGroup'
import EchoButton from '@/components/EchoButton'
import PlayerControlPanel from '@/components/PlayerControlPanel'
import { preFetchAudio } from '@/util/audio'
import * as api from '@/api'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    ButtonGroup,
    EchoButton,
    PlayerControlPanel
  },
  data() {
    return {
      /**
       * @type {api.ButtonOverview[]} 所有的桃语音
       */
      voices: [],
      // 每组多少个按钮
      buttonPerGroup: 10,
      form: {
        file: null,
        voiceName: '',
        voiceDetail: '',
        voiceClassification: '',
        uploadUser: ''
      }
    }
  },
  created() {
    // this.getVoices()
  },
  computed: {
    ...mapGetters({
      getButtonListByHash: 'getButtonListByHash'
    }),
    // 当前类别的ID
    classId() {
      return this.$route.params.id
    },

    // 当前页面应该显示的所有按钮
    buttonList() {
      return this.getButtonListByHash(this.classId)
    },

    // 按钮组列表 一组10个按钮
    buttonGroupList() {
      const b = this.buttonPerGroup
      const n = Math.ceil(this.buttonList.length / b)
      return Array(n).fill(null).map((_, i) => this.buttonList.slice(i * b, (i + 1) * b))
    }
  },
  methods: {
    async getVoices() {
      this.voices = await api.getOverview()
      await this.preFetch()
      console.log('load ok')
    },
    /**
     * 预先加载所有的音频
     */
    preFetch() {
      return Promise.all(
        this.voices.map(it => {
          return Promise.all(
            it.button_list.map(async (v) => {
              await preFetchAudio(v.voice_url)
              console.log(v.voice_name, 'load over')
            })
          )
        })
      )
    },
    playVoice(voice) {
      const url = voice.voice_url
      const audio = new Audio(url)
      audio.play()
    },
    onChooseFile(e) {
      const dom = this.$refs.file
      this.form.file = dom.files[0]
      console.log(this.form.file)
    },
    async upload() {
      try {
        await api.uploadButton(this.form.file, this.form.voiceName, this.form.voiceDetail, this.form.voiceClassification, this.form.uploadUser)
        this.$message.success('上传成功')
      } catch (err) {
        this.$message.error(err.message)
        console.error(err)
      }
    }
  }
}
</script>
