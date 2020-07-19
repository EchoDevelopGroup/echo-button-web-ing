<template>
  <div class="config">
    <span>快速动画</span>
    <el-switch
      v-model="config.fastAnimation"
      active-text="启动"
      inactive-text="关闭">
    </el-switch>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Config',
  data() {
    return {
      config: {
        fastAnimation: false
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
        console.log('ddd', config)
        this.setConfig(config)
        this.saveLocalConfig()
      }
    }
  },
  created() {
    this.config.fastAnimation = this.storeConfig.fastAnimation
  },
  methods: {
    ...mapMutations({
      setConfig: 'setConfig'
    }),
    ...mapActions({
      saveLocalConfig: 'saveLocalConfig'
    })
  }
}
</script>

<style>
.config {
  padding: 20px;
  text-align: left;
}
</style>
