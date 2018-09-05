import Vue from 'vue'
import Router from 'vue-router'
import Introduce from '../views/Introduce.vue'
import Develop from '../views/Develop.vue'
import CellSwipe from '../views/CellSwipe.vue'
import Loading from '../views/Loading.vue'
import Toast from '../views/Toast.vue'
import XaxisScroll from '../views/XaxisScroll.vue'
import YaxisScroll from '../views/YaxisScroll.vue'
import Douchi from '../views/Douchi.vue'

Vue.use(Router)

let routes = [
  {
    path: '/',
    redirect: '/Introduce'
  },
  {
    path: '/Introduce',
    name: 'Introduce',
    component: Introduce
  },
  {
    path: '/Develop',
    name: 'Develop',
    component: Develop
  },
  {
    name: 'CellSwipe',
    path: '/CellSwipe',
    component: CellSwipe
  },
  {
    name: 'Loading',
    path: '/Loading',
    component: Loading
  },
  {
    name: 'Toast',
    path: '/Toast',
    component: Toast
  },
  {
    name: 'XaxisScroll',
    path: '/XaxisScroll',
    component: XaxisScroll
  },
  {
    name: 'YaxisScroll',
    path: '/YaxisScroll',
    component: YaxisScroll
  },
  {
    name: 'Douchi',
    path: '/Douchi',
    component: Douchi
  },
  
]

export default new Router({
  routes
})
