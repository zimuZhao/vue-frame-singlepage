<template>
  <div class="layout">
    <v-header/>

    <el-row class="main">
      <v-left-menu class="pull-left"/>
      <div class="pull-left content">
        <div class="m-l-10">
          <slot></slot>
        </div>
      </div>
    </el-row>

    <v-footer class="footer"/>
  </div>
</template>

<script>
import vHeader from './Header.vue'
import vFooter from './Footer.vue'
import vLeftMenu from './LeftMenu.vue'

export default {
  name: 'Page',
  components: {
    vHeader,
    vFooter,
    vLeftMenu,
  },
  data () {
    return {}
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.layout {
  position: relative;
  margin: 0;
  padding: 0;
  min-width: 1260px;
  text-align: center;
  color: #fff;

  .main {
    width: 1260px;
    margin: 15px auto;

    .pull-left {
      float: left;
    }

    .content {
      width: 1120px;

      .m-l-10 {
        margin-left: 10px;
      }
    }
  }

  .footer {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
