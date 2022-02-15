let {compile} = require('vue-template-compiler')

let render = compile('<div v-my="xxx"></div>')

// ast 语法树
console.log(render.render)


Vue.directive('MY',()=>{
    
})

// watch,computed (watcher)
// vuex
// keep-live