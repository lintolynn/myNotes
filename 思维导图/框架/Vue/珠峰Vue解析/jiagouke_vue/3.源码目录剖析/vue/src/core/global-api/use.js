/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
// 插件A    插件B   不需要让插件 强依赖vue
  Vue.use = function (plugin: Function | Object) {
    // 判断插件是否重复安装 
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1) // [Vue,1,2,3]
    args.unshift(this) // 在参数中增加构造函数
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
