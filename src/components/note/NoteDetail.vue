<template>
  <div class="row">
    <note-sider-bar></note-sider-bar>
    <div class="col-lg-9">
      <div class="ibox float-e-margins" v-show="!curNote._id">
        <div class="ibox-content text-center p-md">
          <h2><span class="text-navy">暂无笔记</span></h2>
          <p>
            请先创建笔记本，如果新增笔记将为您创建默认笔记本
          </p>
        </div>
      </div>
      <div v-show="curNote._id" class="ibox">
        <div class="ibox-title">
          <h5>创建日期：{{ curNote.friendlyCreatedAt }}</h5>
          <h5>更新日期：{{ curNote.friendlyUpdatedAt }}</h5>
          <h5>{{ status }}</h5>
          <div class="ibox-tools">
            <i :class="iconClass" @click="switchMD">
            </i>
            <i class="fa fa-trash-o action-icon" @click="onDeleteNote">
            </i>
          </div>
        </div>
        <div class="ibox-content">
          <el-input
            type="input"
            placeholder="请输入笔记标题"
            v-model="curNote.title"
            @input="onUpdateNote"
            @keydown.native="status='正在输入'">
          </el-input>
          <div style="margin: 20px 0;"></div>
          <el-input
            v-show="!isShowMD"
            type="textarea"
            :autosize="{ minRows: 20}"
            placeholder="请输入笔记内容，支持 Markdown 语法"
            v-model="curNote.content"
            @input="onUpdateNote"
            @keydown.native="status='正在输入'">
          </el-input>
          <div class="preview markdown-body" v-html="previewMD" v-show="isShowMD">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import NoteSiderBar from './NoteSiderBar'
import _ from 'lodash'
import MarkdownIt from 'markdown-it'

let md = new MarkdownIt()
export default {
  components: {
    NoteSiderBar
  },
  data () {
    return {
      status: '未改动',
      isShowMD: false,
      iconClass: 'fa fa-eye action-icon'
    }
  },
  computed: {
    ...mapGetters([
      'curNote',
      'curBook',
      'notes'
    ]),
    previewMD() {
      return md.render(this.curNote.content || '')
    },

  },
  methods: {
    ...mapMutations([
      'setCurNote'
    ]),
    ...mapActions([
      'updateNote',
      'deleteNote'
    ]),
    onUpdateNote: _.debounce(function() {
      this.updateNote({
        noteId: this.curNote._id,
        title: this.curNote.title,
        content: this.curNote.content
      }).then(() => {
        this.status = '已保存'
      }).catch(() => {
        this.status = '保存出错'
      })
    }, 800),
    onDeleteNote() {
      console.log(1)
      this.deleteNote({ noteId: this.curNote._id }).then(() => {
        this.setCurNote()
        this.$router.replace({
          path: '/note',
          query: {
            noteId: this.curNote._id,
            notebookId: this.curBook._id
          }
        })
      })
    },
    switchMD() {
      this.isShowMD = !this.isShowMD
      if(this.isShowMD) {
        this.iconClass = 'fa fa-pencil action-icon'
      } else {
        this.iconClass = 'fa fa-eye action-icon'
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.setCurNote({ curNoteId: to.query.noteId })
    next()
  }
}
</script>

<style scoped>
  h5 {
    color: #999c9e;
    margin-right: 10px;
  }
</style>
