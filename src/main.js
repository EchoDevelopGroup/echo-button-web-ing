import 'element-ui/lib/theme-chalk/index.css'
import './main.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import { api } from '@/api'
// import { startMock } from './mock'

// startMock()

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window._ = () => {
  window.api = api
}
