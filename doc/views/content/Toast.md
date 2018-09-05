#### Toast
##### 引入依赖
``` javascript
// 在main.js里面引入
import { Toast } from '@2dfire/component-ui'
import '@2dfire/component-ui/lib/index.css'

Vue.prototype.$toast = Toast
```

##### 基础用法
``` html
<div>
    <button type="button" @click="foo1">显示toast1</button>
    <button type="button" @click="foo2">显示toast2</button>
    <button type="button" @click="foo3">显示toast3</button>
</div>
```
``` javascript
// 三种配置方式
export default{
  methods: {
    foo1(){
        this.$toast('这个是测试1')
    },
    foo2(){
        this.$toast({
            message: '这个是测试2',
            iconClass: 'success',
        })
    },
    foo3(){
        this.$toast({
            message: '这个是测试3',
            iconClass: 'fail',
            duration: 500
        })
    }
  }
}
```

##### API
- 当传入的是一个String类型，而不是对象时候，默认传入的是message的配置信息

 参数 | 类型 | 说明 | 默认值
---|---|---|---
message | String | 弹出框的内容 | ''
iconClass | String | 弹出框的icon的类名 | ''
duration | Number | 弹出框显示的时间，单位是ms | 3000

