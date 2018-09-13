#### yaxis-scroll 纵轴滚动
##### 引入依赖
``` javascript
// 在main.js里面引入
import { YaxisScroll } from '@2dfire/component-ui'
import '@2dfire/component-ui/lib/index.css'

Vue.component(YaxisScroll.name, YaxisScroll)
```

##### 基础用法
``` html
// ⚠️必须要在外层一定要添加一个高度，一般可以设置html为100%， 然后继承下来
<div class="wrapper" style="500px">
  <yaxis-scroll :options="options"
                @reset-date="resetDate"
                @before-scroll="beforeScroll"
                @scroll="scroll"
                @get-more-date="getMoreDate">
    <li v-for="(item, $index) in items" :key="$index">
      {{item.name}}
    </li>
    <loading class="loading"></loading>
  </yaxis-scroll>
</div>
```
``` javascript
export default{
  data(){
    return {
        options: {
            scrollToOrigin: true,
            listenScroll: true,
            beforeScroll: true,
            pulldown: true,
            pullup: true
        },
        items: [
          {
            "id": 1,
            "name": "营销价值"
          },
          {
            "id": 2,
            "name": "产品优势"
          },
          {
            "id": 3,
            "name": "会员搭建"
          },
          {
            "id": 4,
            "name": "营销工具"
          },
          {
            "id": 5,
            "name": "营销渠道"
          },
          {
            "id": 6,
            "name": "会员痛点"
          },
          {
            "id": 7,
            "name": "活动营销"
          },
          {
            "id": 8,
            "name": "营销价值8"
          },
          {
            "id": 9,
            "name": "产品优势9"
          },
          {
            "id": 10,
            "name": "营销价值"
          },
          {
            "id": 11,
            "name": "营销价值"
          },
          {
            "id": 12,
            "name": "产品优势"
          },
          {
            "id": 13,
            "name": "会员搭建"
          }
      ]
    }
  },
  methods: {
    getMoreDate(){
      this.items = this.items.concat(list)
      console.log('getMoreDate')
    },
    resetDate(){
      console.log('resetDate')
    },
    beforeScroll(){
      console.log('beforeScroll')
    },
    scroll(pos){
      console.log('scroll', pos)
    }
  }
}
```

##### API
 参数 | 类型 | 说明 | 默认值
---|---|---|---
options | Object | 滚动的配置想信息 | 见下表
items | Array | 滚动的数组 | null

##### options 内配置信息
 参数 | 类型 | 说明 | 默认值
---|---|---|---
beforeScroll | Boolean | 是否派发滚动前事件 | false
listenScroll | Boolean | 是否派发滚动事件 | false
pulldown | Boolean | 下拉刷新 | false
pullup | Boolean | 上拉加载 | false

##### 方法
 参数 | 说明
---|---
before-scroll | 滚动前事件，必须在options里面设置pullup为true
scroll | 滚动事件，必须在options里面设置listenScroll为true
reset-date | 下拉刷新，必须在options里面设置pulldown为true
get-more-date | 下拉加载事件，必须在options里面设置pullup为true

