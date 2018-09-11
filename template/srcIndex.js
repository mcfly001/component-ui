// 拼装src目录下的index.js
const fs = require('fs')
const path = require('path')
const srcPath = path.join(__dirname, '../src')
const { tranformStr } = require('./units')
const colors = require( "colors")

module.exports = {
  packageIndexJs(files){
    let importstr = ''
    let componentstr = ''
    let modulestr = ''

    files.forEach(function(item, index){
      if(item !== 'theme-chalk' && item.indexOf('.') < 0){

        if(index + 1 === files.length){
          modulestr += `  ${tranformStr(item)}`
        }
        else{
          modulestr += `  ${tranformStr(item)},` + '\n'
        }

        importstr += `import ${tranformStr(item)} from '../packages/${item}'\n`
        if(item !== 'toast'){
          componentstr += `  Vue.component(${tranformStr(item)}.name, ${tranformStr(item)})\n`
        }
      }
    })


    let str = `${importstr}   
const install = function(Vue, options = {}){
  if (install.installed) return
${componentstr}  
}
    
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
    
module.exports = {
  install,
${modulestr}
}`
    fs.unlinkSync(srcPath + '/index.js')
    fs.writeFile(srcPath + '/index.js', str, 'utf8', function () {
      console.log('src/index.js修改成功'.green)
    })
  }
}
