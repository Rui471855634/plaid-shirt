import path from 'path'
import body from 'koa-body'
import serve from 'koa-static'
import favicon from 'koa-favicon'
import compress from 'koa-compress'

export default app => {
  app.use(serve(path.resolve(__dirname, '../../public/')))
  app.use(favicon(path.resolve(__dirname, '../../public/favicon.ico')))
  app.use(body({ multipart: true }))
  app.use(compress())
}
