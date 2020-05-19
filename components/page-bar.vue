<template lang="pug">
  div.page-bar
    | {{title}}
    div.search-bar
      el-input(ref="search" class="keyword-search" :class="{'show': showInput}" clearable v-model="keyword" placeholder="关键字" @blur="showInput = false" @keyup.enter.native="search")
      i.iconfont.el-icon-search(@mouseover="focusInput")
</template>

<script>
export default {
  name: 'PageBar',
  data() {
    return {
      keyword: '',
      showInput: false
    }
  },
  methods: {
    focusInput() {
      this.showInput = true
      this.$refs.search.focus()
    },
    search() {
      this.$emit('search', this.keyword)
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.page-bar
  display: flex
  align-items: center
  font-size: 20px
  color: #666
  font-weight: bold
  .search-bar
    display: flex
    align-items: center
  .el-icon-search
    color: #ddd
    font-size: 25px
    margin-left: 15px
    cursor: pointer
  .keyword-search
    width: 35px
    margin-left: 0px
    transition: all 0.5s
    &.show
      margin-left: 25px
      width: 250px
    /deep/ >input
      border: 0
</style>
