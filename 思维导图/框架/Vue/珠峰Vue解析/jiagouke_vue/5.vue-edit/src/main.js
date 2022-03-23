// 默认vue 就是runtime-only 不识别模板
import Vue from 'vue'
import App from './App.vue'


new Vue({
  // template:'<div>hello</div>'

  // h createElement 渲染组件
  render: h => {
    return h(App) // 流程需要将这个对象 转化成虚拟dom 在进行渲染组件
  },
  // 直接渲染这个组件
  // ...App
}).$mount('#app')
