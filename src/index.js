import ElButton from '../packages/ElButton'
   
const install = function(Vue, options = {}){
  if (install.installed) return
  Vue.component(ElButton.name, ElButton)
  
}
    
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
    
module.exports = {
  install,
  ElButton,

}