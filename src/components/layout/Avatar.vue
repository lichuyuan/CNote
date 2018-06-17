<template>
  <li class="nav-header">
    <div class="dropdown profile-element">
        <span>
          <img alt="image" class="img-circle" :src="user.avatar === undefined ? 'http://localhost:5000/static/img/default.png':`http://localhost:5000/user/avatar/${ user.avatar }`" />
        </span>
        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
          <span class="clear">
            <span class="block m-t-xs">
              <strong class="font-bold" style="color: white">{{ username }}</strong>
              <span clas  s="text-muted text-xs block"><b class="caret"></b></span>
            </span>
          </span>
        </a>
        <ul class="dropdown-menu animated fadeInRight m-t-xs">
          <li><a>修改头像</a></li>
          <li class="divider"></li>
          <li><a>Logout</a></li>
        </ul>
    </div>
    <div class="logo-element">
      Note
    </div>
  </li>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    username() {
      return this.user.username === undefined ? '未登录' : this.user.username
    }
  },
  methods: {
  },
  created() {
  }
}
</script>

<style scoped>
  .img-circle {
    width: 50px;
  }
</style>
