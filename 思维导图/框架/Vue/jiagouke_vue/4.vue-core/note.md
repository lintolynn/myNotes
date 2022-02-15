## 库 和 框架
- 库 是我们调用库中的方法 实现逻辑
- 框架 我们把代码写到特定的位置上 框架本身调用我的逻辑

## MVC MVVM
- model controller view  我们在全栈开发 view视图 -> controller (路由) -> model
- 前后端分离： 前端部分 MVC backbone （获取数据后手动渲染到页面中） / MVVM 双向绑定 model viewModel view  (视图和数据交互 自动映射的关系，不需要手动的操作dom)


## vue渐进式框架
我们可以使用局部功能也可以使用完整功能
vue的响应式原理 + vue的组件化的功能 + vue-router + vuex + vue-cli

## Vue没有遵循MVVM模式
- MVVM view 和model 不能通信 必须通过view model vue可以直接不通过viewModel 来操作视图
- React 只是做V层 视图层  ref

