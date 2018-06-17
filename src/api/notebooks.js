import request from '@/helpers/request'
import { friendlyDate } from '@/helpers/utils'

const URL = {
  GET: 'notebook',
  ADD: 'notebook',
  UPDATE: 'notebook/:id',
  DELETE: 'notebook/:id'
}

export default {
  getAll() {
    return new Promise((resolve, reject) => {
      request(URL.GET).then(res => {
        res.data = res.data.sort((n1, n2) => n1.created_time < n2.created_time)
        res.data.forEach(n => {
          n.friendlyCreatedAt = friendlyDate(n.created_time)
          n.friendlyUpdatedAt = friendlyDate(n.update_time)
        })
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  updateOne(notebookId, { title = '' } = { title: '' }) {
    return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', { title })
  },
  deleteOne(notebookId) {
    return request(URL.DELETE.replace(':id', notebookId), 'DELETE')
  },
  addOne({ title = '' } = { title: '' }) {
    return new Promise((resolve, reject) => {
      request(URL.ADD, 'POST', { title }).then(res => {
          res.data.friendlyCreatedAt = friendlyDate(res.data.created_time)
          res.data.friendlyUpdatedAt = friendlyDate(res.data.update_time)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
}
