const koaRouter = require('@koa/router')
import MyService from '../service/myService'

const router = new koaRouter()
const myService = new MyService()

// 工作履历
router.get('/api/my/jobResume', async ctx => {
  ctx.body = await myService.jobResume(ctx.header.token)
})

// 公司名称模糊搜索
router.get('/api/my/companySimiliar', async ctx => {
  ctx.body = await myService.companySimiliar(ctx.query.name)
})

// 保存工作履历
router.post('/api/my/saveJobResume', async ctx => {
  ctx.body = await myService.saveJobResume(ctx.request.body, ctx.header.token)
})

// 保存工作履历
router.post('/api/my/editJobResume', async ctx => {
  ctx.body = await myService.editJobResume(ctx.request.body, ctx.header.token)
})

// 删除工作履历
router.delete('/api/my/delJobResume', async ctx => {
  ctx.body = await myService.delJobResume(ctx.query.id, ctx.header.token)
})

// 判断是否存在公司名称
router.get('/api/my/existCompany', async ctx => {
  ctx.body = await myService.existCompany(ctx.query, ctx.header.token)
})

module.exports = router
