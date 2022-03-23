let publicRouter = require('./publicRouter');
let userRouter = require('./userRouter');
let combineRoutes = require('koa-combine-routers');
module.exports = combineRoutes(publicRouter, userRouter);