<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div v-for="list in voices" :key="list.button_classification">
      <p>{{ list.button_classification }}</p>
      <div v-for="voice in list.button_list" :key="voice.voice_id">
        <el-button @click="playVoice(voice)">{{ voice.voice_name }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import * as api from '@/api'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      /**
       * @type {api.ButtonOverview[]} 所有的桃语音
       */
      voices: []
    }
  },
  created () {
    this.getVoices()
  },
  methods: {
    async getVoices () {
      this.voices = await api.getOverview()
    },
    /**
     * 预先加载所有的音频
     */
    preFetch () {
      this.voices.map(it => {
      })
    },
    playVoice (voice) {
      const url = voice.voice_url
      const audio = new Audio(url)
      audio.play()
    }
  }
}
</script>
