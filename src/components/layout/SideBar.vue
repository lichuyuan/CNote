<template>
  <nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
      <ul class="nav metismenu" id="side-menu">
        <avatar></avatar>
        <router-link tag="li" v-for="(s, index) in sides" :to="s.link" :key="index" active-class="active">
          <a>
            <i :class="s.icon"></i>
            <span class="nav-label">{{ s.name }}</span>
          </a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
import avatar from '@/components/layout/Avatar'

export default {
  components: {
    avatar,
  },
  data() {
    return {
      sides: [
        {
          link: '/note',
          icon: 'fa fa-pencil',
          name: '笔记'
        },
        {
          link: '/notebooks',
          icon: 'fa fa-th-list',
          name: '笔记本管理'
        },
        {
          link: '/trash',
          icon: 'fa fa-trash',
          name: '回收站'
        },
      ]
    }
  },
  methods: {
  },
}

</script>

<style lang="less">

</style>

