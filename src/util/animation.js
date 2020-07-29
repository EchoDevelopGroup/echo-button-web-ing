export class AnimationController {
  constructor(enter, leave) {
    this.enter = enter
    this.leave = leave

    this.status = 'stop'
    this.fastAnimation = false
    this.task = []
    this.promise = Promise.resolve()
  }

  sendRequest(done) {
    // done函数执行的时机
    // 在最近的一次leave前执行

    if (this.status === 'enter') {
      // 加入任务 等待动画执行过程中被调用
      this.task.push(done)
    } else if (this.status === 'leave') {
      // 已经被清空过了 那么加入任务 等待下一次被调用
      // 即这一次动画结束后 再立刻启动一次动画
      this.task.push(done)
      this.promise.then(() => this.main())
    } else if (this.status === 'stop') {
      // 加入任务 并启动动画
      this.task.push(done)
      this.promise = this.main()
    }
  }

  change() {
    // 把所有需要done的函数都done掉 然后清空
    this.task.forEach(done => done())
    this.task = []
  }

  async main() {
    if (this.fastAnimation) {
      this.change()
    } else {
      this.status = 'enter'
      await this.enter()

      this.status = 'leave'
      this.change()
      await this.leave()

      this.status = 'stop'
    }
  }
}
