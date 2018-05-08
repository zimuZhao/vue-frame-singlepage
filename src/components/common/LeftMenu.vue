<template>
  <el-menu class="menu"
           text-color="#333"
           active-text-color="#fff"
           background-color="#F1F3F5"
           :default-active="activeMenu"
           @select="changeMenu">
    <el-menu-item class="single-menu" v-for="item in menuList" v-if="!item.resources.length" :index="item.url"
                  :key="item.id">
      <i :class="item.css"/>
      <span slot="title">{{item.name}}</span>
    </el-menu-item>

    <el-submenu v-for="item in menuList" v-if="item.resources.length" :index="item.id+''" :key="item.id">
      <template slot="title">
        <i :class="item.css"/>
        <span slot="title">{{item.name}}</span>
      </template>
      <el-menu-item v-for="inner in item.resources" :key="inner.id" :index="inner.url">{{inner.name}}</el-menu-item>
    </el-submenu>

  </el-menu>
</template>

<script>
import {mapActions} from 'vuex'
import {
  Menu as elMenu,
  MenuItem as elMenuItem,
  Submenu as elSubmenu,
} from 'element-ui'
import {getMenu} from '@/api/common'

export default {
  name: 'LeftMenu',
  components: {elMenu, elMenuItem, elSubmenu},
  data () {
    return {
      isCollapse: false,
      activeMenu: location.hash.substr(2),
      menuList: [],
    }
  },
  created () {
    this.getActive()
    this.loadingMenu()
  },
  watch: {
    $route (to, from) {
      this.activeMenu = to['path'].split('/')[1]
    },
  },
  methods: {
    ...mapActions([
      'setMenu',
    ]),
    changeMenu (index) {
      const _vm = this
      _vm.activeMenu = index
      _vm.$router.push({name: index})
    },
    getActive () {
      setTimeout(() => {
        this.activeMenu = location.hash.split('/')[1]
      }, 500)
    },
    loadingMenu () {
      getMenu().then((data) => {
        this.menuList = data
        this.setMenu(data)
      })
    },
  },
}
</script>

<style lang="less">
i {
  display: inline-block;
  width: 16px;
  height: 16px;
}

i.cdjk {
  background: url('./../../public/images/menu/cdjk.svg') no-repeat left center;
}

i.rwjk {
  background: url('./../../public/images/menu/rwjk.svg') no-repeat left center;
}

.menu {
  width: 130px;
  border: 0 !important;

  .el-menu-item {
    padding: 0 10px !important;
    margin-bottom: 4px;
    height: 32px;
    line-height: 31px;
    text-align: left;
    font-size: 14px;
    color: #333333;
  }

  .el-menu-item:hover {
    background-color: #D9DDE1 !important;
    border-radius: 2px;
  }

  .is-active {
    background-color: #42C0FB !important;
    border-radius: 2px;
    i.cdjk {
      background: url('./../../public/images/menu/cdjk-active.svg') no-repeat left center;
    }

    i.rwjk {
      background: url('./../../public/images/menu/rwjk-active.svg') no-repeat left center;
    }

  }

  .el-submenu {
    .el-menu-item {
      padding: 0 10px 0 30px !important;
      min-width: 128px;
    }

    .el-submenu__title {
      padding: 0 10px !important;
      height: 32px;
      line-height: 31px;
      text-align: left;
      font-size: 14px;
      color: #333333;
    }

    .el-submenu__icon-arrow {
      right: 10px;
    }

  }
}
</style>
