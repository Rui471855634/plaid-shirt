<template lang="pug">
  el-dialog(title="修改密码" :visible.sync="dialogVisible" width="550px")
    div.login-form
      el-form(ref="form" :model="form" label-width="100px" :rules="rules")
        el-form-item(label="原密码：" prop="origin")
          el-input(v-model="form.origin" placeholder="请输入" @blur="checkPwd" type="password")
        el-form-item(label="新密码：" prop="new")
          el-input(v-model="form.new" placeholder="请输入" type="password")
        el-form-item(label="确认密码：" prop="email")
          el-input(v-model="form.check" placeholder="请输入" type="password")
    span(slot="footer" class="dialog-footer")
      el-button(@click="dialogVisible=false") 取 消
      el-button(type="primary" @click="save") 保 存
</template>

<script>
import { password } from '@/libs/pattern'
import { mapState } from 'vuex'
import Md5 from 'md5'
export default {
  name: 'ChangePwd',
  data() {
    return {
      form: {
        origin: null,
        new: null,
        check: null
      },
      dialogVisible: false,
      rules: {
        origin: [{
          required: true,
          message: '不可为空'
        }],
        new: [{
          required: true,
          message: '不可为空'
        }, {
          pattern: password,
          message: '格式错误，密码至少包含字母和数字'
        }],
        check: [{
          required: true,
          message: '不可为空'
        }, {
          pattern: password,
          message: '格式错误，密码至少包含字母和数字'
        }]
      },
      loading: false
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
      })
    },
    async checkPwd() {
      let res = await this.$axios.get(`/auth/checkPwd?pwd=${Md5(this.form.origin)}&id=${this.user.id}`)
      if (!res.success) {
        this.$message.warning(res.data)
        this.form.origin = ''
      }
    },
    async save() {
      let valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }
      if (this.form.new !== this.form.check) {
        this.$message.error('密码不一致')
        return
      }
      let res = await this.$axios.post(`/auth/updatePwd`, {pwd: Md5(this.form.new), id: this.user.id})
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
