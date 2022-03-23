const getScrollParent = (el)=>{
    let parent = el.parentNode;
    while (parent) {
        if(/(?:scroll)|(?:auto)/.test(getComputedStyle(parent)['overflow'])){
            return parent;
        }
        parent = parent.parentNode;
    }
    return parent;
}
const loadImageAsync = (src,resolve,reject) =>{
    let image = new Image();
    image.src = src;
    image.onload = resolve;
    image.onerror = reject;
}
const Lazy = (Vue) =>{
    // ...
    class ReactiveListener{ // 每一个图片元素 都构造成一个类的实例
        constructor({el,src,options,elRender}){
            this.el = el;
            this.src = src;
            this.options = options;
            this.elRender = elRender
            this.state = {loading:false} // 没有加载过
        }
        checkInView(){ // 检测这个图片是否在可视区域内
            let {top} = this.el.getBoundingClientRect();
            return top  <  window.innerHeight * (this.options.preLoad || 1.3);
        }
        load(){ // 用来加载这个图片
            // 先加载loading
            // 如果加载的ok的话 显示正常图片
            this.elRender(this,'loading');
            // 懒加载的核心 就是new Image
            loadImageAsync(this.src,()=>{
                this.state.loading = true;
                this.elRender(this,'finish');
            },()=>{
                this.elRender(this,'error');
            });
        }
    }
    return class LazyClass{
        constructor(options){
            // 保存用户传入的属性
            this.options = options;
            this.bindHandler = false;

            this.listenerQueue = [];
        }
        handleLazyLoad(){
           // 这里应该看一下 是否应该显示这个图片
           // 计算当前图片的位置
           this.listenerQueue.forEach(listener=>{
               if(!listener.state.loading){
                    let catIn = listener.checkInView();
                    catIn && listener.load();
               }
           })

        }
        add(el,bindings,vnode){
          // 找到父亲元素
          Vue.nextTick(()=>{
              // 带有滚动的盒子 infiniteScroll
              let scrollParent = getScrollParent(el);
              if(scrollParent && !this.bindHandler){
                this.bindHandler = true;
                scrollParent.addEventListener('scroll',this.handleLazyLoad.bind(this));
              }
              // 需要判断当前这个元素是否在容器可是区域中，如果不是就不用渲染
              const listener = new ReactiveListener({
                el,
                src:bindings.value,
                options:this.options,
                elRender:this.elRender.bind(this)
              })
              // 把所有的人都创建一个实例 放到数组中
              this.listenerQueue.push(listener);
              this.handleLazyLoad()
          })
        }
        elRender(listener,state){ // 渲染方法
            let el = listener.el;
            let src = ''
            switch (state) {
                case 'loading':
                    src = listener.options.loading || ''
                    break;
                case 'error':
                    src = listener.options.error || '';
                    break;
                default:
                    src = listener.src;
                    break;
            }
            el.setAttribute('src',src)
        }
    }
}
const VueLazyload = {
    install(Vue,options){
        //  把所有逻辑进行封装 类，把类在封装到函数中
        const LazyClass = Lazy(Vue);
        const lazy = new LazyClass(options)
        Vue.directive('lazy',{
            bind:lazy.add.bind(lazy)
        })
    }
}
// vue-cli 组件的用法  周五上课

// 节流 通过节流来进行优化