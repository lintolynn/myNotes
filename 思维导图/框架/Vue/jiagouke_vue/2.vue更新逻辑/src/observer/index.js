// 把data中的数据 都使用Object.defineProperty重新定义 es5
// Object.defineProperty 不能兼容ie8 及以下 vue2 无法兼容ie8版本
import {arrayMethods} from './array.js'
import {
    isObject,def
} from '../util/index'
import Dep from './dep.js';
// 后续我可以知道它是不是一个已经观察了的数据 __ob__
class Observer{  
    constructor(value){  // 仅仅是初始化的操作
        this.dep = new Dep; // 给数组用的
        // vue如果数据的层次过多 需要递归的去解析对象中的属性，依次增加set和get方法
        // value.__ob__ = this; // 我给每一个监控过的对象都增加一个__ob__属性
        def(value,'__ob__',this);
        if(Array.isArray(value)){
            // 如果是数组的话并不会对索引进行观测 因为会导致性能问题
            // 前端开发中很少很少 去操作索引 push shift unshift 
            value.__proto__ = arrayMethods;
            // 如果数组里放的是对象我再监控
            this.observerArray(value); //  这里虽然递归了 但是没有依赖收集
        }else{
             // 对数组监控
            this.walk(value); // 对对象进行观测
        }
    }
    observerArray(value){ // [{}]
        for(let i = 0; i < value.length;i++){
            observe(value[i]);
        }
    }
    walk(data){
        let keys = Object.keys(data); // [name,age,address]
        // 如果这个data 不可配置 直接reurn
        keys.forEach((key)=>{
            defineReactive(data,key,data[key]);
        });
    }
}
// Vue.observable
function defineReactive(data,key,value){
    let dep = new Dep(); // 这个dep 是为了给对象使用的
    // 这里这个value可能是数组 也可能是对象 ，返回的结果是observer的实例，当前这个value对应的observer
    let childOb = observe(value); // 数组的observer实例
    Object.defineProperty(data,key,{
        configurable:true,
        enumerable:true,
        get(){ //  获取值的时候做一些操作 
           // 每个属性都对应着自己的watcher
            if(Dep.target) { // 如果当前有watcher 
                dep.depend(); // 意味着我要将watcher存起来
                if(childOb){ // *******数组的依赖收集*****
                    childOb.dep.depend(); // 收集了数组的相关依赖 
                    // 如果数组中还有数组
                    if(Array.isArray(value)){
                        dependArray(value);
                    } 
                }
            }
            return value;
        },
        set(newValue){ // 也可以做一些操作
            // console.log('更新数据')
            if(newValue === value) return;
            observe(newValue); // 继续劫持用户设置的值，因为有可能用户设置的值是一个对象
            value = newValue;
            dep.notify(); // 通知依赖的watcher来进行一个更新操作
        }
    });
}
function dependArray(value){
    for(let i =0 ; i < value.length;i++){
        let current = value[i]; // 将数组中的每一个都取出来，数据变化后 也去更新视图
        // 数组中的数组的依赖收集
        current.__ob__ && current.__ob__.dep.depend();
        if(Array.isArray(current)){
            dependArray(current);
        }
    }
} 
export function observe(data) {
    let isObj = isObject(data);
    if (!isObj) {
        return
    }
    return new Observer(data); // 用来观测数据
}
