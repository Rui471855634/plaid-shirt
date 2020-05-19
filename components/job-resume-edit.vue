<template lang="pug">
  el-dialog(:title="title" :visible.sync="dialogVisible" width="550px")
    div.login-form
      el-form(ref="form" :model="form" label-width="130px" :rules="rules")
        el-form-item(label="公司：" prop="company.name")
          el-select.job-resume-input(v-model="form.company.name" filterable allow-create placeholder="请输入" remote reserve-keyword :remote-method="remoteMethod" :loading="loading" @change="taxHandler" :disabled="type === 'edit'")
            el-option(v-for="item in options" :key="item.id" :label="item.name" :value="item.name")
        el-form-item(label="纳税人识别号：" prop="company.tax_num")
          el-autocomplete.inline-input.job-resume-input(v-model="form.company.tax_num" placeholder="请输入" type="text" :fetch-suggestions="taxSearch" :disabled="type === 'edit'")
          //- el-input(v-model="form.tax_num" placeholder="请输入" type="text")
        el-form-item(label="部门：" prop="department")
          el-input(v-model="form.department" placeholder="请输入" type="text")
        el-form-item(label="时间：" prop="period")
          el-date-picker(v-model="form.period" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份" style="width: 100%" value-format="yyyy-MM" )
    span(slot="footer" class="dialog-footer")
      el-button(@click="dialogVisible=false") 取 消
      el-button(type="primary" @click="save") 保 存
</template>

<script>
import { tax } from '@/libs/pattern'
export default {
  name: 'JobResumeEdit',
  data() {
    return {
      type: null,
      form: {
        id: null,
        company: {
          id: null,
          tax_num: null,
          name: null
        },
        department: null,
        period: null
      },
      dialogVisible: false,
      rules: {
        'company.name': [{
          required: true,
          message: '不可为空'
        }],
        'company.tax_num': [{
          required: true,
          message: '不可为空'
        }, {
          pattern: tax,
          message: '格式错误，请使用数字和大写字母'
        }],
        department: [{
          required: true,
          message: '不可为空'
        }],
      },
      // 筛选选项
      options: [],
      loading: false,
      // 可选的税号
      taxList: []
    }
  },
  computed: {
    title() {
      let text = this.type === 'add' ? '新建' : '编辑'
      return text + '工作履历'
    }
  },
  methods: {
    init(type, data) {
      this.dialogVisible = true
      this.type = type
      this.$nextTick(() => {
        this.$refs.form.resetFields()
        if (type === 'edit') {
          this.form = Object.assign({}, data)
        }
      })
    },
    taxSearch(queryString, cb) {
      if (!queryString) {
        cb(this.taxList)
        return
      }
      let results = this.taxList.filter(el => {
        return el.value.indexOf(queryString) > -1
      })
      cb(results)
    },
    async remoteMethod(query) {
      if (!query) {
        this.options = []
        return
      }

      this.loading = true
      let data = await this.$axios.get(`/my/companySimiliar?name=${query}`)
      this.loading = false
      if (data.success) {
        this.options = data.data
      } else {
        this.options = []
      }
    },
    taxHandler() {
      let list = this.options.filter(el => el.name === this.form.company.name)
      this.taxList = list.map(el => {return {value: el.tax_num}})
      if (this.taxList && this.taxList.length === 1) {
        this.form.company.tax_num = this.taxList[0].value
      }
    },
    async save() {
      let valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }
      [this.form.start_time, this.form.end_time] = this.form.period
      if (this.type === 'edit') {
        if (!this.form.id || !this.form.company.id) {
          console.error('数据异常')
          return
        }
        try {
          let res = await this.$axios.post('/my/editJobResume', this.form)
          this.$emit('refresh')
          this.dialogVisible = false
        } catch(e) {
          console.error(e)
          return
        }
        return
      }
      let company = await this.$axios.get(`/my/existCompany?name=${this.form.company.name}&tax_num=${this.form.company.tax_num}`)
      if (!company.data) {
        try {
          await this.$confirm(`公司名称：${this.form.company.name}，纳税人识别号：${this.form.company.tax_num}&nbsp;未被创建<br><b>是否新建该公司记录？</b>`, '提示', {
            dangerouslyUseHTMLString: true,
            type: 'warning'
          })
          // this.form.id = ''
        } catch(e) {
          return
        }
      } else {
        this.form.company.id = company.data
      }
      try {
        let res = await this.$axios.post('/my/saveJobResume', this.form)
        this.$emit('refresh')
        this.dialogVisible = false
      } catch(e) {
        console.error(e)
        return
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.job-resume-input
  width: 100%
</style>
