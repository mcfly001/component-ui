#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { tranformStr } = require('../template/units')
const { packageIndexJs } = require('../template/srcIndex')
const { demoRouterIndexJs } = require('../template/demoRoute')
const { docRouterIndexJs } = require('../template/docRoute')
const colors = require( "colors")
// 获取要打包的包名称
const packageName = process.argv.splice(2)[0]
const packagesPath = path.join(__dirname, '../packages')
const docPath = path.join(__dirname, '../doc')
const demoPath = path.join(__dirname, '../demo')
const tranformPackageName = tranformStr(packageName)

const templateJs = `export { default } from './src/${tranformPackageName}.vue'`
const templateVue = `<template>
 <${packageName}></${packageName}>
</template>

<script>
import ${tranformPackageName} from 'packages/${tranformPackageName}'
export default {
  data(){
    return {
      
    }
  },
  components: {
    ${tranformPackageName}
  }
}
</script>
`

const templateVue2 = `<template>

</template>

<script>
export default {
  name: '${tranformPackageName}',
  data(){
    return {
      
    }
  }
}
</script>
`

// 读取packages下面的所有组件名称
fs.readdir(packagesPath, function (err, files) {
  if(err) {throw err}
  if(!files.includes(tranformPackageName)){
    // 在packages目录下面创建包
    fs.mkdirSync(`${packagesPath}/${tranformPackageName}`, '0777')
    fs.mkdirSync(`${packagesPath}/${tranformPackageName}/src`, '0777')
    fs.writeFileSync(`${packagesPath}/${tranformPackageName}/index.js`, templateJs)
    fs.writeFileSync(`${packagesPath}/${tranformPackageName}/src/${tranformPackageName}.vue`, templateVue2)

    // 在doc/views/content目录下生成文档
    fs.writeFileSync(`${docPath}/views/content/${tranformPackageName}.md`, '请在这里输入组件文档内容')

    // 在demo/views下面生成案例组件
    fs.writeFileSync(`${demoPath}/views/${tranformPackageName}.vue`, templateVue)

    files.push(tranformPackageName)
    packageIndexJs(files)
    demoRouterIndexJs(files)
    docRouterIndexJs(files)
  }
  else{
    console.warn('已存在同名包，请修改包名称'.red)
  }
})

