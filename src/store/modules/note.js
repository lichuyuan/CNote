import Note from '@/api/notes'
import { Message } from 'element-ui'

const state = {
  notes: null,
  curNoteId: null,
}

const getters = {
  notes: state => state.notes || {},
  curNote: (state, getters) => {
    if (!state.curNoteId) {
      return getters.notes[0] || {}
    }
    return state.notes.find(note => note._id === state.curNoteId) || {}
  }
}

const mutations = {
  setNotes(state, { notes }) {
    state.notes = notes
  },

  addNote(state, { note }) {
    state.notes.unshift(note)
  },

  updateNote(state, { noteId, title, content }) {
    let note = state.notes.find(note => note._id === noteId) || {}
    note.title = title
    note.content = content
  },

  deleteNote(state, { noteId }) {
    state.notes = state.notes.filter(note => note._id !== noteId)
  },

  setCurNote(state, { curNoteId } = {}) {
    state.curNoteId = curNoteId
  }
}

const actions = {
  getNotes({ commit }, { notebookId }) {
    return Note.getAll({ notebookId })
      .then(res => {
        commit('setNotes', { notes: res.data })
      })
  },

  addNote({ commit }, { notebookId, title, content }) {
    return Note.addOne({ notebookId }, { title, content })
      .then(res => {
        commit('addNote', { note: res.data })
        commit('increaseNotebook', { notebookId: notebookId })
      })
  },

  updateNote({ commit }, { noteId, title, content }) {
    return Note.updateOne({ noteId }, { title, content })
      .then(res => {
        commit('updateNote', { noteId, title, content })
      })
  },

  deleteNote({ commit }, { noteId }) {
    return Note.deleteOne({ noteId })
      .then(res => {
        commit('deleteNote', { noteId })
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
