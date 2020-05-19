import logger from './logger'
// import cors from './cors'
// import token from './token'
import vendor from './vendor'
// import fallback from './fallback'

module.exports = app => {
  const middlewares = [logger, vendor]
  middlewares.forEach(item => item(app))
}
