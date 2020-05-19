<template lang="pug">
  div.my-info
    div.info-display
      div.id-left
        el-avatar(size="large" :src="user.avatar")
        div.info-text
          div.name {{user.name}}
            span.level {{userLevel}}
            span.gender
              i(:class="`el-icon-${user.gender ? 'male': 'female'}`")
          div.tel {{user.tel}}
          div.email {{user.email}}
      div.id-right
        el-button(size="mini" plain @click="edit") 编辑
        el-button(size="mini" plain @click="changepwd") 修改密码
        el-button(size="mini" plain type="danger" @click="logout") 退出登录
    div.job-resume-container
      div.jr-header
        h4 工作履历
        el-button(size="mini" plain @click="addResume") 新建
      div.jr-body
        job-resume(:jobList="jobList" @editResume="editResume")
    job-resume-edit(ref="jobResumeEdit" v-if="jobResumeEditVisible" @refresh="refresh")
    my-info-edit(ref="myInfoEdit" v-if="myInfoVisible")
    change-pwd(ref="changePwdEdit" v-if="changePwdVisible")
</template>

<script>
import JobResume from '@/components/job-resume'
import JobResumeEdit from '@/components/job-resume-edit'
import MyInfoEdit from '@/components/my-info-edit'
import ChangePwd from '@/components/change-pwd'
import { logout } from '@/libs'
import { mapState } from 'vuex'
export default {
  name: 'MyInfo',
  metaInfo: {
    title: '个人资料'
  },
  data() {
    return {
      jobResumeEditVisible: false,
      myInfoVisible: false,
      changePwdVisible: false
    }
  },
  computed: {
    ...mapState(['user', 'dictionary', 'jobList']),
    userLevel() {
      if (this.dictionary.user_level && this.user.level) {
        return this.dictionary.user_level.children[this.user.level].text
      }
      return ''
    }
  },
  methods: {
    logout() {
      this.$confirm('确认退出登录？')
      .then(_ => {
        logout()
      })
      .catch(_ => {})
    },
    edit() {
      this.myInfoVisible = true
      this.$nextTick(() => {
        this.$refs.myInfoEdit.init()
      })
    },
    changepwd() {
      this.changePwdVisible = true
      this.$nextTick(() => {
        this.$refs.changePwdEdit.init()
      })
    },
    addResume() {
      this.jobResumeEditVisible = true
      this.$nextTick(() => {
        this.$refs.jobResumeEdit.init('add')
      })
    },
    async editResume(cmd, data) {
      if (cmd === 'edit') {
        this.jobResumeEditVisible = true
        this.$nextTick(() => {
          this.$refs.jobResumeEdit.init('edit', data)
        })
      } else if (cmd === 'new') {
        this.$router.push({
          name: 'index-my-index-myWlb'
        })
      } else {
        try {
          await this.$confirm(`确定要删除 ${data.company.name} 的工作履历吗？`, '提示', {
            dangerouslyUseHTMLString: true,
            type: 'warning'
          })
          await this.$axios.delete(`/my/delJobResume?id=${data.id}`)
          this.$message.success('删除成功')
          this.refresh()
        } catch(e) {
          return
        }
      }
    },
    async refresh() {
      this.$store.dispatch('getJobList')
    }
  },
  components: {
    JobResume,
    JobResumeEdit,
    MyInfoEdit,
    ChangePwd
  }
}
</script>

<style lang="stylus" scoped>
.info-display
  padding: 20px 40px 20px 60px
  flex(row, center, space-between)
  border-bottom: 1px solid #f2f5f7
  .id-left
    flex(row, center, flex-start)

.info-text
  margin-left: 12px
  font-size: 16px
  color: #333
  .name
    font-weight: bold
    flex(row, center, flex-start)
  .level
    color: #fff
    background-color: rgb(86, 235, 26)
    round(4px)
    font-size: 12px
    margin-left: 8px
    padding: 2px 6px
  .gender
    font-size: 14px
    font-weight: bold
    margin-left: 8px
    color: rgb(40, 113, 252)
    .el-icon-female
      color: rgb(250, 65, 193)
  .tel,.email
    font-size: 12px
    color: #999
    margin-top: 4px
.job-resume-container
  padding: 20px 40px 20px 60px
  .jr-header
    flex(row, center, space-between)
    margin-bottom: 20px
</style>
