import xss from 'xss'
import Result from '../utils/result'
// const { handleSqlFunc } = require('../mysql')
const { getMenu, login, getUserInfo, dictionary, dictionaryItems, checkNameSql, checkEmailSql, checkTelSql, updateUser, insertUser, checkPwdSql, updatePwdSql } = require('../mysql/script/auth')
import { handleError } from '../utils/decorator'
const consola = require('consola')
const nanoid = require('nanoid');
import Index from './index'
import Md5 from 'md5'

export default class AuthService extends Index {
  constructor() {
    super()
  }

  // 用户信息
  @handleError
  async userInfo(token) {
    const user = await super.getRedisInfo(token)
    if (user) {
      const data = await super.handleSqlFunc(getUserInfo, [user.id])
      if (data instanceof Array && data.length === 1) {
        return Result.success(data[0])
      } else {
        return Result.error('有多条用户数据', 500)
      }
    } else {
      return Result.success({})
    }
    // const data = await super.handleSqlFunc(getMenu, [token])
  }

  // 菜单信息
  @handleError
  async menu(menu) {
    const data = await super.handleSqlFunc(getMenu, [menu])
    return Result.success(data)
  }

  // 登录
  @handleError
  async login(query) {
    const data = await super.handleSqlFunc(login, [query.name, query.name, query.name, query.password])
    if (data instanceof Array && data.length === 1) {
      let token = Md5(data[0].id + (new Date()).getTime())
      data[0].token = token
      super.setRedisInfo(token, JSON.stringify({id: data[0].id}))
      return Result.success(data[0])
    } else {
      return Result.error('有多条用户数据', 500)
    }
  }

  // 数据字典
  @handleError
  async dictionary(query) {
    const dic = await super.handleSqlFunc(dictionary)
    const dicItems = await super.handleSqlFunc(dictionaryItems, [''])
    if (dic instanceof Array && dicItems instanceof Array) {
      let data = {}
      dic.forEach(el => {
        let children = dicItems.filter(item => item.dic_id === el.id)
        let childObj = {}
        children.forEach(e => {
          childObj[e.code] = e
        })
        el.children = childObj
        data[el.code] = el
      })
      return Result.success(data)
    } else {
      return Result.error('服务器错误', 500)
    }
  }

    // 检查用户昵称
    @handleError
    async checkName(query) {
      const data = await super.handleSqlFunc(checkNameSql, [query.name])
      if (data instanceof Array && data.length === 0) {
        return Result.success([])
      } else {
        return Result.error('该用户名已被注册', 200)
      }
    }

    // 检查电话号码
    @handleError
    async checkTel(query) {
      const data = await super.handleSqlFunc(checkTelSql, [query.tel])
      if (data instanceof Array && data.length === 0) {
        return Result.success([])
      } else {
        return Result.error('该手机号码已被注册', 200)
      }
    }

    // 检查邮箱
    @handleError
    async checkEmail(query) {
      const data = await super.handleSqlFunc(checkEmailSql, [query.email])
      if (data instanceof Array && data.length === 0) {
        return Result.success([])
      } else {
        return Result.error('该邮箱已被注册', 200)
      }
    }

    // 检查原密码
    @handleError
    async checkPwd(pwd, token) {
      const user = await super.getRedisInfo(token)
      if (!user) return Result.error('尚未登录', 401)
      const data = await super.handleSqlFunc(checkPwdSql, [pwd, user.id])
      if (data instanceof Array && data.length === 0) {
        return Result.error('原密码不正确', 200)
      } else {
        return Result.success([])
      }
    }

    // 注册或修改用户信息
    @handleError
    async registe(data) {
      let res = null
      try {
        if (data.id) {
          res = await super.handleSqlFunc(updateUser, [data.name, data.tel, data.email, data.gender, data.id])
        } else {
          res = await super.handleSqlFunc(insertUser, [nanoid(), data.name, data.pwd, data.tel, data.email, data.gender])
        }
        if (!res.success) {
          return Result.success()
        }
      } catch (e) {
        return Result.error(e, 500)
      } finally {

      }
    }

    // 修改密码
    @handleError
    async updatePwd(pwd, token) {
      const user = await super.getRedisInfo(token)
      if (!user) return Result.error('尚未登录', 401)
      let res = null
      res = await super.handleSqlFunc(updatePwdSql, [pwd, user.id])
      return Result.success()
    }

}
