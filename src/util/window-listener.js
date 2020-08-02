export class WindowListener {
  constructor(handler) {
    this.handler = handler
    this._handler = this.onWindowResize.bind(this)
    this.waiting = false
    this.delay = 400
    this.getClientSize()
    window.addEventListener('resize', this._handler)
  }

  /**
   * 释放
   */
  destroy() {
    window.removeEventListener('resize', this._handler)
  }

  /**
   * 获取当前窗口大小
   */
  getClientSize() {
    this.width = document.documentElement.clientWidth
    this.height = document.documentElement.clientHeight
    this.handler(this.width, this.height)
  }

  /**
   * 监听窗口大小变换
   */
  onWindowResize() {
    // 防止重入
    if (this.waiting) {
      return
    }
    this.waiting = true
    setTimeout(() => {
      this.waiting = false
      this.getClientSize()
      this.handler(this.width, this.height)
    }, this.delay)
  }
}

/**
 * 用法：
 * onWindowResize((width, height) => {
 *   this.width = width
 *   this.height = height
 * })
 */
export function onWindowResize(handler) {
  const listen = new WindowListener(handler)
  return listen
}
