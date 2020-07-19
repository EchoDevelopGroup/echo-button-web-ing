<template>
  <div id="app">
    <main-layout>
      <router-view></router-view>
    </main-layout>
  </div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
import { mapActions } from 'vuex'

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
  methods: {
    ...mapActions({
      loadLocalConfig: 'loadLocalConfig',
      loadLocalOverview: 'loadLocalOverview',
      saveLocalOverview: 'saveLocalOverview',
      fetchOverview: 'fetchOverview'
    }),
    // 初始化启动应用 主要是加载缓存等
    async boot() {
      this.loadLocalOverview()
      this.loadLocalConfig()
      try {
        await this.fetchOverview()
        this.saveLocalOverview()
      } catch (err) {
        console.error('[App]fetch overview from server failed, no data display!')
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
