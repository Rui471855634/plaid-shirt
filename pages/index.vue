<template lang="pug">
  div#app
    page-header
    .page-container
      //- page-left
      .page-main
        .page-wrap
          wlb-home(v-if="path === 'index'" style="height: calc(100vh - 88px - 72px)")
          nuxt-child(v-else)
</template>

<script>
import PageHeader from '@/components/page-header'
import WlbHome from '@/components/wlb-home'
// import PageLeft from '@/components/page-left'
import {mapState} from 'vuex'
export default {
  name: 'app',
  metaInfo: {
    title: 'Plaid Shirt 格子衫'
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['user', 'init']),
    path() {
      return this.$route.name
    }
  },
  mounted() {
    this.$cookies.set('token', this.user.token || '', '1d')
  },
  methods: {
  },
  layout: 'default',
  components: {
    PageHeader,
    WlbHome
    // PageLeft
  }
}
</script>

<style lang="stylus" scoped>
#app
  width: 100%
  min-height: calc(100% - 44px)
  overflow: hidden
  .page-container
    min-height: calc(100vh - 88px)
    overflow: auto
    // flex(row, center, space-between)
    .page-main
      flex-1()
      padding: 12px
      background-color: #f2f5f7
      min-width: 1024px
    .page-wrap
      min-width: 1000px
      max-width: 1440px
      margin: 0 auto
      overflow: auto
      min-height: calc(100vh - 88px - 24px)
      padding: 24px 48px
      background-color: #fff
      border-radius: 4px
</style>
