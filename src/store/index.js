import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '@/api'
import { sha1 } from '@/util/sha1'

Vue.use(Vuex)

const canLocalStorage = typeof window.localStorage !== 'undefined'

/**
 * 指定键名 返回该键名对应的LocalStorage封装
 * 调用has返回键值是否存在
 * 调用get返回本地存储的JSON
 * 调用set设置本地存储的JSON
 * @param {string} key 键名
 */
function makeLocalStorage(key) {
  const fetch = () => localStorage.getItem(key)
  const remove = () => localStorage.removeItem(key)
  const write = value => localStorage.setItem(key, value)
  return {
    /**
     * 检查是否有本地存储
     */
    has() {
      if (!canLocalStorage) {
        return false
      }
      const v = fetch()
      return typeof v === 'string'
    },
    /**
     * 获取本地存储
     * @returns {object|null}
     */
    get() {
      if (!canLocalStorage) {
        return null
      }
      const v = fetch()
      if (typeof v === 'string') {
        try {
          const d = JSON.parse(v)
          return d
        } catch (err) {
          console.log('[Storage]' + key + ' is no json, removed')
          try {
            remove()
          } catch (err) {
            console.log('[Storage]' + key + ' remove failed, ignore')
          }
        }
      }
      return null
    },
    /**
     * 设置本地存储
     * @param {*} d 数据
     */
    set(d) {
      if (!canLocalStorage) {
        return
      }
      try {
        const v = JSON.stringify(d)
        write(v)
      } catch (err) {
        console.log('[Storage]' + key + ' write failed, ignore')
      }
    }
  }
}

const localOverview = makeLocalStorage('echo_button_overview')

export default new Vuex.Store({
  state: {
  /**
   * @type {api.ButtonOverview[]} 所有的桃语音
   */
    overview: []
  },
  getters: {
    overview: state => state.overview,

    // 按钮分类列表 字符串数组
    buttonClassificationList: state => state.overview.map(it => it.button_classification),

    // 以按钮分类名hash为key的map
    buttonListHashMap: state => {
      const map = {}
      state.overview.map(it => {
        const key = sha1(it.button_classification)
        map[key] = it
      })
      return map
    },

    getButtonListByHash: (state, getters) => hash => getters.buttonListHashMap[hash].button_list
  },
  mutations: {
    setOverview(state, overview) {
      state.overview = overview
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
        if (version === 1) {
          commit('setOverview', data)
        } else {
          console.log('[Overview] local storage version unknown, ignore')
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
        version: 1,
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
