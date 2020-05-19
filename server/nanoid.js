const nanoid = require('nanoid')
const consola = require('consola')

let id = nanoid()

consola.success('nanoid', id)
