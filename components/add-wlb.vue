<template lang="pug">
  el-dialog(:title="title" :visible.sync="dialogVisible" width="650px" top="5vh")
    .add-wlb
      el-form(ref="form" :model="form" label-width="100px" :rules="rules" :disabled="type === 'view' || !jobList.length")
        el-form-item(label="公司：" prop="job_resume_id")
          el-radio-group(v-model="form.job_resume_id" @change="companyChange")
            el-radio(v-for="item in jobList" :key="item.id" :label="item.id") {{item.company.name}}
        el-form-item(label="所在部门：" prop="department")
          el-input(type="text" v-text="form.department")
        el-form-item(label="是否匿名：" prop="anonymous")
          el-switch(v-model="form.anonymous" :active-value=1 :inactive-value=0)
        el-form-item(label="总体评分：" prop="rate")
          el-rate(v-model="form.rate" show-score allow-half style="margin-top: 10px")
        el-form-item(label="公司评价：" prop="company_record")
          el-input(type="textarea" max="1000" v-model="form.company_record")
        el-form-item(label="部门评价：" prop="department_record")
          el-input(type="textarea" max="1000" v-model="form.department_record")
        el-form-item(label="薪资评价：" prop="salary_record")
          el-input(type="textarea" max="1000" v-model="form.salary_record")
        el-form-item(label="考勤评价：" prop="attendance_record")
          el-input(type="textarea" max="1000" v-model="form.attendance_record")
        el-form-item(label="领导评价：" prop="leader_record")
          el-input(type="textarea" max="1000" v-model="form.leader_record")
        el-form-item(label="其他：" prop="extra_record")
          el-input(type="textarea" max="1000" v-model="form.extra_record")
    span(slot="footer" class="dialog-footer")
      el-button(@click="dialogVisible = false") 关 闭
      el-button(type="primary" @click="save") 保 存
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AddWlb',
  data() {
    return {
      dialogVisible: false,
      form: {
        id: null,
        job_resume_id: null,
        department: null,
        anonymous: 0,
        company_record: null,
        department_record: null,
        attendance_record: null,
        leader_record: null,
        extra_record: null,
        salary_record: null,
        rate: 0
      },
      rules: {
        job_resume_id: [{
          required: true,
          message: '请选择公司'
        }],
        company_record: [{
          required: true,
          message: '请填写公司评价'
        }],
        department_record: [{
          required: true,
          message: '请填写部门评价'
        }]
      },
      type: ''
    }
  },
  props: {
    wlbList: Array
  },
  methods: {
    init(type, data) {
      this.dialogVisible = true
      this.type = type
      this.$nextTick(() => {
        this.$refs.form.resetFields()
        if (type !== 'add') {
          this.form = Object.assign({}, data)
        } else if (this.jobList.length) {
          if (this.wlbList.filter(el => el.job_resume_id === this.jobList[0].id).length) {
            this.form = Object.assign({}, this.wlbList.find(el => el.job_resume_id === this.jobList[0].id))
          } else {
            this.form.job_resume_id = this.jobList[0].id
            this.form.department = this.jobList.find(el => el.id === this.jobList[0].id).department
          }
        }
      })
    },
    companyChange(id) {
      if (this.wlbList.filter(el => el.job_resume_id === id).length) {
        this.form = Object.assign({}, this.wlbList.find(el => el.job_resume_id === id))
      } else {
        // this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.form.id = ''
          this.form.job_resume_id = id
          this.form.department = this.jobList.find(el => el.id === id).department
        // })
      }
    },
    async save() {
      let valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }
      let res = await this.$axios.post('/wlb/save', this.form)
      if (res && res.success) {
        this.$message.success('保存成功')
        this.dialogVisible = false
        this.$emit('refresh')
      } else {
        this.$message.error(res.data)
      }
    }
  },
  computed: {
    ...mapState(['jobList']),
    title() {
      return this.type === 'view' ? '查看' : '编辑'
    }
  }
}
</script>

<style lang="stylus" scoped>
/deep/ .el-rate
  margin-top: 12px
</style>
