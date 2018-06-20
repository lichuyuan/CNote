<template>
  <div class="row">
    <trash-sider-bar></trash-sider-bar>
    <div class="col-lg-9">
      <div class="ibox float-e-margins" v-show="!curTrashNote._id">
        <div class="ibox-content text-center p-md">
          <h2><span class="text-navy">当前回收站为空</span></h2>
        </div>
      </div>
      <div class="ibox" v-show="curTrashNote._id">
        <div class="ibox-title">
          <h5>创建日期：{{ curTrashNote.friendlyCreatedAt }}</h5>
          <h5>更新日期：{{ curTrashNote.friendlyUpdatedAt }}</h5>
          <h5>所属笔记本：{{ belongTo }}</h5>
          <div class="ibox-tools">
            <i @click="onRevertNote" class="fa fa-repeat action-icon">
            </i>
            <i @click="onDeleteNote" class="fa fa-times-circle-o action-icon" style="font-size: 17px">
            </i>
          </div>
        </div>
        <div class="ibox-content">
          <h3>{{ curTrashNote.title }}</h3>
          <div class="preview markdown-body" v-html="previewMD">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import TrashSiderBar from './TrashSiderBar'
import MarkdownIt from 'markdown-it'

let md = new MarkdownIt()

export default {
  components: {
    TrashSiderBar
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'curTrashNote',
      'trashNotes',
      'belongTo'
    ]),
    previewMD() {
      return md.render(this.curTrashNote.content || '')
    }
  },
  methods: {
    ...mapMutations([
      'setCurTrashNote'
    ]),
    ...mapActions([
      'getTrashNotes',
      'deleteTrashNote',
      'revertTrashNote',
      'getNotebooks'
    ]),
    onDeleteNote() {
      this.$confirm('删除之后不可恢复', '确认删除笔记本吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return this.deleteTrashNote({ note: this.curTrashNote })
      }).then(() => {
        this.setCurTrashNote()
        this.$router.replace({
          path: '/trash',
          query: {
            noteId: this.curTrashNote._id,
          }
        })
      })
    },

    onRevertNote() {
      this.revertTrashNote({ noteId: this.curTrashNote._id })
        .then(() => {
          this.setCurTrashNote()
          this.$message.success('恢复笔记成功')
          this.$router.replace({
            path: '/trash',
            query: {
              noteId: this.curTrashNote._id,
            }
          })
        })
    }
  },

  created() {
    this.getNotebooks()
    this.getTrashNotes()
      .then(res => {
        this.setCurTrashNote({ curTrashNoteId: this.$route.query.noteId })
        this.$router.replace({
          path: '/trash',
          query: {
            noteId: this.curTrashNote._id,
          }
        })
      })
  },

  beforeRouteUpdate (to, from, next) {
    this.setCurTrashNote({ curTrashNoteId: to.query.noteId })
    next()
  }
}
</script>

<style scoped>
  h5 {
    color: #999c9e;
    margin-right: 10px;
  }
  h3 {
    margin-bottom: 20px;
  }
</style>
