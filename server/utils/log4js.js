import path from 'path'

const log4jsConf = {
  appenders: {
    console: {
      type: 'console'
    },
    http: {
      type: 'dateFile',
      filename: path.resolve(__dirname, '../../log/http'),
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    error: {
      type: 'file',
      filename: path.resolve(__dirname, '../../log/error.log'),
      maxLogSize: 1048576,
      backups: 10
    }
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'info'
    },
    http: {
      appenders: ['http'],
      level: 'info'
    },
    error: {
      appenders: ['error'],
      level: 'error'
    }
  }
}

export default log4jsConf
