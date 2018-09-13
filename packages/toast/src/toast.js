import Vue from 'vue'
const ToastContructor = Vue.extend(require('./Toast.vue').default)

let toastPool = []

let getToastInstance = (options) => {
  if(toastPool.length > 0){
    let Toastinstance = toastPool[0]
    Toastinstance.message = typeof options === 'string' ? options : options.message
    Toastinstance.iconClass = options.iconClass
    toastPool.splice(0, 1)
    return Toastinstance
  }

  return new ToastContructor({
    name: 'Toast',
    data: {
      message: typeof options === 'string' ? options : options.message,
      visible: false,
      iconClass: options.iconClass || '',
      closed: false
    }
  })
}

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

let returnAnInstance = instance => {
  if (instance) {
    toastPool.push(instance)
  }
}

ToastContructor.prototype.close = function () {
  this.visible = false
  this.$el.addEventListener('transitionend', removeDom)
  this.closed = true
  returnAnInstance(this)
}

const Toast = (options = {}) => {
  let duration = options.duration || 3000
  // 生成一个实例
  let ToastInstance = getToastInstance(options)
  ToastInstance.name = "Toast"
  console.log(ToastInstance)
  // 组件挂载到dom元素上
  ToastInstance.$mount()
  ToastInstance.closed = false
  clearTimeout(ToastInstance.timer)
  document.body.appendChild(ToastInstance.$el)
  Vue.nextTick(function () {
    ToastInstance.visible = true
    ToastInstance.$el.removeEventListener('transitionend', removeDom)
    ToastInstance.timer = setTimeout(function(){
      if(ToastInstance.closed) return
      ToastInstance.close()
    }, duration)
  })
  return ToastInstance
}



export default Toast
