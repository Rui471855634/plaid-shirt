<template lang="pug">
  div.idle
    page-bar(title="散言博客")
    .idle-container
      el-collapse(v-model="collapseActive" accordion)
        el-collapse-item(name="1")
          template(slot="title")
            div.collapse-title 热门&nbsp;&nbsp;HOT
          .blog-list
            .blog-item
              blog-card
            .blog-item
              blog-card
            .blog-item
              blog-card
        el-collapse-item(name="2")
          template(slot="title")
            div.collapse-title 热词&nbsp;&nbsp;
          .rank-list
            rank-list
</template>

<script>
import PageBar from '@/components/page-bar'
import BlogCard from '@/components/blog-card'
import RankList from '@/components/rank-list'
export default {
  name: 'Idle',
  metaInfo: {
    title: 'Idle Blog 散言博客'
  },
  data() {
    return {
      collapseActive: '1'
    }
  },
  components: {
    PageBar,
    BlogCard,
    RankList
  }
}
</script>

<style lang="stylus" scoped>
.idle-container
  padding: 24px 0
  .collapse-title
    font-size: 20px
    font-weight: bold
    color: #333
  .blog-list
    padding: 36px
    flex(row, center, flex-start)
    flex-wrap: wrap
    .blog-item
      width: 50%
      padding: 0 140px
      margin-bottom: 48px
      cursor: pointer
</style>
