<template lang="pug">
  div.my
    page-left
    .page-main
      nuxt-child
</template>

<script>
import PageLeft from '@/components/page-left'
import { mapState } from 'vuex'
export default {
  name: 'my',
  metaInfo: {
    title: 'Plaid Shirt 格子衫 - 个人中心'
  },
  mounted() {
    if (!this.user.id) {
      this.$message.warning('尚未登录')
      this.$router.push('/')
    }
    this.$store.dispatch('getSubMenuList', 'my')
    this.$store.dispatch('getJobList')
  },
  created() {
  },
  computed: {
    ...mapState(['user']),
  },
  components: {
    PageLeft
  }
}
</script>

<style lang="stylus" scoped>
.my
  flex(row, flex-start, flex-start)
  .page-main
    flex-1()
</style>
