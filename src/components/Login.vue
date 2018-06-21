<template>
  <div class="col-lg-8" v-show="false">
    <div class="ibox float-e-margins">
      <div id="modal-form" class="modal fade" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content animated fadeInDown">
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-6 b-r">
                  <h3 class="m-t-none m-b">登录</h3>
                  <p>欢迎</p>
                  <div class="form-group">
                    <label>用户名</label>
                    <input type="text" class="form-control" placeholder="Username" v-model="login.username">
                  </div>
                  <div class="form-group">
                    <label>密码</label>
                    <input type="password" class="form-control" placeholder="Password" v-model="login.password">
                  </div>
                  <div>
                    <button class="btn btn-sm btn-primary pull-right m-t-n-xs" @click="onLogin">
                      <strong>登录</strong>
                    </button>
                    <label :class="{error: login.isError}" style="font-size: 12px;">{{ login.notice }}</label>
                  </div>
                </div>
                <div class="col-sm-6 b-r">
                  <h3 class="m-t-none m-b">还没有账户？</h3>
                  <p>立即创建</p>
                  <p class="text-center" v-show="!isShowRegister" @click="showRegister">
                    <a><i class="fa fa-sign-in big-icon"></i></a>
                  </p>
                  <div v-show="isShowRegister" class="animated fadeIn">
                    <div class="form-group">
                      <label>用户名</label>
                      <input type="text" class="form-control" placeholder="Username" v-model="register.username">
                    </div>
                    <div class="form-group">
                      <label>密码</label>
                      <input type="password" class="form-control" placeholder="Password" v-model="register.password">
                    </div>
                    <div>
                      <button class="btn btn-sm btn-primary pull-right m-t-n-xs" @click="onRegister">
                        <strong>注册</strong>
                      </button>
                      <label :class="{error: register.isError}" style="font-size: 12px;">{{ register.notice }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data(){
    return {
      isShowRegister: false,
      login: {
        username: '',
        password: '',
        notice: '请输入用户名和密码',
        isError: false
      },
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
      userLogin: 'login',
      userRegister: 'register'
    }),
    onLogin(){
      if(!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.login.username)){
        this.login.isError = true
        this.login.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
        return
      }
      if(!/^.{6,16}$/.test(this.login.password)){
        this.login.isError = true
        this.login.notice = '密码长度为6~16个字符'
        return
      }
      this.login.isError = false
      this.login.notice = ''
      this.userLogin({ username: this.login.username, password: this.login.password })
        .then(res => {
          this.login.isError = false
          this.login.notice = ''
          this.login.username = ''
          this.login.password = ''
          const loginModal = document.querySelector('#modal-form').classList
          loginModal.remove('in')
          loginModal.remove('showLogin')
          this.$message.success('登录成功')
          this.$router.push('/notebooks')
        }).catch(error => {
          this.login.isError = true
          this.login.notice = error.message
      })
    },
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
        this.register.username = ''
        this.register.password = ''
        const loginModal = document.querySelector('#modal-form').classList
        loginModal.remove('in')
        loginModal.remove('showLogin')
        this.$message.success('注册成功，已自动登录')
        this.$router.push('/notebooks')
      }).catch(error => {
        console.log('error', error)
        this.register.isError = true
        this.register.notice = error.message
      })
    },
    showRegister() {
      this.isShowRegister = true
    },
  }
}
</script>

<style>
  .showLogin {
    display: block !important;
    padding-right: 17px !important;
    background: rgba(0, 0, 0, 0.5) !important;
  }
</style>
