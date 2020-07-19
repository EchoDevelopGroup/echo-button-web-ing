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
  },
  methods: {
    ...mapActions({
      loadLocalConfig: 'loadLocalConfig',
      loadLocalOverview: 'loadLocalOverview',
      saveLocalOverview: 'saveLocalOverview',
      fetchOverview: 'fetchOverview'
    }),
    async boot() {
      this.loadLocalOverview()
      this.loadLocalConfig()
      try {
        await this.fetchOverview()
        this.saveLocalOverview()
      } catch (err) {
        console.error('[App]fetch overview from server failed, no data display!')
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
