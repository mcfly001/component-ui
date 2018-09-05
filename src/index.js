import CellSwipe from '../packages/cell-swipe'
import Loading from '../packages/loading'
import Toast from '../packages/toast'
import XaxisScroll from '../packages/xaxis-scroll'
import YaxisScroll from '../packages/yaxis-scroll'
   
const install = function(Vue, options = {}){
  if (install.installed) return
  Vue.component(CellSwipe.name, CellSwipe)
  Vue.component(Loading.name, Loading)
  Vue.component(XaxisScroll.name, XaxisScroll)
  Vue.component(YaxisScroll.name, YaxisScroll)
  Vue.$toast = Vue.prototype.$toast = Toast
}
    
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
    
module.exports = {
  install,
  CellSwipe,
  Loading,
  Toast,
  XaxisScroll,
  YaxisScroll
}
