const Vue = require('vue');
const VueServerRenderer = require('vue-server-renderer');
const Koa = require('koa');
const fs = require('fs');
const Router = require('@koa/router');
let app = new Koa(); // 创建一个服务实例
let router = new Router(); // 创建路由实例
let vm = new Vue({
    data(){
        return {name:'zf'}
    },
    template:'<div>hello {{name}}</div>'
});
const template = fs.readFileSync('./temp.html','utf8');
let render = VueServerRenderer.createRenderer({ // 通过模板创建一个渲染器
    template
});
// 注册一个路由 当访问/ 时 而且是get请求，就会执行对应的函数
router.get('/',async (ctx)=>{ // 里面包含浏览器和服务端的 req/res的一些信息
    ctx.body = await render.renderToString(vm); // 用渲染器将vue的实例渲染成一个字符串
})
app.use(router.routes()); // 将路由注册到koa中
app.listen(3000); // 监听端口号
// npm install nodemon -g
// nodemon server.js
