import log4js from 'log4js'
import log4jsConf from '../utils/log4js'

log4js.configure(log4jsConf)

const httpLogger = log4js.getLogger('http')
const errorLogger = log4js.getLogger('error')

export default app => {
  app.use(async (ctx, next) => {
    const { method, host, url, headers } = ctx
    const httpInfo = {
      method,
      host,
      url,
      referer: headers['referer'],
      userAgent: headers['user-agent']
    }
    httpLogger.info(JSON.stringify(httpInfo))
    await next()
  })

  app.on('error', err => {
    errorLogger.error(err)
  })
}
