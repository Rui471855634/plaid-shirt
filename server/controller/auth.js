const koaRouter = require('@koa/router')
const consola = require('consola')
import AuthService from '../service/authService'

const router = new koaRouter()
const authService = new AuthService()

// 登录
router.get('/api/auth/login', async ctx => {
  ctx.body = await authService.login(ctx.query)
})

// 用户信息
router.get('/api/auth/userInfo', async ctx => {
  ctx.body = await authService.userInfo(ctx.query.token)
})

// 菜单信息
router.get('/api/auth/menu', async ctx => {
  ctx.body = await authService.menu(ctx.query.menu)
})

// 菜单信息
router.get('/api/auth/dictionary', async ctx => {
  ctx.body = await authService.dictionary(ctx.query)
})

// 检查用户昵称
router.get('/api/auth/checkName', async ctx => {
  ctx.body = await authService.checkName(ctx.query)
})

// 检查用户手机号
router.get('/api/auth/checkTel', async ctx => {
  ctx.body = await authService.checkTel(ctx.query)
})

// 检查用户邮箱
router.get('/api/auth/checkEmail', async ctx => {
  ctx.body = await authService.checkEmail(ctx.query)
})

// 检查用户原密码
router.get('/api/auth/checkPwd', async ctx => {
  ctx.body = await authService.checkPwd(ctx.query.pwd, ctx.header.token)
})

// 注册或修改用户信息
router.post('/api/auth/registe', async ctx => {
  ctx.body = await authService.registe(ctx.request.body)
})

// 更新密码
router.post('/api/auth/updatePwd', async ctx => {
  ctx.body = await authService.updatePwd(ctx.request.body.pwd, ctx.header.token)
})

module.exports = router
