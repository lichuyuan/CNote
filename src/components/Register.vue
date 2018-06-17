<template>
  <div class="other-bg">
    <div class="middle-box text-center loginscreen animated fadeInDown">
      <div>
        <div>
          <h3 class="logo-name" style="font-size: 95px;">TODO+</h3>
        </div>
        <h3>Register to TODO+</h3>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Username" v-model="register.username">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Password" v-model="register.password">
        </div>
          <button class="btn btn-primary block full-width m-b" @click="onRegister">注册</button>
          <p class="m-t" :class="{error: register.isError}"><small>{{ register.notice }}</small></p>
          <p class="text-muted text-center"><small>已经拥有一个账户？</small></p>
          <a class="btn btn-sm btn-white btn-block" href="/login">登录</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data(){
    return {
      register: {
        username: '',
        password: '',
        notice: '创建账号后，请记住用户名和密码',
        isError: false
      }
    }
  },
  methods: {
    ...mapActions({

    }),
    onRegister(){
      if(!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.register.username)){
        this.register.isError = true
        this.register.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
        return
      }
      if(!/^.{6,16}$/.test(this.register.password)){
        this.register.isError = true
        this.register.notice = '密码长度为6~16个字符'
        return
      }
      this.register.isError = false
      this.register.notice = ''
      this.userRegister({
        username: this.register.username,
        password: this.register.password
      }).then(res => {
          this.register.isError = false
          this.register.notice = ''
          this.$router.push('/note')
        }).catch(error => {
          this.register.isError = true
          this.register.notice = error.msg
      })
    },
  }
}
</script>



<style lang="less">

</style>
