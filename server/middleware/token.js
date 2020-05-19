import jwt from 'jsonwebtoken'
import { User } from '../database/model'
import { TOKEN_SECRET } from '../config/application'
import Result, { ERROR_INFO } from '../utils/result'
import { getToken } from '../utils/roles'

export default app => {
  app.use(async (ctx, next) => {
    const urlReg = /(\/login|\/register)/i
    const methodReg = /(GET|OPTIONS)/i

    if (methodReg.test(ctx.method) || urlReg.test(ctx.url)) {
      await next()
    } else {
      const token = getToken(ctx.headers)
      const userData = await User.findOne({ token })

      if (userData === null) {
        ctx.status = 401
        ctx.body = Result.error(ERROR_INFO.NoToken.msg, ERROR_INFO.NoToken.code)
      } else {
        try {
          jwt.verify(userData.token, TOKEN_SECRET)
          await next()
        } catch (error) {
          ctx.status = 401
          ctx.body = Result.error(
            ERROR_INFO.InvalidToken.msg,
            ERROR_INFO.InvalidToken.code
          )
        }
      }
    }
  })
}
