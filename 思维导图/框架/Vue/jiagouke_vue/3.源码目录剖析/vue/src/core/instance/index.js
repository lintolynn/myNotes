import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// Vue的核心的构造函数
function Vue (options) {
  this._init(options)
}

initMixin(Vue)  // _init
stateMixin(Vue) // $set,$delete,$watch
eventsMixin(Vue) // $on,$emit,$off,$once
lifecycleMixin(Vue) // _update
renderMixin(Vue) // _render $nexTick

export default Vue
