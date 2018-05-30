import ajax from '@/utils/ajax.js'

const url = {
  register: 'auth/register',
  login: 'auth/login',
  logout: 'auth/logout',
  get_info: 'auth'
}

export default {
  register(username, password) {
    return ajax(url.register, 'POST', {username, password})
  },
  login(username, password) {
    return ajax(url.login, 'POST', {username, password})
  },
  logout() {
    return ajax(url.logout)
  },
  getInfo() {
    return ajax(url.get_info)
  }
}
