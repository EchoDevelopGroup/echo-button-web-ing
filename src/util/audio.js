const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)

/**
 * 给定音频URL 预加载该音频 返回预加载任务的Promise
 * @param {string} url 音频URL
 */
export function preFetchAudio(url) {
  return new Promise((resolve, reject) => {
    if (isSafari) {
      // safari不支持volume
      // 暂时没找到比较好的预加载方法 先不预加载了
      resolve()
    } else {
      const audio = new Audio(url)
      audio.onload = resolve
      audio.onerror = reject
      // audio.load好像不行，但是直接调用播放肯定会加载的
      audio.volume = 0
      audio.play()
    }
  })
}

// debug测浏览器API用
// export function makeAudio(url) {
//   const audio = new Audio(url)
//   for (const k in audio) {
//     if (k.startsWith('on')) {
//       audio[k] = () => {
//         console.log(k + ' called')
//       }
//     }
//   }
//   return audio
// }
