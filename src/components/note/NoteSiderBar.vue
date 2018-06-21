<template>
    <div class="col-lg-3">
      <div class="ibox">
        <div class="ibox-content">
          <el-dropdown @command="handleCommand">
            <h3 class="el-dropdown-link">
              {{ curBook.title ? curBook.title : '暂无笔记本' }}<i class="el-icon-arrow-down el-icon--right"></i>
            </h3>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="nb in notebooks" :key="nb._id" :command="nb._id" :disabled="nb === curBook">{{ nb.title }}</el-dropdown-item>
              <el-dropdown-item command="trash" divided>回收站</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="input-group">
            <input type="text" v-model="noteTitle" placeholder="请输入笔记标题" class="input input-sm form-control">
            <span class="input-group-btn">
              <button type="button" class="btn btn-sm btn-white" @click="onAddNote"> <i class="fa fa-plus"></i> 新增笔记</button>
            </span>
          </div>
          <ul class="sortable-list connectList agile-list">
            <router-link tag="li"  v-for="n in notes" :key="n.id" :to="`/note?noteId=${n._id}&notebookId=${curBook._id}`" exact-active-class="success-element">
              {{ n.title ? n.title : '无标题' }}
              <div class="agile-detail">
                <i class="fa fa-clock-o"></i> {{ n.friendlyUpdatedAt }}
              </div>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      noteTitle: ''
    }
  },
  computed: {
    ...mapGetters([
      'notes',
      'notebooks',
      'curBook',
      'curNote'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurBook',
      'setCurNote',
      'increaseNotebook'
    ]),
    ...mapActions([
      'getNotebooks',
      'getNotes',
      'addNote',
      'addNotebook'
    ]),
    handleCommand(curBookId) {
      if (curBookId === 'trash') {
        return this.$router.push('/trash')
      }
      this.setCurBook({ curBookId })
      this.getNotes({ notebookId: curBookId })
        .then(() => {
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
    onAddNote() {
      if (this.notebooks.length === 0) {
        this.addNotebook({ title: '第一个笔记本'})
          .then(() => {
            this.setCurBook()
            this.addNote({ notebookId: this.curBook._id, title: this.noteTitle, content: '' })
              .then(() => {
                this.setCurNote()
                this.$router.replace({
                  path: '/note',
                  query: {
                    noteId: this.curNote._id,
                    notebookId: this.curBook._id
                  }
                })
              })
          })
      } else {
        this.addNote({ notebookId: this.curBook._id, title: this.noteTitle, content: '' })
          .then(() => {
            this.setCurNote()
            this.$router.replace({
              path: '/note',
              query: {
                noteId: this.curNote._id,
                notebookId: this.curBook._id
              }
            })
          })
      }
      this.noteTitle = ''
    }
  },
  created() {
    this.getNotebooks()
      .then(() => {
        this.setCurBook({ curBookId: this.$route.query.notebookId })
        return this.getNotes({ notebookId: this.curBook._id })
      }).then(() => {
        this.setCurNote({ cutNoteId: this.$route.query.noteId })
        this.$router.replace({
          path: '/note',
          query: {
            noteId: this.curNote._id,
            notebookId: this.curBook._id
          }
        })
    })
  }
}
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .isSelected {

  }
</style>
