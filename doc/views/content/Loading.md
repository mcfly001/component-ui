#### loading 加载中
##### 引入依赖
``` javascript
// 在main.js里面引入
import { Loading } from '@2dfire/component-ui'
import '@2dfire/component-ui/lib/index.css'

Vue.component(Loading.name, Loading)
```


##### 基础用法
``` html
<div>
    <loading class="loading"></loading>
    <loading class="loading" :type="2"></loading>
</div>
```

##### API
 参数 | 类型 | 说明 | 默认值
---|---|---|---
type | Number | loading的类型 | 1
