const Koa = require('koa');
const cors = require('@koa/cors');
const body = require('koa-bodyparser');
const router = require('./routes/index');
const JWT = require('koa-jwt');
const { secret } = require('./config/index');

const WS = require('./config/webSocket');
new WS().create()

const app = new Koa();
app.use(function(ctx, next) {
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            throw err;
        }
    });
});
app.use(cors());
app.use(JWT({ secret }).unless({ path: [/^\/public/, /^\/user/] }));
app.use(body());
app.use(router());
app.listen(8888);