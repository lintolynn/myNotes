import {
    createElement,
    createTextNode
} from './vdom/create-element'
export function renderMixin(Vue) {
    // _c 创建元素的虚拟节点
    // _v 创建文本的虚拟节点
    // _s JSON.stringify

    Vue.prototype._c = function () {
        return createElement(this,...arguments); // tag,data,children1,children2
    }
    Vue.prototype._v = function (text) {
        return createTextNode(this,text);
    }
    Vue.prototype._s = function (val) {
        return val == null ? '' : (typeof val === 'object' ? JSON.stringify(val) : val);
    }
    Vue.prototype._render = function () {
        const vm = this;
        const {
            render
        } = vm.$options;
        let vnode = render.call(vm); // 去实例上 取值

        return vnode;
    }
}

// 下次课 讲diff 非常简单易懂  单元测试
// 下周 ssr  vuex  周日  下下周 晚上 3个小时  讲两天项目
