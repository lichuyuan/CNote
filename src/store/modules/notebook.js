import Notebook from '@/api/notebooks'
import { Message } from 'element-ui'

const state = {
  notebooks: null,
  curBookId: null
}

const getters = {
  notebooks: state => state.notebooks || [],
  curBook: (state, getters) => {
    if (!state.curBookId) {
      return getters.notebooks[0] || {}
    }
    return state.notebooks.find(notebook => notebook._id === state.curBookId) || {}
  }
}

const mutations = {
  setNotebooks(state, { notebooks }) {
    state.notebooks = notebooks
  },

  addNotebook(state, { notebook }) {
    state.notebooks.unshift(notebook)
  },

  updateNotebook(state, { notebookId, title }) {
    let notebook = state.notebooks.find(notebook => notebook._id === notebookId) || {}
    notebook.title = title
  },

  increaseNotebook(state, { notebookId }) {
    let notebook = state.notebooks.find(notebook => notebook._id === notebookId) || {}
    notebook.note_counts += 1
  },

  decreaseNotebook(state, { notebookId }) {
    let notebook = state.notebooks.find(notebook => notebook._id === notebookId) || {}
    notebook.note_counts -= 1
  },

  deleteNotebook(state, { notebookId }) {
    state.notebooks = state.notebooks.filter(notebook => notebook._id !== notebookId)
  },

  setCurBook(state, { curBookId } = {}) {
    state.curBookId = curBookId
  }
}

const actions = {
  getNotebooks({ commit }) {
    return Notebook.getAll()
      .then(res => {
        commit('setNotebooks', { notebooks: res.data })
      })
  },

  addNotebook({ commit }, { title }) {
    return Notebook.addOne({ title })
      .then(res => {
        commit('addNotebook', { notebook: res.data })
        Message.success(res.message)
      })
  },

  updateNotebook({ commit }, { notebookId, title }) {
     return Notebook.updateOne(notebookId, { title })
      .then(res => {
        commit('updateNotebook', { notebookId, title })
        Message.success(res.message)
      })
  },

  deleteNotebook({ commit }, { notebookId }) {
    return Notebook.deleteOne(notebookId)
      .then(res => {
        commit('deleteNotebook', { notebookId })
        Message.success(res.message)
      }).catch(res => {
        Message.error(res.message)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}
