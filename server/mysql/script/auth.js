let getMenu = 'select id, name, url, seq from sys_menu where parent_id = ? and status = 1 order by seq asc'
let login = 'select id, nick_name as name, tel, email, gender, avatar, user_level as level from sys_user where (nick_name=? or tel=? or email=?) and pwd=? and status = 1'
let updateUser = 'update sys_user set nick_name = ?, tel = ?, email = ?, gender = ? where id = ?'
let insertUser = 'insert into sys_user (id, nick_name, pwd, tel, email, gender, status) VALUES (?,?,?,?,?,?,1)'
let getUserInfo = 'select id, nick_name as name, tel, email, gender, avatar, user_level as level from sys_user where id=? and status = 1'
let dictionary = 'select id, code, name, description from sys_dictionaries where status = 1'
let dictionaryItems = 'select id, code, text, seq, dic_id, description from sys_dictionaryitems where status = 1'
let checkNameSql = 'select * from sys_user where nick_name = ?'
let checkTelSql = 'select * from sys_user where tel = ?'
let checkEmailSql = 'select * from sys_user where email = ?'
let checkPwdSql = 'select * from sys_user where pwd = ? and id = ?'
let updatePwdSql = 'update sys_user set pwd = ? where id = ?'

module.exports = {
  getMenu,
  login,
  getUserInfo,
  dictionary,
  dictionaryItems,
  checkNameSql,
  checkTelSql,
  checkEmailSql,
  updateUser,
  insertUser,
  checkPwdSql,
  updatePwdSql
}
