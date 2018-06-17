import request from '@/helpers/request'
import { friendlyDate } from '@/helpers/utils'

const URL = {
  GET: 'note',
  ADD: 'note',
  UPDATE: 'note/:id',
}

export default {
  getAll({ notebookId }) {
    return new Promise((resolve, reject) => {
      request(`${URL.GET}?notebook_id=${notebookId}&deleted=0`).then(res => {
        res.data = res.data.sort((n1, n2) => n1.updated_time < n2.updated_time)
        res.data.forEach(n => {
          n.friendlyCreatedAt = friendlyDate(n.created_time)
          n.friendlyUpdatedAt = friendlyDate(n.updated_time)
        })
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  updateOne({ noteId }, { title, content }) {
    return request(URL.UPDATE.replace(':id', noteId), 'PATCH', { title, content })
  },
  deleteOne({ noteId }) {
    return request(URL.UPDATE.replace(':id', noteId), 'PATCH', { deleted: 1 })
  },
  addOne({ notebookId }, { title = '', content = '' } = { title: '', content: ''}) {
    return new Promise((resolve, reject) => {
      request(URL.ADD, 'POST', { notebook_id: notebookId, title, content })
        .then(res => {
          res.data.friendlyCreatedAt = friendlyDate(res.data.created_time)
          res.data.friendlyUpdatedAt = friendlyDate(res.data.updated_time)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
    })
  },
}
