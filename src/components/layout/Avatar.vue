<template>
  <li class="nav-header">
    <div class="dropdown profile-element">
        <span>
          <img alt="image" class="img-circle" :src="imgUrl" />
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
      CNote
    </div>
  </li>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { baseUrl } from '@/helpers/config-baseUrl'

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
    },
    imgUrl() {
      const u = baseUrl.slice(0, -7)
      if (!this.user.avatar) {
        return `${u}/static/img/default.png`
      } else {
        return `${baseUrl}/user/avatar/${this.user.avatar}`
      }
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
