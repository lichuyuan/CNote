import axios from 'axios'
import { Message } from 'element-ui'
import { baseUrl } from './config-baseUrl'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = baseUrl
axios.defaults.withCredentials = true

export default function ajax(url, method = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method,
    }
    if (method === 'GET') {
      option.param = data
    } else {
      option.data = data
    }
    axios(option).then(res => {
      if (res.data.success) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(error => {
      Message.error('网络异常')
      reject({msg: '网络异常'})
    })
  })
}
