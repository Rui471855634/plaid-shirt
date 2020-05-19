<template lang="pug">
  .page-header
    .header-main
      .m-logo
        span(@click="back2Home") Plaid Shirt
      .m-menu
        el-menu(:default-active="activeIndex" class="el-menu-demo" text-color="#bbb" mode="horizontal" @select="handleSelect")
          el-menu-item(:index="menu.url" :key="menu.name" v-for="menu in menuList") {{menu.name}}
          //- el-menu-item(index="") 首页
          //- el-menu-item(index="idle") 散言博客
          //- el-menu-item(index="book") 图书博客
          //- el-menu-item(index="about") 关于
    .header-op
      el-dropdown(@command="handleMenu")
        .el-dropdown-link
          el-avatar(size="small" :src="avatar")
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item(v-if="!user.id" command="login") 登 录
          el-dropdown-item(v-if="!user.id" command="registe") 注 册
          el-dropdown-item(v-if="user.id" command="my") 个人中心
          el-dropdown-item(v-if="user.id" command="logout") 退出登录
    Login(ref="login" v-if="loginVisible")
</template>

<script>
import Login from '@/components/login'
import { mapState } from 'vuex'
import { logout } from '@/libs'
  export default {
    name: 'page-header',
    data() {
      return {
        avatar: require('@/assets/default-avatar.png'),
        activeIndex: '/',
        loginVisible: false
      }
    },
    created() {
      this.$store.dispatch('getMenuList')
    },
    computed: {
      ...mapState(['user', 'menuList'])
    },
    watch: {
      '$route.path': {
        handler(path) {
          if (!path.includes(this.activeIndex)) {
            if (/^(\/)/g.test(path)) {
              this.activeIndex = '/'
            } else if (/^(\/idle|\/idle\/)/g.test(path)) {
              this.activeIndex = '/idle'
            } else if (/^(\/book|\/book\/)/g.test(path)) {
              this.activeIndex = '/book'
            } else if (/^(\/about|\/about\/)/g.test(path)) {
              this.activeIndex = '/about'
            } else if (/^(\/wlb|\/wlb\/)/g.test(path)) {
              this.activeIndex = '/wlb'
            } else {
              this.activeIndex = ''
            }
          }
        },
        immediate: true
      }
    },
    mounted() {},
    methods: {
      handleSelect(key, keyPath) {
        this.$router.push(key)
        // this.$store.dispatch('getSubMenuList', key)
      },
      handleMenu(handler) {
        if (['login', 'registe'].includes(handler)) {
          this.loginVisible = true
          this.$nextTick(() => {
            this.$refs.login.init(handler)
          })
        }
        if (handler === 'my') {
          this.$router.push('/my/info')
        }
        if (handler === 'logout') {
          this.$confirm('确认退出登录？')
          .then(_ => {
            logout()
          })
          .catch(_ => {})
        }
      },
      back2Home() {
        document.querySelector('.el-menu-item').click()
      }
    },
    components: {
      Login
    }
  }
</script>

<style lang="stylus" scoped>
.page-header
  height: 44px
  padding: 0 80px
  flex(row, center, space-between)
  background-color: $menubg
  .header-main
    flex(row, center, flex-start)
    padding-right: 20px
    flex-1()
  .m-logo
    margin-right: 90px
    span
      font-size: 24px
      color: #fff
      letter-spacing: 2px
      cursor: pointer
/deep/ .el-menu--horizontal
  .el-menu-item
    font-size: 16px
    height: 44px
    line-height: 44px
    background-color: #232628 !important
    &:hover
      background-color: #333 !important
    &.is-active
      color: #fff
      background-color: #333 !important
</style>
