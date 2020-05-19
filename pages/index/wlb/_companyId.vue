<template lang="pug">
  transition(name="slide")
    .wlb-detail
      .btn-back(@click="$router.push('/wlb')")
        i.el-icon-back
        | &nbsp;返回
      .info
        div.title
          h3 {{info.name}}
          div.tax-num(v-if="info.tax_num") 纳税人识别号:{{info.tax_num}}
        div.item-right
          div.rate(v-if="info.rate") 平均得分：
            span(:class="{'red': Number(info.rate) > 4.2}") {{info.rate}}
          .record-count(v-if="info.count") {{info.count}}&nbsp;条评论
      .list-wrap
        .title 评论 ({{info.count}})
        .commet-list-wrap
          comment-list(:list="list")
</template>

<script>
import CommentList from '@/components/comment-list'
export default {
  name: 'WlbDetail',
  async asyncData({$axios, route}) {
    let data = await $axios.get(`/wlb/getDetailByCompanyId?companyId=${route.params.companyId}`)
    return {
      info: data.data.info,
      list: data.data.commentList
    }
  },
  components: {
    CommentList
  }
}
</script>

<style lang="stylus" scoped>
  .btn-back
    padding: 8px 0
    font-size: 18px
    color: #666
    flex(row, center, flex-start)
    cursor: pointer
    i
      font-size: 28px
  .wlb-detail
    height: 100%
    width: 100%
    overflow: auto
  .info
    // border: 1px solid #f2f5f7
    round(4px)
    margin-bottom: 12px
    padding: 16px 24px
    flex(row, center, space-between)
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
  .list-wrap
    padding: 8px 16px
    .title
      font-size: 14px
      color: #666
      margin: 8px 0

  .slide-enter-active, .slide-leave-active {
    transition: all .3s
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>
