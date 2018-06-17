import request from '@/helpers/request'
import { friendlyDate } from '@/helpers/utils'

const URL = {
  GET: 'note',
  REVERT: 'note/:id',
  DELETE: 'note/:id',
}

export default {
  getAll() {
    return new Promise((resolve, reject) => {
      request(`${URL.GET}?deleted=1`)
        .then(res => {
          res.data = res.data.sort((n1, n2) => n1.created_time < n2.created_time)
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

  deleteNote({ noteId }) {
    return request(URL.DELETE.replace(':id', noteId), 'DELETE')
  },

  revertNote({ noteId }) {
    return request(URL.REVERT.replace(':id', noteId), 'PATCH', { deleted: 0 })
  },
}
