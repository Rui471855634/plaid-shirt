<template lang="pug">
  .page-left(v-if="subMenuList.length")
    el-menu(ref="leftMenu" :default-active="activeIndex" class="el-menu-demo" mode="vertical" @select="handleSelect" )
      el-menu-item(:index="menu.url" :key="menu.name" v-for="menu in subMenuList") {{menu.name}}
      //- el-menu-item(index="hot-book") 热门书博
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'page-left',
  data() {
    return {
    }
  },
  computed: {
    activeIndex() {
      if (this.subMenuList.length) {
        return this.subMenuList[0].url
      }
      return ''
    },
    ...mapGetters(['subMenuList'])
  },
  methods: {
    handleSelect(key) {
      this.$router.push(key)
    }
  }
}
</script>

<style lang="stylus" scoped>
.page-left
  height: calc(100vh - 88px - 44px - 30px)
  padding-bottom: 30px
  background: #fff
  width: 130px
/deep/ .el-menu
  height: 100%
  border: none
</style>
