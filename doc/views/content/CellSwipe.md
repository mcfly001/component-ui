#### CellSwipe 滑动删除单元格
##### 引入依赖
``` javascript
// 在main.js里面引入
import { CellSwipe } from '@2dfire/component-ui'
import '@2dfire/component-ui/lib/index.css'

Vue.component(CellSwipe.name, CellSwipe)
```

##### 基础用法
``` html
<div>
    <cell-swipe v-for="(item, $index) in items"
                class="cell-list"
                :index="$index"
                :key="$index"
                @delete-item="deleteItem">
      {{item}}
    </cell-swipe>
 </div>
```
``` javascript
export default{
  data(){
    return {
        items: ['侧滑删除1', '侧滑删除2', '侧滑删除3']
    }
  },
  methods: {
    deleteItem($index){

    }
  }
}
```

##### API
 参数 | 类型 | 说明 | 默认值
---|---|---|---
index | Number | 要删除行的索引 | 0

##### 方法
 参数 | 说明
---|---
delete-item | 删除该项列表
