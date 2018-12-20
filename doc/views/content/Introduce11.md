#### 使用指南

##### 安装
``` javascript
npm install @2dfire/component-ui --save-dev
```

##### 引入组件
- 方式一(推荐)： 使用  [babel-plugin-component](https://www.npmjs.com/package/babel-plugin-component)
``` javascript
// 安装babel-plugin-component
npm install babel-plugin-component --save-dev
```
``` javascript
// 在.babelrc 下面添加插件配置
{
    plugin: [
        xxx,
        [
            "component", {
                "libraryName": "@2dfire/component-ui",
                "style": true,
            },
            "@2dfire/component-ui"
        ]
    ]
}
```

接下来你可以在代码中引入组件了， 插件会实现按需加载了
``` javascript
import { CellSwipe } from '@2dfire/component-ui'
import '@2dfire/component-ui/lib/index.css'

// 全局注册（在main.js中注册）
Vue.component(CellSwipe.name, CellSwipe)

// 在需要使用的组件内引用
export default{
    name: 'xx',
    components: {
        CellSwipe
    }
}

```

- 方式二： 导入所有组件(该方式不允许使用babel-plugin-component)
``` javascript
// 在main.js中引入插件
import Vue from 'vue'
import * as mobileUi from '@2dire/component-ui'
import '@2dfire/component-ui/dist/index.css'

Vue.use(mobileUi)
```

##
**⚠️最终打包的css单位为px，如果要转换成rem，需要在对应工程中去配置postcss-pxtorem，此外注意在webpack的test: /\.css$/中不要去忽略node_module,postcss-pxtorem简单配置如下**

``` javascript
postcss: [
      require('postcss-pxtorem')({
        rootValue: 37.5,
        unitPrecision: 5, // 转换成rem后的小数点位数
        propList: ['*', '!font-size'], // 需要转换的css属性列表
        minPixelValue: 1.1, // 设置一个最小值，小于这个值就不会被转换为rem
      }),
      require('autoprefixer')({
        browsers: ['last 2 versions', 'Android > 4', 'iOS > 6', 'Safari > 6']
      })
    ]
```
