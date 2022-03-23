import {
    pushTarget,
    popTarget
} from './dep.js';

import {queueWatcher} from './schedular'
let id = 0;
class Watcher {
    constructor(vm, exprOrFn, callback, options) {
        this.vm = vm;
        this.callback = callback;
        this.options = options;
        this.id = id++;
        this.getter = exprOrFn; // 将内部传过来的回调函数 放到getter属性上
        this.depsId = new Set(); // es6中的集合 （不能放重复项）
        this.deps = [];
        this.get(); // 调用get方法 会让渲染watcher执行
    }
    addDep(dep) { // watcher 里不能放重复的dep  dep里不能放重复的watcher
        let id = dep.id;
        if (!this.depsId.has(id)) {
            this.depsId.add(id);
            this.deps.push(dep);
            dep.addSub(this);
        }
    }
    get() {
        pushTarget(this); // 把watcher存起来  Dep.target = this
        this.getter(); // 渲染watcher的执行  
        popTarget(); // 移除watcher
    }
    update() {
        queueWatcher(this);
        // console.log(this.id)
        // 等待着 一起来更新 因为每次调用update的时候 都放入了watcher
        // this.get();
    }
    run(){
        this.get();
    }
}
// 下次课 会带大家看一次vue的源代码

// 在模板中取值时 会进行依赖收集 在更改数据是会进行对应的watcher 调用更新操作
// dep 和 watcher 是一个多对多的关系  dep里存放着相关的watcher 是一个观察者模式
export default Watcher