<template lang="pug">
  .wlb
    .wlb-header
      .condition
        el-radio-group(v-model="sort" @change="sortChange")
          el-radio(label="good") 高分优先
          el-radio(label="bad") 低分优先
          el-radio(label="lastest") 最新
          el-radio(label="hot") 热度
      .add
        el-button(type="primary" size="mini" plain @click="addWlb") 我要发布
    .keyword-search
      el-input(size="medium" type="text" placeholder="请输入关键字" width='320px' v-model="keyword" clearable @clear="sortChange(sort)")
        el-button(slot="append" icon="el-icon-search" @click="sortChange(sort)")
    .wlb-container
      wlb-list(:list="wlbList")
    .wlb-footer
      el-pagination(size="mini" background layout="prev, pager, next" :total="total" :page-size="size" :current-page="page")
    nuxt-child
</template>

<script>
import WlbList from '@/components/wlb-list'
export default {
  name: 'Wlb',
  metaInfo: {
    title: 'Plaid Shirt 互联网养生指南'
  },
  data() {
    return {
      wlbList: [],
      sort: 'good',
      keyword: '',
      total: 0,
      size: 10,
      page: 1
    }
  },
  async asyncData({$axios}) {
    const data = await $axios.get('/wlb/getList')
    if (data.success) {
      return {
        wlbList: data.data.list,
        total: data.data.total
      }
    } else {
      return {
        total: 0,
        wlbList: []
      }
    }
  },
  methods: {
    addWlb() {
      this.$router.push({
        name: 'index-my-index-myWlb',
        params: {
          add: 1
        }
      })
    },
    async sortChange(sort) {
      const data = await this.$axios.get(`/wlb/getList?sort=${sort}&page=${this.page}&size=${this.size}&keyword=${this.keyword}`)
      if (data.success) {
        this.wlbList = data.data.list
        this.total = data.data.total
      }
    }
  },
  components: {
    WlbList
  }
}
</script>

<style lang="stylus" scoped>
.wlb-header
  margin: 8px 0
  padding: 12px 16px
  round(4px)
  background-color: #efefef
  flex(row, center, space-between)
.wlb-footer
  text-align: center
  margin: 16px 0
.keyword-search
  flex(row, center, flex-end)
  padding-top: 8px
  .el-input
    width: 320px
</style>
