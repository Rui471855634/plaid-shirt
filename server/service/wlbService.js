import xss from 'xss'
import Result from '../utils/result'
// const { handleSqlFunc } = require('../mysql')
const { wlbList, myListSql, insertwlb, updatewlb, delwlb, wlbTotal, getCompanyInfoByCompanyId, getCommentListByCompanyId } = require('../mysql/script/wlb')
import { handleError } from '../utils/decorator'
const consola = require('consola')
const nanoId = require('nanoId');
import Index from './index'

export default class WlbService extends Index {
  constructor() {
    super()
  }

  // 查询评价记录
  @handleError
  async getList(sort = 'good', page = 1, size = 10, keyword = '') {
    let sql =`${wlbList} order by ${['good', 'bad'].includes(sort) ? 'rate' : sort === 'latest' ? 'time' : 'count'} ${sort !== 'bad' ? 'desc' : 'asc'} limit ${page - 1}, ${size}`
    const list = await super.handleSqlFunc(sql, [keyword, keyword])
    const total = await super.handleSqlFunc(wlbTotal)
    return Result.success({
      total: total[0].total,
      list
    })
  }

  // 根据公司id获取详情
  @handleError
  async getDetailByCompanyId(companyId) {
    const companyList = await super.handleSqlFunc(getCompanyInfoByCompanyId, [companyId])
    if (companyList instanceof Array && companyList.length === 1) {
      const commentList = await super.handleSqlFunc(getCommentListByCompanyId, [companyId])
      return Result.success({
        info: companyList[0],
        commentList
      })
    } else {
      Result.error('有多个该公司或无该公司', 500)
    }
  }

  // 查询评我的发布
  @handleError
  async myList(token) {
    const user = await super.getRedisInfo(token)
    if (!user) return Result.error('尚未登录', 401)
    const list = await super.handleSqlFunc(myListSql, [user.id])
    return Result.success(list)
  }

  // 保存评我的发布
  @handleError
  async save(data, token) {
    const user = await super.getRedisInfo(token)
    if (!user) return Result.error('尚未登录', 401)
    if (!data.id) {
      let id = nanoId()
      await super.handleSqlFunc(insertwlb, [id, data.job_resume_id, data.company_record, data.department_record, data.leader_record, data.attendance_record, data.salary_record, data.extra_record, data.rate, data.anonymous, 1, user.id])
      return Result.success()
    } else {
      let res = await super.handleSqlFunc(updatewlb, [data.company_record, data.department_record, data.leader_record, data.attendance_record, data.salary_record, data.extra_record, data.rate, data.anonymous, user.id, data.id])
      return Result.success()
    }
  }

  // 删除评我的发布
  @handleError
  async del(id, token) {
    const user = await super.getRedisInfo(token)
    if (!user) return Result.error('尚未登录', 401)
    await super.handleSqlFunc(delwlb, [id])
    return Result.success()
  }

}
