const koaRouter = require('@koa/router')
import WlbService from '../service/wlbService'

const router = new koaRouter()
const wlbService = new WlbService()

// 获取评价记录
router.get('/api/wlb/getList', async ctx => {
  ctx.body = await wlbService.getList(ctx.query.sort, ctx.query.page, ctx.query.size, ctx.query.keyword)
})

// 获取评价记录
router.get('/api/wlb/myList', async ctx => {
  ctx.body = await wlbService.myList(ctx.header.token)
})

// 根据公司id获取详情
router.get('/api/wlb/getDetailByCompanyId', async ctx => {
  ctx.body = await wlbService.getDetailByCompanyId(ctx.query.companyId)
})

// 获取评价记录
router.post('/api/wlb/save', async ctx => {
  ctx.body = await wlbService.save(ctx.request.body, ctx.header.token)
})

// 获取评价记录
router.delete('/api/wlb/del', async ctx => {
  ctx.body = await wlbService.del(ctx.query.id, ctx.header.token)
})

module.exports = router
