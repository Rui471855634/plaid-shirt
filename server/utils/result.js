export default class Result {
  static success(data) {
    return {data, success: true, code: 200}
  }

  static error(err, code = 500) {
    return {data: err, success: false, code: code}
  }
}

export const ERROR_INFO = {
  NoToken: { status: 401, msg: 'token 不存在，请登录后再试' },

  InvalidToken: { status: 401, msg: 'token 无效， 请登录后再试' },

  DatabaseError: { status: 500, msg: '数据操作错误，请重新尝试' }
}
