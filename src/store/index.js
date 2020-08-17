import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '@/api'
import { sha1 } from '@/util/sha1'
import { Player } from '@/util/player'
import { makeLocalStorage } from '@/util/storage'

Vue.use(Vuex)

const targetOverviewVersion = 1
const targetConfigVersion = 2

const localOverview = makeLocalStorage('echo_button_overview')
const localConfig = makeLocalStorage('echo_button_config')

export default new Vuex.Store({
  state: {
    /**
     * @type {api.ButtonOverview[]} 所有的桃语音
     */
    overview: [],

    /**
     * @type {string} 当前正在显示的类别的hash id 比起URL存在一定延迟
     */
    displayClassId: '',

    /**
     * 应用配置 持久化
     */
    config: {
      /**
       * 快速动画 为true的时候跳过切换页面的动画
       */
      fastAnimation: false,
      /**
       * 动画速度等级 1最慢 5最快
       */
      animationLevel: 1,
      /**
       * 自动随着切页的次数增加逐渐加快动画速度
       */
      autoIncrease: true
    },

    /**
     * 播放器配置
     */
    player: {
      /**
       * 循环模式 0=洗脑循环 1=随机循环 2=禁止循环
       */
      playPattern: 2,

      /**
       * 是否允许循环播放
       */
      overlap: false,

      /**
       * 播放控制器
       */
      controller: new Player()
    },

    /**
     * 页面视图 是否是手机之类的参数
     */
    view: {
      /**
       * 宽度
       */
      width: 0,
      /**
       * 高度
       */
      height: 0
    },

    /**
     * 是否显示帽子动画
     */
    isHat: Math.random() > 0.95

  },
  getters: {
    overview: state => state.overview,
    displayClassId: state => state.displayClassId,
    config: state => state.config,
    isHat: state => state.isHat,
    // 按钮分类列表 类型 string[]
    buttonClassificationList: state => state.overview.map(it => it.button_classification),

    // 按钮分类列表 类型 {name:string, hash:string}[]
    buttonClassificationListWithHash: (state, getters) => {
      return getters.buttonClassificationList.map(name => {
        return {
          name,
          hash: sha1(name)
        }
      })
    },

    // 以按钮分类名hash为key的map
    buttonListHashMap: state => {
      const map = {}
      state.overview.map(it => {
        const key = sha1(it.button_classification)
        map[key] = it
      })
      return map
    },

    // 按hash查询按钮列表
    getButtonListByHash: (state, getters) => hash => {
      const area = getters.buttonListHashMap[hash]
      if (area) {
        return area.button_list
      }
      console.log('[Core] getButtonListByHash, hash not found:' + hash)
      return []
    },

    // 所有的按钮
    buttonList: state => {
      const list = []
      for (const classification of state.overview) {
        for (const voice of classification.button_list) {
          list.push(voice)
        }
      }
      return list
    },

    // 给定ID 返回按钮详情
    getButtonById: (_, getters) => id => getters.buttonList.find(it => it.voice_id === id),

    // 播放器配置
    playerConfig: state => state.player,

    // 浏览器内屏幕宽高
    clientWidth: state => state.view.width,
    clientHeight: state => state.view.height
  },
  mutations: {
    setOverview(state, overview) {
      state.overview = overview
    },

    setDisplayClassId(state, classId) {
      state.displayClassId = classId
    },

    setConfig(state, config) {
      state.config = config
    },

    setPlayerPlayPattern(state, pattern) {
      state.player.playPattern = pattern
    },

    setPlayerOverlap(state, overlap) {
      state.player.overlap = overlap
    },

    setViewSize(state, { width, height }) {
      state.view.width = width
      state.view.height = height
    }
  },
  actions: {
    /**
     * 从本地缓存读取Overview
     * @param {*} context 上下文
     */
    loadLocalOverview({ commit }) {
      const local = localOverview.get()
      if (local !== null) {
        const { version, data } = local
        if (version === targetOverviewVersion) {
          commit('setOverview', data)
        } else {
          console.log('[LocalStorage] local storage version unknown, ignore')
        }
      }
    },

    /**
     * 把当前Vuex中的Overview存入本地缓存
     * @param {*} context 上下文
     */
    saveLocalOverview({ state }) {
      const data = state.overview
      localOverview.set({
        version: targetOverviewVersion,
        data
      })
    },

    /**
     * 从本地缓存读取Config
     * @param {*} context 上下文
     */
    loadLocalConfig({ commit }) {
      const local = localConfig.get()
      if (local !== null) {
        const { version, data } = local
        if (version === targetConfigVersion) {
          commit('setConfig', data)
        } else {
          console.log('[LocalStorage] local storage version unknown, ignore')
        }
      }
    },

    /**
     * 把当前Vuex中的Config存入本地缓存
     * @param {*} context 上下文
     */
    saveLocalConfig({ state }) {
      const data = state.config
      localConfig.set({
        version: targetConfigVersion,
        data
      })
    },

    /**
     * 从远端服务器获取Overview 存入vuex
     */
    async fetchOverview({ commit }) {
      const overview = await api.getOverview()
      commit('setOverview', overview)
      return overview
    }
  },
  modules: {
  }
})
