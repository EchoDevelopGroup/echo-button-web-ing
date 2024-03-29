<template>
  <div class="home">
    <!-- 按钮组 -->
    <button-group
      v-for="(item, i) in displayButtonGroupList"
      :key="i"
    >
      <!-- 按钮 -->
      <echo-button
        v-for="item in displayButtonGroupList[i]"
        :key="item.voice_id"
        :text="item.voice_name"
        :title="item.voice_detail"
        :voice-id="item.voice_id"
        :url="item.voice_url"
        :is-new="item.new_upload"
      ></echo-button>
    </button-group>

    <!-- 右下角的播放控制器 -->
    <player-control-panel></player-control-panel>
  </div>
</template>

<script>
import ButtonGroup from '@/components/ButtonGroup'
import EchoButton from '@/components/EchoButton'
import PlayerControlPanel from '@/components/PlayerControlPanel'
import { preFetchAudio } from '@/util/audio'
import { mapGetters, mapMutations } from 'vuex'

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
  computed: {
    ...mapGetters({
      getButtonListByHash: 'getButtonListByHash',
      // 当前类别的ID (正在显示的 跟URL相比有延迟)
      displayClassId: 'displayClassId'
    }),

    // 当前类别的ID
    classId() {
      return this.$route.params.id
    },

    // 当前页面应该显示的所有按钮
    displayButtonList() {
      return this.getButtonListByHash(this.displayClassId)
    },

    // 按钮组列表 一组10个按钮
    displayButtonGroupList() {
      const b = this.buttonPerGroup
      const n = Math.ceil(this.displayButtonList.length / b)
      return Array(n).fill(null).map((_, i) => this.displayButtonList.slice(i * b, (i + 1) * b))
    },

    // 当前URL对应的那些按钮
    readyButtonList() {
      return this.getButtonListByHash(this.classId)
    },

    // 要预加载的那些按钮
    buttonToLoad() {
      return this.readyButtonList.slice(0, this.buttonPerGroup)
    }
  },
  watch: {
    // 当用户切页面的时候(刚开始动画) 预加载目标页面的前10个按钮
    classId(val) {
      if (val !== '') {
        this.preFetchCurrent().then(err => {
          console.error('[EchoButton] cant not pre load audio', err)
        })
      }
    }
  },
  methods: {
    ...mapMutations({
      setDisplayClassId: 'setDisplayClassId'
    }),
    /**
     * 预加载当前马上要打开(但还没打开)的页面的前10个按钮
     * 即加载buttonToLoad中的全部按钮
     */
    preFetchCurrent() {
      return Promise.all(
        this.buttonToLoad.map(it => preFetchAudio(it.voice_url))
      )
    }
  }
}
</script>
