<template>
    <div id="wrapper">
      <sider-bar></sider-bar>
      <main-view></main-view>
    </div>
</template>

<script>
import SiderBar from '@/components/layout/SideBar.vue'
import MainView from '@/components/layout/MainView.vue'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
    }
  },
  components: {
    SiderBar,
    MainView
  },
  methods: {
    ...mapActions([
      'checkLogin'
    ])
  },
  created() {
    this.checkLogin()
  }
}
</script>

<style>

</style>
