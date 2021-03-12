import request from '@/utils/request'

// 用户登录获取token
export function login (data) {
  return request({ url: '/token/getToken', method: 'get', params: data })
}
