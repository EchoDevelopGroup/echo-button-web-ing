<template>
  <div class="config">
    <div class="config-grid">
      <div class="config-label">
        <span title="启动后关闭切页时的动画 总是以最快速度切页">快速动画</span>
      </div>
      <div class="config-value">
        <el-switch
          v-model="config.fastAnimation"
          active-text="启动"
          inactive-text="关闭">
        </el-switch>
      </div>

      <div class="config-label">
        <span title="调节切页动画的速度 最左边最慢 最右边最快">动画速度</span>
      </div>
      <div class="config-value">
        <el-slider
          v-model="config.animationLevel"
          :min="1"
          :max="5"
          :step="1"
          :format-tooltip="formatTooltip"
          size="small"
          show-stops>
        </el-slider>
      </div>
      <div class="config-label">
        <span title="启动后每播放一次动画 速度就加快一个等级">自动加速</span>
      </div>
      <div class="config-value">
        <el-switch
          v-model="config.autoIncrease"
          active-text="启动"
          inactive-text="关闭">
        </el-switch>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Config',
  data() {
    return {
      config: {
        fastAnimation: false,
        animationLevel: 1,
        autoIncrease: true
      }
    }
  },
  computed: {
    ...mapGetters({
      storeConfig: 'config'
    })
  },
  watch: {
    config: {
      deep: true,
      handler(val) {
        const config = {
          ...val
        }
        this.setConfig(config)
        this.saveLocalConfig()
      }
    }
  },
  created() {
    this.config.fastAnimation = this.storeConfig.fastAnimation
    this.config.animationLevel = this.storeConfig.animationLevel
    this.config.autoIncrease = this.storeConfig.autoIncrease
  },
  methods: {
    ...mapMutations({
      setConfig: 'setConfig'
    }),
    ...mapActions({
      saveLocalConfig: 'saveLocalConfig'
    }),
    // 把速度1~5转成文本
    formatTooltip(v) {
      return ({
        1: '很慢',
        2: '慢',
        3: '中',
        4: '快',
        5: '很快'
      })[v] || v
    }
  }
}
</script>

<style>
.config {
  padding: 20px;
  text-align: left;
}
.config-grid {
  display: grid;
  grid-template-columns: 120px 1fr;
}
.config-label {
  padding: 8px 4px;
  text-align: right;
}
.config-value {
  padding: 8px 16px;
}
</style>
