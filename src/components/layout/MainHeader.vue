<template>
  <div class="row border-bottom">
    <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
      <div class="navbar-header">
        <a class="navbar-minimalize minimalize-styl-2 btn btn-primary"><i class="fa fa-bars" ></i> </a>
      </div>
      <ul class="nav navbar-top-links navbar-right">
        <li>
          <span class="m-r-sm text-muted welcome-message">Welcome to take notes.</span>
        </li>
        <li @click="onLogout">
          <a>
            <i class="fa fa-sign-out"></i> Logout
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'logout'
    ]),
    onLogout() {
      this.logout()
      this.$router.push('/')
    },
  }
}

</script>

<style scoped lang="less">

  #sidebar {
    position: relative;
    width: 56px;
    text-align: center;
    background-color: #2c333c;

    .icons {
      margin-top: 15px;
      a {
        padding: 6px 0;
        display: block;
      }
      .router-link-active {
        background-color: #5e6266;
      }
    }

    .logout {
      position: absolute;
      bottom: 20px;
      width: 100%;
      text-align: center;
      cursor: pointer;
    }
    .iconfont {
      color: #fff;
    }
  }

  </style>

