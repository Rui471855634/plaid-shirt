const config = require('./config')
const mysql = require('mysql')
const pool = mysql.createPool(config.mysql)

export default pool
