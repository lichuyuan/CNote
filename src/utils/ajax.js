import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'http://note-server.hunger-valley.com/'
axios.defaults.withCredentials = true

export default function ajax(url, method = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method,
      validateStatus(status) {
        return (status >= 200 && status < 300 || status === 400)
      }
    }
    if (method === 'GET') {
      option.param = data
    } else {
      option.data = data
    }
    axios(option).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(error => {
      reject({msg: '网络异常'})
    })
  })
}
