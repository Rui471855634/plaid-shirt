const Auth = require('./auth')
const My = require('./my')
const Wlb = require('./wlb')
const consola = require('consola')
const bodyParser = require('koa-bodyparser');
import Result from '../utils/result'
import IndexService from '../service/index'
const index = new IndexService()

const apiInit = app => {
  app.use(async (ctx, next) => {
    if (/^(\/api\/auth)|^(\/api\/wlb)/.test(ctx.url)) {
      await next()
    } else {
      const user = await index.getRedisInfo(ctx.headers.token)
      if (user) {
        await next()
      } else {
        ctx.body = Result.error('尚未登录', 401)
      }
    }
  })
  app.use(bodyParser());
  app.use(Auth.routes()).use(Auth.allowedMethods())
  app.use(My.routes()).use(My.allowedMethods())
  app.use(Wlb.routes()).use(Wlb.allowedMethods())
}

module.exports = apiInit
