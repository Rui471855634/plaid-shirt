<template lang="pug">
  .rank
    .rank-wrap
      .rank-item(v-for="(item, index) in rankList" :key="index" :class="{'active': index+1 === active}" @mouseover="showDetail(index)" :style="getBorder(index)")
        .rank-num {{index+1}}
        .rank-name.text-overflow {{item.name}}
        el-avatar.rank-avatar(:src="item.avatar" size="small" v-if="item.avatar")
    .rank-detail
      .detail 姓名：&nbsp;{{detail.name}}
      .detail 介绍：&nbsp;{{detail.detail}}
</template>

<script>
export default {
  name: 'RankList',
  data() {
    return {
      detail: '',
      active: 1,
      rankList: [{
        avatar: 'http://localhost:3005/_nuxt/assets/default-avatar.png',
        name: '张三',
        detail: '平台签约作者，著名小说家，广州市文化局副局长，茅盾文学奖得主',
        blogAmount: 32
      }, {
        avatar: 'http://localhost:3005/_nuxt/assets/default-avatar.png',
        name: '李四',
        detail: '平台签约作者，著名小说家，广州市文化局副局长，茅盾文学奖得主',
        blogAmount: 32
      }, {
        avatar: 'http://localhost:3005/_nuxt/assets/default-avatar.png',
        name: '王五',
        detail: '平台签约作者，著名小说家，广州市文化局副局长，茅盾文学奖得主',
        blogAmount: 32
      }, {
        avatar: 'http://localhost:3005/_nuxt/assets/default-avatar.png',
        name: '赵六',
        detail: '平台签约作者，著名小说家，广州市文化局副局长，茅盾文学奖得主',
        blogAmount: 32
      }]
    }
  },
  mounted() {
    this.showDetail(0)
  },
  methods: {
    showDetail(index) {
      this.detail = this.rankList[index]
      this.active = index + 1
    },
    getBorder(index) {
      const opacity = 1 - index * 0.18
      return `border-left: 3px solid rgba(216, 59, 47, ${opacity})`
    }
  }
}
</script>

<style lang="stylus" scoped>
.rank
  display: flex
  justify-content: space-between
  padding: 24px 0
  .rank-wrap
    width: 80%
    .rank-item
      flex(row,center,flex-start)
      cursor: pointer
.rank-detail
  round(4px)
  font-size: 16px
  font-weight: bold
  padding: 28px
  flex-1()

.rank-item
  height: 55px
  line-height: 55px
  padding: 0 28px
  round(4px)
  border-top-left-radius: 0
  border-bottom-left-radius: 0
  transition: all 0.3s
  .rank-num
    width: 20px
    font-weight: bold
    font-size: 14px
  .rank-name
    margin-left: 16px
    font-size: 16px
    flex-1()
  .rank-avatar
    margin-left: 12px
  &.active
    // background-color: rgba(216, 59, 47, 0.6)
    // color: #fff
    transform: scaleY(1.1)
    box-shadow: -3px 6px 20px #ccc
</style>
