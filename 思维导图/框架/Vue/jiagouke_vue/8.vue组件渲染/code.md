## 一.回顾目录

```bash
src
│  index.js
│  init.js
│  lifecycle.js
│  render.js
│  state.js
│
├─compiler
│      index.js
│      parser-html.js
│
├─observer
│      array.js
│      index.js
│      watcher.js
│
├─util
│      index.js
│
└─vdom
        create-element.js
        patch.js
```

**`index.js`**

`Vue`的入口文件,当实例化`Vue`时会进行初始化操作,内部会调用各种`Mixin`方法给`Vue`的原型上添加方法

- `initMixin`增添初始化方法

- `renderMixin` 增添渲染方法，调用我们的`render`方法                           -> `lifecycle.js`

- `lifecycleMixin` 增添`update`方法，将虚拟`dom`渲染成真实`dom `         -> `render.js`

  

> 这里面最核心的两个方法 `vm._update(vm._render())`



**`init.js`**

`Vue`的初始化方法，包括后续组件的初始化。这里会初始化状态                   

- 针对用户传入的属性进行不同初始化的功能                                               -> `state.js`



**其他目录**

- compiler 实现将模板转换成`ast`树   (掌握编译流程)
- observer 观测数据 响应式原理          (掌握对象和数组的劫持方式)
- vdom       创建虚拟节点和将虚拟节点渲染成真实节点  (掌握什么是虚拟节点，以及渲染流程)



## 二.今日内容

- vue的生命周期的实现原理？
- Mixin的实现原理 (掌握mixin能做些什么？)
- vue中的依赖收集是如何实现的？
- vue中是如何实现异步更新数据？
- vue的组件系统如何实现的？



## 三.手写Vue其他特性

**前两周**

- `watch`的实现原理 及 `computed`的实现原理
- `vue`中的`DOM-DIFF`的原理  
- 实现vue中的插件机制 `Vue.use`/`Vue.install`   （源码剖析）

- 5月3日  会讲一天vue核心应用

**第三周**

- 5月6日 和 8日  讲解`VueRouter`和`Vuex`原理
- 5月10日 单元测试 及 手写`VueSSR`

**第四周**

- 5月13日 和 5月15日  组件库搭建及自己的组件库使用
- 5月17日  `vue3.0响应式原理`及`vue3.0使用`

**第五周**

- 5月20日 和 5月22日 讲解Vue项目 `element-ui` +  `vue全家桶` + `koa+mongo+docker部署`

