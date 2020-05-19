<template lang="pug">
  div.my-wlb-list-wrap
    div.list-empty(v-if="!list.length") 暂无发布记录，请点击新建
    div.my-wlb-list
      div.my-wlb-item(v-for="item in list" :key="item.id")
        div.title
          h3 {{item.name}}
          div.tax-num(v-if="item.tax_num") 纳税人识别号:{{item.tax_num}}
        div.item-right
          div.department 我的评分：{{item.rate}}
          div.btn-wrap
            el-dropdown(trigger="click" @command="command" @visible-change="getItem(item)")
              span.el-dropdown-link 操作
                i.el-icon-arrow-down.el-icon--right
              el-dropdown-menu(slot="dropdown")
                el-dropdown-item(command="edit") 编辑
                el-dropdown-item(command="delete") 删除
</template>

<script>
export default {
  name: 'MyWlbList',
  data() {
    return {
      item: {}
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    command(cmd) {
      this.$emit('editWlb', cmd, this.item)
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
.my-wlb-list
  .my-wlb-item
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
