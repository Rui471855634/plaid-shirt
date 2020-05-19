import crypto from 'crypto'

export default class Crypto {
  constructor(salt, encryptData) {
    this.salt = salt
    this.encryptData = encryptData
  }

  encrypt() {
    const hash = crypto.createHash('md5')
    hash.update(this.salt + this.encryptData)
    return hash.digest('hex')
  }
}
