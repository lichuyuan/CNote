<template>
  <div class="ibox">
    <div class="ibox-title">
      <h5>笔记本列表({{ notebooks.length }})</h5>
      <div class="ibox-tools">
        <a class="btn btn-primary btn-xs" @click="onCreate">新增笔记本</a>
      </div>
    </div>
    <div class="ibox-content">
      <div class="project-list">
        <div class="ibox float-e-margins" v-show="showGuide">
          <div class="ibox-content text-center p-md">
            <h2><span class="text-navy">暂无笔记本</span></h2>
            <p>
              请点击右上角新增
            </p>
          </div>
        </div>
        <table class="table table-hover" v-show="!showGuide">
          <tbody>
            <tr v-for="n in notebooks" @click="$router.push(`/note?notebookId=${ n._id }`)" style="cursor:pointer;">
              <td class="project-status">
                <span class="label label-primary">类型</span>
              </td>
              <td class="project-title">
                <a>{{ n.title }}</a>
                <br/>
                <small>{{ n.friendlyCreatedAt }}</small>
              </td>
              <td class="project-completion">
                <small>笔记总数：{{ n.note_counts }}</small>
                <div class="progress progress-mini">
                  <div style="width: 48%;" class="progress-bar"></div>
                </div>
              </td>
              <td class="project-people">
              </td>
              <td class="project-actions">
                <a @click.stop="onDelete(n)" class="btn btn-white btn-sm"><i class="fa fa-folder"></i> Delete </a>
                <a @click.stop="onEdit(n)" class="btn btn-white btn-sm"><i class="fa fa-pencil"></i> Edit </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['notebooks']),
    showGuide() {
      return this.notebooks.length === 0
    }
  },
  methods: {
    ...mapActions([
      'getNotebooks',
      'addNotebook',
      'updateNotebook',
      'deleteNotebook'
    ]),
    onCreate() {
      this.$prompt('请输入笔记本标题', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不能超过30个字符'
      }).then(({ value }) => {
        this.addNotebook({ title: value })
      })
    },
    onEdit(notebook) {
      this.$prompt('请输入笔记本标题', '修改笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不能超过30个字符',
        inputValue: notebook.title,
      }).then(({ value }) => {
        this.updateNotebook({ notebookId: notebook._id, title: value })
      })
    },
    onDelete(notebook) {
      this.$confirm('确认删除笔记本吗', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         this.deleteNotebook({ notebookId: notebook._id })
      })
    }
  },
  created() {
    this.getNotebooks()
  }
}
</script>

<style scoped lang="less">
</style>
