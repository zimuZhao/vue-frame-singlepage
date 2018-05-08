import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import store from './store'

import {
  Row, Col,
  Loading,
} from 'element-ui'

// 公共css文件
import 'element-ui/lib/theme-chalk/index.css'
import '@/public/style/common.less'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.component('el-row', Row)
Vue.component('el-col', Col)
Vue.use(Loading.directive)
Vue.prototype.$ELEMENT = {size: 'small'}

const vm = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})

Vue.use(vm)
