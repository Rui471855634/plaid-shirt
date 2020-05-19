<template lang="pug">
  div.job-resume
    div.list-empty(v-if="!jobList.length") 暂无工作履历记录，请点击新建
    div.job-resume-list
      div.job-resume-item(v-for="item in jobList" :key="item.id")
        div.title
          h3 {{item.company.name}}
          div.tax-num(v-if="item.company.tax_num") 纳税人识别号:{{item.company.tax_num}}
        div.item-right
          div.department {{item.department}}
            div.period(v-if="item.start_time") {{item.start_time}} 至 {{item.end_time || '今'}}
          div.btn-wrap
            el-dropdown(trigger="click" @command="command" @visible-change="getItem(item)")
              span.el-dropdown-link 操作
                i.el-icon-arrow-down.el-icon--right
              el-dropdown-menu(slot="dropdown")
                el-dropdown-item(command="edit") 编辑
                el-dropdown-item(command="new") 评价
                el-dropdown-item(command="delete") 删除
</template>

<script>
export default {
  name: 'JobResume',
  data() {
    return {
      item: {}
    }
  },
  props: {
    jobList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    command(cmd) {
      this.$emit('editResume', cmd, this.item)
    },
    getItem(item) {
      this.item = item
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-empty
  padding: 80px 60px
  text-align: center
  font-size: 14px
  color: #999
  user-select: none
  background-image: url('~@/assets/red-arrow.png')
  background-repeat: no-repeat
  background-position: top right 100px
  background-size: 56px 35px
.job-resume-list
  .job-resume-item
    border: 1px solid #f2f5f7
    round(4px)
    margin-bottom: 12px
    padding: 16px 24px
    flex(row, center, space-between)
    .department
      color: #999
      font-size: 14px
      text-align: center
    .tax-num
      color: #666
      font-size: 14px
      margin-top: 8px
    .item-right
      flex(row, center, space-between)
    .btn-wrap
      margin-left: 24px
      cursor: pointer
    .el-dropdown-link
      color: $color-primary
</style>
