/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.

  // 这个Util对象是Vue的api 但是不建议用户使用  vue-router
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }
  // 面试常问 对象只会拦截已经存在的属性   数组更改索引也是不会发生视图更新
  Vue.set = set  // set方法
  Vue.delete = del // delete方法
  Vue.nextTick = nextTick // 默认是微任务 -》 宏任务

  // 2.6 explicit observable API  多个组件共享数据 我就可以使用Vue.observable 全局对象
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }

  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    //  Vue.options.components / filters/ directives
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue
  // 融合keep-alive
  extend(Vue.options.components, builtInComponents)
  // 插件的使用
  initUse(Vue) 
  // mixin
  initMixin(Vue)
  // Vue.extend 可以通过组件的实例获取组件的构造函数   可以实现手动挂载.
  initExtend(Vue)
  // 初始化组件 过滤器 指令
  initAssetRegisters(Vue)
}
