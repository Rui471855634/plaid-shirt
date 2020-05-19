<template lang="pug">
  .my-wlb
    .my-wlb-header
      h4 我的发布
      .btn
        el-button(type="primary" size="mini" plain @click="editWlb('add')") 我要发布
    .my-wlb-container
      my-wlb-list(:list="wlbList" @editWlb="editWlb")
    add-wlb(ref="addWlb" v-if="addWlbVisible" :wlbList="wlbList" @refresh="refresh")
</template>

<script>
import MyWlbList from '@/components/my-wlb-list'
import AddWlb from '@/components/add-wlb'
import { mapState } from 'vuex'
export default {
  name: 'MyWlb',
  async asyncData({store, $axios}) {
    let data = await $axios.get('/wlb/myList')
    if (data.success) {
      return {
        wlbList: data.data
      }
    } else {
      return {
        wlbList: []
      }
    }
  },
  computed: {
    ...mapState(['jobList'])
  },
  data() {
    return {
      wlbList: [],
      addWlbVisible: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (+this.$route.params.add === 1) {
        this.editWlb('add')
      }
    })
  },
  methods: {
    async editWlb(cmd, data) {
      if (cmd === 'add' && !this.jobList.length) {
        this.$message.warning('暂无工作履历，请先添加工作履历')
        return
      }
      if (cmd === 'delete') {
        try {
          await this.$confirm(`确定要删除 ${data.name} 的发布内容吗？`, '提示', {
            dangerouslyUseHTMLString: true,
            type: 'warning'
          })
          let res = await this.$axios.delete(`/wlb/del?id=${data.id}`)
          if (res.success) {
            this.refresh()
          }
        } catch (e) {

        } finally {

        }
        return
      }
      this.addWlbVisible = true
      this.$nextTick(() => {
        this.$refs.addWlb.init(cmd, data)
      })
    },
    async refresh() {
      let data = await this.$axios.get('/wlb/myList')
      if (data.success) {
        this.wlbList = data.data
      } else {
        this.wlbList = []
      }
    }
  },
  components: {
    MyWlbList,
    AddWlb
  }
}
</script>

<style lang="stylus" scoped>
.my-wlb
  padding: 0 40px
.my-wlb-header
  flex(row, center, space-between)
  border-bottom: 1px solid #f2f5f7
  padding: 20px 0
  h4
    font-size: 16px
.my-wlb-container
  padding: 16px 0
</style>
