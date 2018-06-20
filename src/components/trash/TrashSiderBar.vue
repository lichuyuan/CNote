<template>
    <div class="col-lg-3">
      <div class="ibox">
        <div class="ibox-content">
          <h3>回收站</h3>
          <ul class="sortable-list connectList agile-list">
            <router-link tag="li" v-for="n in trashNotes" :key="n._id" :to="`/trash?noteId=${n._id}`" exact-active-class="warning-element">
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
    }
  },
  computed: {
    ...mapGetters([
      'trashNotes',
    ])
  },
  methods: {
    ...mapMutations([
      'setCurTrashNote'
    ]),
  },
}
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
