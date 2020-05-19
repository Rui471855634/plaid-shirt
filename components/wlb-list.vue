<template lang="pug">
  .wlb-list
    div.list-empty(v-if="!list.length") 暂无记录
    .wlb-item(v-for="item in list" :key="item.id" @click="showDetail(item)")
      div.title
        h3 {{item.name}}
        div.tax-num(v-if="item.tax_num") 纳税人识别号:{{item.tax_num}}
      div.item-right
        div.rate(v-if="item.rate") 平均得分：
          span(:class="{'red': Number(item.rate) > 4.2}") {{item.rate}}
        .record-count(v-if="item.count") {{item.count}}&nbsp;条评论
          //- div.period(v-if="item.start_time") {{item.start_time}} 至 {{item.end_time || '今'}}

</template>

<script>
export default {
  name: 'WlbList',
  props: {
    list: Array
  },
  methods: {
    showDetail(item) {
      if (!item.count) {
        this.$message.info('暂无该公司相关评论')
        return
      }
      this.$router.push(`/wlb/${item.id}`)
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
.wlb-list
  padding: 16px 0
.wlb-item
  border: 1px solid #f2f5f7
  round(4px)
  margin-bottom: 12px
  padding: 16px 24px
  flex(row, center, space-between)
  cursor: pointer
  .rate
    color: #666
    font-size: 14px
    text-align: center
    .red
      color: $color-primary
      font-weight: bold
  .tax-num
    color: #666
    font-size: 14px
    margin-top: 8px
  .record-count
    font-size: 14px
    color: #666
    margin-top: 6px
    i
      color: #999
      margin-right: 8px
  .item-right
    flex(column, center, center)
</style>
