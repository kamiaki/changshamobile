import axios from 'axios'
import nprogress from 'nprogress'
import { Toast } from 'vant'

console.log(process.env.VUE_APP_BASE_API)

// 创建一个axios的实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
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
  if (err.response && err.response.status) {
    // 错误请求的状态码
    const status = err.response.status
    if (status === 400) {
      Toast.fail('参数错误')
    }
    if (status === 401) {
      Toast.fail('登录过期,请重新登录')
    }
    if (status === 403) {
      Toast.fail('没有权限')
    }
    if (status === 404) {
      Toast.fail('接口路径错误')
    }
    if (status === 500) {
      Toast.fail('服务器出错')
    }
    if (status === 503) {
      Toast.fail('服务器在维护')
    }
  }
  return Promise.reject(err)
})

export default service
