<template>
  <div id="page-wrapper" class="gray-bg">
    <main-header></main-header>
    <div class="wrapper wrapper-content animated fadeInRight">
      <router-view></router-view>
      <main-login></main-login>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
import MainLogin from '@/components/login'

export default {
  components: {
    MainHeader,
    MainFooter,
    MainLogin
  },
  methods: {
  }
}

</script>

<style scoped lang="less">

</style>

