<template lang="pug">
  el-dialog(:title="title" :visible.sync="dialogVisible" width="450px")
    div.login-form
      el-form(ref="form" :model="form" label-width="100px" :rules="rules")
        el-form-item(label="用户名：" prop="name" v-if="pageType === 'login'")
          el-input(v-model="form.name" placeholder="邮箱或手机号" type="text")
        el-form-item(label="昵称：" prop="name" v-if="pageType === 'registe'")
          el-input(v-model="form.name" placeholder="请输入" type="text" @blur="checkName")
        el-form-item(label="手机号：" prop="tel" v-if="pageType === 'registe'")
          el-input(v-model="form.tel" placeholder="请输入" type="text" @blur="checkTel")
        el-form-item(label="邮箱：" prop="email" v-if="pageType === 'registe'")
          el-input(v-model="form.email" placeholder="请输入" type="text" @blur="checkEmail")
        el-form-item(label="密码：" prop="password")
          el-input(v-model="form.password" placeholder="请输入" type="password")
        el-form-item(label="确认密码：" prop="passwordCheck" v-if="pageType === 'registe'")
          el-input(v-model="form.passwordCheck" placeholder="请输入" type="password")
        el-form-item(label="性别：" prop="gender" v-if="pageType === 'registe'")
          el-radio(v-model="form.gender" :label="Number(0)") 女
          el-radio(v-model="form.gender" :label="Number(1)") 男
    span(slot="footer" class="dialog-footer")
      el-button(@click="changePage('registe')" v-if="pageType === 'login'") 立即注册
      el-button(type="primary" @click="login" v-if="pageType === 'login'") 登 录
      el-button(@click="changePage('login')" v-if="pageType === 'registe'") 直接登录
      el-button(type="primary" @click="login" v-if="pageType === 'registe'") 注 册
</template>

<script>
import Md5 from 'md5'
import { tel, email, password } from '@/libs/pattern'
export default {
  data() {
    return {
      pageType: 'login',
      dialogVisible: false,
      form: {
        name: '',
        password: '',
      },
      rules: {
        name: [{
          required: true,
          message: '不可为空'
        }],
        tel: [{
          required: true,
          message: '不可为空'
        }, {
          pattern: tel,
          message: '格式错误'
        }],
        email: [{
          required: true,
          message: '不可为空'
        }, {
          pattern: email,
          message: '格式错误'
        }],
        password: [{
          required: true,
          message: '不可为空'
        }, {
          pattern: password,
          message: '格式错误，密码至少包含字母和数字'
        }],
        passwordCheck: [{
          required: true,
          message: '不可为空'
        }, {
          pattern: password,
          message: '格式错误，密码至少包含字母和数字'
        }]
      }
    }
  },
  computed: {
    title() {
      return this.pageType === 'login' ? '登录' : '注册'
    }
  },
  watch: {
    'form.tel'(value) {

    }
  },
  methods: {
    init(type) {
      this.dialogVisible = true
      this.pageType = type
      this.changePage(type)
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
    },
    async checkName() {
      let res = await this.$axios.get(`/auth/checkName?name=${this.form.name}`)
      if (!res.success) {
        this.$message.warning(res.data)
        this.form.name = ''
      }
    },
    async checkTel() {
      let res = await this.$axios.get(`/auth/checkTel?tel=${this.form.tel}`)
      if (!res.success) {
        this.$message.warning(res.data)
        this.form.tel = ''
      }
    },
    async checkEmail() {
      let res = await this.$axios.get(`/auth/checkEmail?email=${this.form.email}`)
      if (!res.success) {
        this.$message.warning(res.data)
        this.form.email = ''
      }
    },
    async login() {
      let valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }
      if (this.pageType === 'login') {
        let params = {
          name: this.form.name,
          password: Md5(this.form.password)
        }
        let data = await this.$axios.get('/auth/login', {params})
        if (data.success) {
          this.$store.commit('setUser', data.data)
          this.$cookies.set('token', data.data.token || '', 10*60*60*1000)
          this.dialogVisible = false
          // this.$notify({
          //   title: '成功',
          //   message: '登录成功',
          //   type: 'success'
          // });
          this.$message.success('登录成功')
        } else {
          this.$message.error('用户名或密码错误')
        }
      } else {
        if (this.form.password !== this.form.passwordCheck) {
          this.$message.error('密码不一致')
          return
        }
        let res = await this.$axios.post(`/auth/registe`, Object.assign({}, this.form, { pwd: Md5(this.form.password), password: null, passwordCheck: null }))
        if (res && res.success) {
          this.$message.success('注册成功')
          this.changePage('login')
        } else {
          this.$message.error(res.data)
        }
      }
    },
    changePage(page) {
      this.pageType = page
      if (page === 'login') {
        this.form.password = ''
      } else {
        this.$set(this.form, 'tel', '')
        this.$set(this.form, 'email', '')
        this.$set(this.form, 'passwordCheck', '')
        this.$set(this.form, 'gender', 0)
      }
    },
    registe() {

    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
