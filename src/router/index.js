import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import NotebookList from '@/components/notebook/NotebookList'
import NoteDetail from '@/components/note/NoteDetail'
import TrashDetail from '@/components/trash/TrashDetail'
// const Index = () => import('@/components/Index')
// const Login = () => import('@/components/Login')
// const Register = () => import('@/components/Register')
// const NotebookList = () => import('@/components/notebook/NotebookList')
// const NoteDetail = () => import('@/components/note/NoteDetail')
// const TrashDetail = () => import('@/components/trash/TrashDetail')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', component: Index,
      children: [
        { path: 'notebooks', alias:'/', component: NotebookList },
        { path: 'note', component: NoteDetail },
        { path: 'trash', component: TrashDetail },
      ]
    },
  ]
})
