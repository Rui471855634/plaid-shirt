import pool from './pool'

const handleSqlFunc = (sql, params) => {
  return new Promise((resovle, reject) => {
    pool.query(sql, [...params], (err, ret, fields) => {
      resovle({err, ret, fields})
    })
  })
  // let {err, ret, fields} = await pool.query(sql, [...params])
  // console.log(await pool.query(sql, [...params]))
  // return {err, ret, fields}
}

module.exports = {
  handleSqlFunc
}
