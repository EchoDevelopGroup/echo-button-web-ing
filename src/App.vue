<template>
  <div id="app">
    <main-layout>
      <router-view></router-view>
    </main-layout>
  </div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { sha1 } from './util/sha1'

export default {
  name: 'App',
  components: {
    MainLayout
  },
  created() {
    this.boot()
    document.addEventListener('keydown', this.onKeyDown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown)
  },
  computed: {
    ...mapGetters({
      overview: 'overview'
    }),
    // 当前类别的ID
    classId() {
      return this.$route.params.id
    }
  },
  methods: {
    ...mapMutations({
      setDisplayClassId: 'setDisplayClassId'
    }),
    ...mapActions({
      loadLocalConfig: 'loadLocalConfig',
      loadLocalOverview: 'loadLocalOverview',
      saveLocalOverview: 'saveLocalOverview',
      fetchOverview: 'fetchOverview'
    }),
    // 初始化启动应用 主要是加载缓存等
    async boot() {
      this.loadLocalOverview()
      this.tryLoadPageFromUrl()
      this.loadLocalConfig()
      try {
        await this.fetchOverview()
        this.tryLoadPageFromUrl()
        this.saveLocalOverview()
      } catch (err) {
        console.error('[App]fetch overview from server failed, no data display!')
      }
    },
    // 尝试加载URL中表示的那一页
    tryLoadPageFromUrl() {
      try {
        if (this.classId !== '') {
          const target = this.overview.find(it => sha1(it.button_classification) === this.classId)
          if (target) {
            this.setDisplayClassId(sha1(target.button_classification))
          }
        }
      } catch (err) {
        console.log('[Core]can not load page ' + this.classId + ' because', err)
      }
    },
    // 当用户按下键盘上的按键的时候
    onKeyDown(e) {
      if (e.altKey === true && e.shiftKey === true) {
        if (e.keyCode === 67) {
          this.$router.push('/config').catch(() => {})
        } else if (e.keyCode === 65) {
          this.$router.push('/audit').catch(() => {})
        }
      }
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: #fae3e9;
}
a {
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
