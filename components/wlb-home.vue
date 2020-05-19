<template lang="pug">
  .wlb-home
    .title
      | 互联网养生指南
    .desc
      | 找新工作？你了解新公司吗？
    .desc
      | 是否需要996？
    .desc
      | 领导是否好相处？
    .desc
      | 薪酬福利、晋升制度是否令人满意？
    .desc
      | 公司食堂好吃吗？
    .desc
      | 公司妹子好看吗？
    .keyword
      | 互联网养生指南——共享互联网生态！
    .desc
      | 生活不易，揾食好难，2020，对自己好一点！
    .btn
      el-button(type="primary" plain @click="go") 进入养生
</template>

<script>
export default {
  name: 'WlbHome',
  methods: {
    go() {
      this.$router.push('/wlb')
    }
  }
}
</script>

<style lang="stylus" scoped>
.wlb-home
  overflow: auto
  flex(column, center, center)
  letter-spacing: 4px
  margin-top: -70px
  .title
    letter-spacing: 8px
    font-size: 34px
    font-weight: bold
    margin: 32px 0
    color: #333
  .desc
    color: #666
    font-size: 18px
    margin-top: 8px
  .keyword
    font-size: 18px
    font-weight: bold
    color: $color-primary
    margin: 16px 0
  .btn
    margin-top: 32px
    letter-spacing: 6px
</style>
