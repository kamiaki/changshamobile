import axios from 'axios'
import nprogress from 'nprogress'
import { Toast } from 'vant'

console.log(process.env.VUE_APP_BASE_API)

// 创建一个axios的实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 100000
})

// 请求拦截: 每一次发请求都会做的事情
service.interceptors.request.use((config) => {
  nprogress.start()
  return config
}, err => {
  nprogress.done()
  return Promise.reject(err)
})

// 响应拦截: 每一次接口返回数据的时候都会做的事情
service.interceptors.response.use((res) => {
  nprogress.done()
  return res.data
}, err => {
  if (err.response) {
    Toast.fail('网络错误')
  }
  return Promise.reject(err)
})

export default service
