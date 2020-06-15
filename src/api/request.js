import axios from 'axios'

// 创建axios实例
const _axios = axios.create({
  baseURL: '/echo-api', // api的base_url
  timeout: 5000 // 请求超时时间
})

// response拦截器==>处理后端返回相应
_axios.interceptors.response.use(
  response => {
    if (response) {
      if (response.data) {
        const data = response.data
        if (data.code === 0) {
          return data.data
        } else {
          return Promise.reject(new Error(data.message))
        }
      } else {
        return Promise.reject(new Error('网络异常'))
      }
    } else {
      return Promise.reject(new Error('运行时异常'))
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default _axios
