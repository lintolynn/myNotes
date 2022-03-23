import Watcher from './observer/watcher';
import {patch} from './vdom/patch'



export function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        const vm  = this;
        // 虚拟节点对应的内容
        // index作为key 会导致更新的时候 出现复用的问题
       
        const prevVnode = vm._vnode;  // 保存上一次渲染的虚拟节点为了实现比对效果
        // 第一次默认 肯定不需要diff算法
        vm._vnode = vnode; // 真实渲染的内容
        if(!prevVnode){
            vm.$el = patch(vm.$el,vnode); // 需要用虚拟节点创建出真实节点 替换掉 真实的$el
        }else{
            vm.$el = patch(prevVnode,vnode);
        }
        // 我要通过虚拟节点 渲染出真实的dom
    }
}

export function mountComponent(vm,el){
    const options = vm.$options; // render
    vm.$el = el; // 真实的dom元素


    // Watcher 就是用来渲染的
    // vm._render 通过解析的render方法 渲染出虚拟dom _c _v _s
    // vm._update 通过虚拟dom 创建真实的dom  
    callHook(vm,'beforeMount');
    // 渲染页面
    let updateComponent = () =>{ // 无论是渲染还是更新都会调用此方法
        // 返回的是虚拟dom
        vm._update(vm._render());
    }
    // 渲染watcher 每个组件都有一个watcher   
    new Watcher(vm,updateComponent,()=>{},true); // true表示他是一个渲染watcher
    callHook(vm,'mounted');
}

export function callHook(vm,hook){
    const handlers = vm.$options[hook]; // [fn,fn,fn]
    if(handlers){ // 找到对应的钩子依次执行
        for(let i =0; i< handlers.length;i++){
            handlers[i].call(vm);
        }
    }
}