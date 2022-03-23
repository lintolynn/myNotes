import install from './install';
import createMatcher from './create-matcher';
import HashHistory from './history/hashHistory';
import BrowserHistory from './history/browserHistory';
class VueRouter{
    constructor(options){
        // 创建匹配器的过程 1.匹配功能 match  2.可以添加匹配 动态路由添加 addRoutes 权限
        this.matcher = createMatcher(options.routes || []);  // 获取用户的整个配置

        // 创建历史管理  （路由两种模式 hash  浏览器api）
        this.mode = options.mode || 'hash';

        switch (this.mode) {
            case 'hash':
                this.history = new HashHistory(this)
                break;
            case 'history':
                this.history = new BrowserHistory(this);
                break;
        }
        this.beforeHooks = [];
    }
    match(location){
        return this.matcher.match(location);
    }
    init(app){ // 目前这个app指代的就是最外层new Vue
        // 需要根据用户配置 做出一个映射表来  


        // 需要根据当前路径 实现一下页面跳转的逻辑

        const history = this.history;
        // 跳转路径  会进行匹配操作 根据路径获取对应的记录

        let setupHashListener = () =>{
            history.setupListener(); // hashchange
        }
        // 跳转路径 进行监控
        history.transitionTo(history.getCurrentLocation(),setupHashListener)

        // 只要current发生变化 就触发此函数
        history.listen((route)=>{
            app._route = route; // 更新视图的操作，当current变化后再次更新_route属性
        })

        // 初始化时 都需要调用更新_route的方法
        // transitionTo 跳转逻辑 hash 、 browser都有
        // getCurrentLocation  hash和browser实现不一样
        // setupListener  hash监听
    }
    push(location){
        const history = this.history;
        window.location.hash = location;
    }
    beforeEach(fn){
        this.beforeHooks.push(fn);
    }
}

VueRouter.install = install;
export default VueRouter;



