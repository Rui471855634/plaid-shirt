import xss from 'xss'
import Result from '../utils/result'
// const { handleSqlFunc } = require('../mysql')
const { jobResumeSql, company, saveCompany, saveJobResumeSql, editJobResumeSql, delJobResumeSql } = require('../mysql/script/my')
import { handleError } from '../utils/decorator'
const consola = require('consola')
const nanoId = require('nanoId');
import Index from './index'

export default class AuthService extends Index {
  constructor() {
    super()
  }

  // 工作履历
  @handleError
  async jobResume(token) {
    const user = await super.getRedisInfo(token)
    if (user) {
      try {
        const resumeList = await super.handleSqlFunc(jobResumeSql, [user.id])
        if (resumeList && resumeList.length) {
          let companyIdList = resumeList.map(el => el.company_id)
          let companyList = []
          if (companyIdList && companyIdList.length) {
            let companySql = company
            companyIdList.forEach((id, i) => {
              if (i === 0) {
                companySql += ' and (id = ?'
              } else {
                companySql += ' or id = ?'
              }
              if (i === companyIdList.length - 1) {
                companySql += ')'
              }
            })
            companyList = await super.handleSqlFunc(companySql, companyIdList)
          }
          let data = resumeList.map(el => {
            el.company = companyList.find(e => e.id === el.company_id)
            return el
          })
          return Result.success(data)
        }
      } catch(e) {
        return Result.error('服务器错误', 500)
      }
      // if (data instanceof Array && data.length === 1) {
      //   return Result.success(data[0])
      // } else {
      //   return Result.error('有多条用户数据', 500)
      // }
    } else {
      return Result.error('尚未登录', 401)
    }
    // const data = await super.handleSqlFunc(getMenu, [token])
  }

  // 公司名称模糊搜索
  @handleError
  async companySimiliar(name) {
    const companySql = `${company} and name like "%"?"%"`
    const companyList = await super.handleSqlFunc(companySql, [name])
    return Result.success(companyList)
  }

  // 保存工作履历
  @handleError
  async saveJobResume(data, token) {
    const user = await super.getRedisInfo(token)
    if (!user) return Result.error('尚未登录', 401)
    let companyId = data.company.id
    if (!companyId) {
      companyId = nanoId()
      let res1 = await super.handleSqlFunc(saveCompany, [companyId, data.company.name, data.company.tax_num, user.id])
    }
    const jobId = nanoId()
    let res2 = await super.handleSqlFunc(saveJobResumeSql, [jobId, companyId, data.department, data.start_time, data.end_time, user.id, user.id])
    return Result.success(res2)
  }

  // 保存工作履历
  @handleError
  async editJobResume(data, token) {
    const user = await super.getRedisInfo(token)
    if (!user) return Result.error('尚未登录', 401)
    let companyId = data.company.id
    let res = await super.handleSqlFunc(editJobResumeSql, [data.department, data.start_time, data.end_time, user.id, data.id])
    return Result.success(res)
  }

  // 删除工作履历
  @handleError
  async delJobResume(id, token) {
    const user = await super.getRedisInfo(token)
    if (!user) return Result.error('尚未登录', 401)
    let res = await super.handleSqlFunc(delJobResumeSql, [user.id, id])
    return Result.success(res)
  }

  // 判断是否存在公司名称
  @handleError
  async existCompany(query, token) {
    const user = await super.getRedisInfo(token)
    if (!user) return Result.error('尚未登录', 401)
    let sql = company + ' and name = ? and tax_num = ?'
    let data = await super.handleSqlFunc(sql, [query.name, query.tax_num])
    if (data && data.length) {
      return Result.success(data[0].id)
    } else {
      return Result.success('')
    }
  }
}
