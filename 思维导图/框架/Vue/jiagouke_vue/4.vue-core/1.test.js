let compiler = require('vue-template-compiler');


let t = ` <div v-for="(a,index) of arr" :key="index" v-if="a%2 === 0">
{{a}}
</div>`

//  vue-loader -> vue-template-compiler
console.log(compiler.compile(t).render)

// with(this){return (true)?_c('div',[_v("hello")]):_c('div',[_v(" world")])}