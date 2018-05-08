<template>
  <div class="header">
    <div class="container">
      <span class="logo-title">单页应用测试</span>

      <div class="login-info">
        <span class="login-name">欢迎您，{{nickName}}</span>
        <a href="javascript:" @click="loginOut">
          <i class="exit"/>
        </a>
      </div>

    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {getUserInfo, getLoginOut} from '@/api/common'

export default {
  name: 'Header',
  data () {
    return {
      nickName: '',
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    ...mapActions([
      'setUserInfo',
    ]),
    getUser () {
      getUserInfo().then((data) => {
        this.nickName = data.uName
        this.setUserInfo(data)
      })
    },

    loginOut () {
      getLoginOut().then(() => {
        location.href = `http://ssa.jd.com/sso/login?ReturnUrl=${location.href}`
      })
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  display: block;
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #eee;
  color: #fff;
  background: #253646;
  box-sizing: border-box;

  .container {
    width: 1260px;
    margin: 0 auto;
    text-align: left;

    .logo-title {
      font-size: 16px;
      color: #FFFFFF;
      letter-spacing: 1px;
    }

    .login-info {
      float: right;
      font-size: 12px;
      color: #FFFFFF;

      .login-name {
        margin-right: 10px;
      }

      .exit {
        display: inline-block;
        width: 14px;
        height: 14px;
        cursor: pointer;
        background: url('./../../public/images/exit.svg') no-repeat;
        background-size: 100%;
        background-position-y: 1px;
      }
    }
  }

}
</style>
