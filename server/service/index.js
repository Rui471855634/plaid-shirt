import pool from '../mysql/pool'
import { handleError } from '../utils/decorator'
import redis from '../redis/index'
const consola = require('consola')

export default class Index {
  constructor() {
    this.pool = pool
  }

  @handleError
  handleSqlFunc(sql, params = []) {
    return new Promise((resovle, reject) => {
      this.pool.query(sql, [...params], (err, ret, fields) => {
        if (err) {
          console.log('err', err)
          reject(err)
        }
        resovle(ret)
      })
    })
  }

  @handleError
  getRedisInfo(key) {
    return new Promise((resovle, reject) => {
      redis.get(key, (err, res) => {
        if (err) {
          reject(err)
        }
        resovle(JSON.parse(res))
      })
    })
  }

  @handleError
  setRedisInfo(key, value, expire = 10 * 60 * 60 * 1000) {
    redis.set(key, value, expire)
  }
}
