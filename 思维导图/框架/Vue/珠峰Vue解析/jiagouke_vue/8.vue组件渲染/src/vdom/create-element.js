import { isObject,isReservedTag } from "../util/index";
export function createElement(vm,tag, data = {}, ...children) {
    // ast -> render -> 调用
    let key = data.key;
    if(key){
        delete data.key;
    }
    // // 以前表示的是标签  现在是组件  名字  上下文
    if(isReservedTag(tag)){
        return vnode(tag,data,key,children,undefined);
    }else{
        // 组件  找到组件的定义
        let Ctor = vm.$options.components[tag];

        return createComponent(vm,tag,data,key,children,Ctor)
    }
}
function createComponent(vm,tag,data,key,children,Ctor){
    if(isObject(Ctor)){
        Ctor = vm.$options._base.extend(Ctor);
    }
    data.hook = {
        init(vnode){
            // 当前组件的实例 就是componentInstance
            let child = vnode.componentInstance =  new Ctor({_isComponent:true});
            // 组件的挂载 vm.$el 
            child.$mount(); // vnode.componentInstance.$el
        }
    }

    // $vnode = 当前这个组件的 vnode   占位符vnode 
    return vnode(`vue-component-${Ctor.cid}-${tag}`,data,key,undefined,{Ctor,children})
}


export function createTextNode(vm,text) {
    return vnode(undefined,undefined,undefined,undefined,text);
}

function vnode(tag, data, key, children, text,componentOptions) {
    return {
        tag,
        data,
        key,
        children,
        text,
        componentOptions
    }
}
// 虚拟节点 就是通过_c _v 实现用对象来描述dom的操作 （对象）

// 1) 将template转换成ast语法树-> 生成render方法 -> 生成虚拟dom -> 真实的dom
//  重新生成虚拟dom -> 更新dom

