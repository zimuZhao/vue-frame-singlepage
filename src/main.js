import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'

const vm = new Vue({
  el: '#app',
  router,
  render: h => h(App),
})

Vue.use(vm)
Vue.use(VueRouter)
