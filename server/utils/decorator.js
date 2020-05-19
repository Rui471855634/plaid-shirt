import Result, { ERROR_INFO } from '../utils/result'

export function handleError(target, name, descriptor) {
  const oldValue = descriptor.value

  descriptor.value = async function() {
    try {
      return await oldValue.apply(this, arguments)
    } catch (error) {
      return Result.error(
        ERROR_INFO.DatabaseError.msg,
        ERROR_INFO.DatabaseError.code
      )
    }
  }
}
