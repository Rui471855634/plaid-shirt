const tel = /^([1][3,4,5,6,7,8,9])\d{9}$/

const email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

const password = /^.*(?=.{8,})(?=.*\d)([A-Z]?)(?=.*[a-z])([!@#$%^&*? ]?).*$/

const tax = /^[0-9|A-Z]+$/

export {
  tel, email, password, tax
}
