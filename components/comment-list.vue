<template lang="pug">
  .comment-list
    .comment-item(v-for="item in list" :key="item.id")
      .item-header
        .user-info
          el-avatar(size="small" :src="item.avatar")
          span.user-name {{item.user_name}}
          span.department(v-if="item.department") 曾任职于 {{item.department}}
        .rate
          el-rate(v-model="item.rate" disabled show-score text-color="#ff9900" score-template="{value}")
      .item-body
        .comment-module(v-if="item.company_record")
          h4
            i.el-icon-office-building
            | 公司评价
          .comment-info
            | {{item.company_record}}
        .comment-module(v-if="item.attendance_record")
          h4
            i.el-icon-user
            | 考勤评价
          .comment-info
            | {{item.attendance_record}}
        //- .comment-module(v-if="item.department")
        //-   h4
        //-     i.el-icon-school
        //-     | 所属部门
        //-   .comment-info
        //-     | {{item.department}}
        .comment-module(v-if="item.department_record")
          h4
            i.el-icon-suitcase
            | 部门评价
          .comment-info
            | {{item.department_record}}
        .comment-module(v-if="item.leader_record")
          h4
            i.el-icon-user
            | 领导评价
          .comment-info
            | {{item.leader_record}}
        .comment-module(v-if="item.salary_record")
          h4
            i.el-icon-money
            | 薪资评价
          .comment-info
            | {{item.salary_record}}
        .comment-module(v-if="item.extra_record")
          h4
            i.el-icon-chat-dot-square
            | 其他评价
          .comment-info
            | {{item.extra_record}}
</template>

<script>
export default {
  name: 'CommentList',
  props: {
    list: Array
  }
}
</script>

<style lang="stylus" scoped>
  .comment-item
    margin-top: 16px
    border 1px solid #e5e5e5
    round(4px)
  .item-header
    padding: 16px 0
    margin: 0 32px
    flex(row, center, space-between)
    border-bottom: 1px solid #f2f5f7
    .user-info
      flex(row, center, flex-start)
      .user-name
        margin-left: 8px
      .department
        margin-left: 16px
        font-size: 14px
        color: #666
  .item-body
    padding: 16px 32px
    flex(row, center, space-between)
    flex-wrap: wrap
  .comment-module
    width: 49%
    margin: 12px 0
    h4
      i
        font-weight: bold
        margin-right: 4px
    .comment-info
      margin: 12px 0
      text-indent: 28px
      font-size: 14px
      color: #333
</style>
