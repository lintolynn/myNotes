let WebSocket = require('ws');
let jsonwebtoken = require('jsonwebtoken');
let config = require('./index');

const strats = {
    auth(data, ws) {
        try {
            const r = jsonwebtoken.verify(data, config.secret);
            ws.isAuth = true; // 校验成功
            ws.id = r._id; // 保存用户唯一标识
            this.send(ws.id,{ type: 'message', data: 'auth ok' });
        } catch (e) {
            // 验证失败
            this.send(ws.id,JSON.stringify({ type: 'noAuth', data: 'please to login' }));
        }
    },
    heartCheck(data, ws) {
        // 心跳检测 标识长连接ok
        ws.keepAlive = true;
    },
    message(data, ws) {
        // 没有校验权限
        if (!ws.isAuth && this.isAuth) {
            return
        }
        this.wss.clients.forEach(client=>{
            console.log(client.id,ws.id)
            if(client.id !== ws.id){
                this.send(client.id,{type:'message',data});
            }
        })
    }
}
class WS {
    constructor(options = {}) {
        this.port = options.port || 4000; // 端口号地址
        this.time = options.time || 3000 * 10; // 心跳检测时间
        this.isAuth = options.isAath || true; // 需要校验登录状态
        this.wss = null; // 服务端websocket
    }
    create() { // 创建websocket实例
        this.heartCheck();
        this.wss = new WebSocket.Server({ port: this.port });
        this.wss.on('connection', ws => {
            ws.keepAlive = true; // 保持连接
            ws.on('message', msg => this.onMessage(ws, msg));
            ws.on('close', () => this.onClose(ws));
        });
    }
    onMessage(ws, msg) {
        const { type, data } = JSON.parse(msg);
        // 根据不同策略进行操作
        strats[type].call(this, data, ws);
    } 
    onClose(ws) {
        ws.close()
    }
    send(id, msg) { // 发送给指定用户
        this.wss.clients.forEach(client => {
            if (client.id === id) {
                client.send(JSON.stringify(msg))
            }
        })
    }
    broadcast(msg) {
        this.wss.clients.forEach(client => {
            client.send(JSON.stringify(msg))
        })
    }
    heartCheck() {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.wss.clients.forEach(client => {
                if (!client.keepAlive) { // 如果不是保持连接
                    return client.terminate();// 终端 
                }
                client.keepAlive = false;
                client.send(JSON.stringify({type: 'heartCheck'}))
            })
        }, this.time);
    }
}

module.exports = WS