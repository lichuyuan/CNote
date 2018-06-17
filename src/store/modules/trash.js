import Trash from '@/api/trash'
import { Message } from 'element-ui'

const state = {
  trashNotes: null,
  curTrashNoteId: null,
}

const getters = {
  trashNotes: state => state.trashNotes || {},
  curTrashNote: (state, getters) => {
    if (!state.curTrashNoteId) {
      return getters.trashNotes[0] || {}
    }
    return state.trashNotes.find(note => note._id === state.curTrashNoteId) || {}
  },
  belongTo: (state, getters, rootState, rootGetters) => {
    let notebook = rootGetters.notebooks.find(notebook => notebook._id === getters.curTrashNote.notebook_id) || {}
    return notebook.title || ''
  }
}

const mutations = {
  setTrashNotes(state, { trashNotes }) {
    state.trashNotes = trashNotes
  },

  addTrashNote(state, { note }) {
    state.trashNotes.unshift(note)
  },

  deleteTrashNote(state, { noteId }) {
    state.trashNotes = state.trashNotes.filter(note => note._id !== noteId)
  },

  setCurTrashNote(state, { curTrashNoteId } = {}) {
    state.curTrashNoteId = curTrashNoteId
  }
}

const actions = {
  getTrashNotes({ commit }) {
    return Trash.getAll()
      .then(res => {
        commit('setTrashNotes', { trashNotes: res.data })
      })
  },

  deleteTrashNote({ commit}, { note }) {
    return Trash.deleteNote({ noteId: note._id })
      .then(res => {
        commit('decreaseNotebook', { notebookId: note.notebook_id })
        commit('deleteTrashNote', { noteId: note._id })
        Message.success(res.message)
      })
  },

  revertTrashNote({ commit }, { noteId }) {
    return Trash.revertNote({ noteId })
      .then(res => {
        commit('deleteTrashNote', { noteId })
        Message.success(res.message)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}
