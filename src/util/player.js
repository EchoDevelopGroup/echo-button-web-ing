import Vue from 'vue'
import store from '@/store'

// Vue.observable()

/**
 * @typedef Task
 * @property {string} id ID
 * @property {string} voiceId 音频ID
 * @property {string} url URL
 * @property {Audio} audio 音频对象
 * @property {boolean} overlap 播放时是否允许重叠
 * @property {'wait' | 'play' | 'pause' | 'stop'} status 音频播放状态
 */

export class Player {
  constructor() {
    /**
     * @type {Task[]}
     */
    this.taskList = Vue.observable([])

    this._nextId = 1

    // this.mode = 0
    this.repeatLock = 0
  }

  getNextId() {
    return this._nextId++
  }

  /**
   * 随机播放一个音频
   */
  playRandom(next = null) {
    const randomButton = this.getRandomButton()
    const voiceId = randomButton.voice_id

    this.playVoice(voiceId, next)
  }

  /**
   * 播放指定音频ID的音频
   * @param {string} voiceId 音频ID
   */
  playVoice(voiceId, next = null) {
    const button = store.getters.getButtonById(voiceId)
    const overlap = store.getters.playerConfig.overlap

    if (button) {
      if (!overlap) {
        // 不允许重叠播放 就先停止所有正在播放的
        this.stopAllCurrentTask()
      }
      // 创建一个播放任务
      const task = this.createTask(voiceId, next)

      // 添加到列表末尾并播放
      this.taskList.push(task)
      task.audio.play()
    } else {
      // 找不到这个按钮
      console.log('[Player] echo button not found: ' + voiceId)
    }
  }

  /**
   * 单曲循环地播放一个音频
   * @param {string} voiceId 音频ID
   */
  singleRepeat(voiceId) {
    // 循环锁上锁
    this.repeatLock++

    const task = this.createTask(voiceId, () => {
      // 解除循环锁
      this.repeatLock--
    })
    task.audio.play()
    this.taskList.push(task)
  }

  /**
   * 随机选择一个按钮
   */
  getRandomButton() {
    const buttons = store.getters.buttonList
    const index = Math.floor(Math.random() * buttons.length)
    return buttons[index]
  }

  /**
   * 随机循环
   */
  randomRepeat() {
    // 循环锁上锁
    this.repeatLock++
    // TODO 这种随机方法会导致容易出现重复
    // 但是控制重复的话一定需要保存状态 所以我们放到v2吧
    const randomButton = this.getRandomButton()
    const voiceId = randomButton.voice_id

    const task = this.createTask(voiceId, () => {
      // 解除循环锁
      this.repeatLock--
    })
    task.audio.play()
    this.taskList.push(task)
  }

  /**
   * 当某个播放任务完成时
   * @param {Task} task 任务
   */
  onPlayEnd(task) {
    const mode = store.getters.playerConfig.playPattern

    if (mode === 0) {
      // 洗脑循环 那就再播放一遍

      // 限制循环锁为0的时候才启动循环
      // 这样保证有一个音频在循环的时候
      // 自动拒绝第二个音频的循环

      // 注意到createTask中next比onPlayEnd先执行
      // 所以正在循环的音频播放完毕后会先下锁
      // 然后再进入这里 自动触发第二次循环
      if (this.repeatLock === 0) {
        // 启动这个音频的单曲循环
        this.singleRepeat(task.voiceId)
      }
    } else if (mode === 1) {
      // 随机循环

      if (this.repeatLock === 0) {
        // 同理 随机播放
        this.randomRepeat()
      }
    }
  }

  /**
   * 停止所有正在播放的任务
   */
  stopAllCurrentTask() {
    this.taskList.forEach(t => {
      t.audio.pause()
    })
    this.taskList = []
  }

  /**
   * 创建一个播放任务
   * @param {string} voiceId 音频ID
   */
  createTask(voiceId, next = null) {
    const button = store.getters.getButtonById(voiceId)
    if (button) {
      // 播放任务基本参数
      const url = button.voice_url
      const audio = new Audio(button.voice_url)
      const task = Vue.observable({
        id: this.getNextId(),
        voiceId,
        url,
        audio,
        status: 'wait'
      })
      // 播放结束和错误的时候都调用结束回调
      audio.onended = () => {
        task.status = 'stop'
        if (next) {
          next(task)
        }
        this.removeTaskById(task.id)
        this.onPlayEnd(task)
      }
      audio.onerror = () => {
        task.status = 'error'
        if (next) {
          next(task)
        }
        this.removeTaskById(task.id)
        this.onPlayEnd(task)
      }
      // 暂停和播放的时候调整播放状态
      audio.onpause = () => {
        task.status = 'pause'
      }
      audio.onplay = () => {
        task.status = 'play'
      }
      return task
    } else {
      throw new Error('[Player] echo button not found: ' + voiceId)
    }
  }

  /**
   * 移除指定任务
   * @param {string} id 任务ID
   */
  removeTaskById(id) {
    this.taskList = this.taskList.filter(it => it.id !== id)
  }

  /**
   * 暂停所有任务
   */
  pauseAll() {
    this.taskList.forEach(it => {
      it.audio.pause()
    })
  }

  /**
   * 继续所有的播放任务
   */
  playAll() {
    this.taskList.forEach(it => {
      it.audio.play()
    })
  }
}
