export default app => {
  app.use(async (ctx, next) => {
    await next()
    if (ctx.status === 404 && !ctx.body) {
      ctx.redirect('/index.html')
    }
  })
}
