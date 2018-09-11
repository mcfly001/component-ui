import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import { routes } from './router'
import demoBlock from './components/demo-block.vue'
import FirePcComponentUi from 'src/index.js'
import 'highlight.js/styles/color-brewer.css'
import './scss/index.scss'
import '../packages/theme-chalk/src/index.scss'

Vue.use(Router)
Vue.use(FirePcComponentUi)
Vue.component('demo-block', demoBlock)
Vue.config.productionTip = false

let router = new Router({
  routes
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
