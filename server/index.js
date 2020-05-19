require("@babel/register")
require("@babel/polyfill")
const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const apiInit = require('./controller')
const middleware = require('./middleware')

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(async (ctx, next) => {
    ctx.status = 200
    // ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    if (ctx.url.indexOf('/api') === 0) {
      await next()
    } else {
      await new Promise((resovle, reject) => {
        nuxt.render(ctx.req, ctx.res, err => err ? reject(err) : resolve())
      })
    }
  })

  middleware(app)
  // consola.info(middleware)
  apiInit(app)

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
