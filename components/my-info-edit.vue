<template lang="pug">
  el-dialog(title="编辑个人信息" :visible.sync="dialogVisible" width="550px")
    div.login-form
      el-form(ref="form" :model="form" label-width="100px" :rules="rules")
        el-form-item(label="昵称：" prop="name")
          el-input(v-model="form.name" placeholder="请输入" @blur="checkName")
        el-form-item(label="手机号码：" prop="tel")
          el-input(v-model="form.tel" placeholder="请输入" type="text" @blur="checkTel")
          //- el-input(v-model="form.tax_num" placeholder="请输入" type="text")
        el-form-item(label="邮箱：" prop="email")
          el-input(v-model="form.email" placeholder="请输入" type="text" @blur="checkEmail")
        el-form-item(label="性别：" prop="gender")
          el-radio(v-model="form.gender" :label="Number(0)") 女
          el-radio(v-model="form.gender" :label="Number(1)") 男
    span(slot="footer" class="dialog-footer")
      el-button(@click="dialogVisible=false") 取 消
      el-button(type="primary" @click="save") 保 存
</template>

<script>
import { tel, email } from '@/libs/pattern'
import { mapState } from 'vuex'
export default {
  name: 'MyInfoEdit',
  data() {
    return {
      form: {
        id: null,
        name: null,
        tel: null,
        email: null,
        gender: null
      },
      dialogVisible: false,
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
        }]
      },
      // 筛选选项
      options: [],
      loading: false,
      // 可选的税号
      taxList: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    init() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.form.resetFields()
        this.form = Object.assign({}, this.user)
      })
    },
    async checkName() {
      if (this.form.name === this.user.name) return
      let res = await this.$axios.get(`/auth/checkName?name=${this.form.name}`)
      if (!res.success) {
        this.$message.warning(res.data)
        this.form.name = ''
      }
    },
    async checkTel() {
      if (this.form.tel === this.user.tel) return
      let res = await this.$axios.get(`/auth/checkTel?tel=${this.form.tel}`)
      if (!res.success) {
        this.$message.warning(res.data)
        this.form.tel = ''
      }
    },
    async checkEmail() {
      if (this.form.email === this.user.email) return
      let res = await this.$axios.get(`/auth/checkEmail?email=${this.form.email}`)
      if (!res.success) {
        this.$message.warning(res.data)
        this.form.email = ''
      }
    },
    async save() {
      let valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }
      let res = await this.$axios.post(`/auth/registe`, {...this.form})
      if (res && res.success) {
        this.$message.success('保存成功')
        this.dialogVisible = false;
      } else {
        this.$message.error(res.data)
      }
      // let res = await this.$axios.post('/my/saveJobResume', {...this.form})

    }
  }
}
</script>

<style lang="stylus" scoped>
.my-info-input
  width: 100%
</style>
