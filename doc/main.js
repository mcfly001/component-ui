import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import { routes } from './router'
import './scss/index.scss'
import demoBlock from './components/demo-block.vue'
import FireUi from 'src/index.js'
import 'highlight.js/styles/color-brewer.css';

Vue.component('demo-block', demoBlock)
Vue.config.productionTip = false
Vue.use(Router)
Vue.use(FireUi)

let router = new Router({
  routes
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
