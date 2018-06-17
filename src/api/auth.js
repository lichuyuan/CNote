import request from '@/helpers/request'

const URL = {
  REGISTER: 'user/register',
  LOGIN: 'user/login',
  LOGOUT: 'user/logout',
  GET_INFO: 'user'
}

window.r = request

export default {
  register({ username, password }) {
    return request(URL.REGISTER, 'POST', { username, password })
  },
  login({ username, password }) {
    return request(URL.LOGIN, 'POST', { username, password })
  },
  logout() {
    return request(URL.LOGOUT)
  },
  getInfo() {
    return request(URL.GET_INFO)
  }
}
