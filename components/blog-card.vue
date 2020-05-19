<template lang="pug">
.blog-card(@mouseover="active = true" @mouseout="active = false")
  el-card(:body-style="{ padding: '0px' }")
    img(src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571140636258&di=19c914d24efde152c54cc90d07c5564a&imgtype=0&src=http%3A%2F%2Faliyunzixunbucket.oss-cn-beijing.aliyuncs.com%2Fjpg%2F398f6ec74efb929161be1f9ce807af7a.jpg%3Fx-oss-process%3Dimage%2Fresize%2Cp_100%2Fauto-orient%2C1%2Fquality%2Cq_90%2Fformat%2Cjpg%2Fwatermark%2Cimage_eXVuY2VzaGk%3D%2Ct_100" class="cover-image" :class="{'active': active}")
    //- img(src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="cover-image" :class="{'active': active}")
    div.blog-info
      .publisher
        el-avatar(size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png")
        span.name.text-overflow Tim Cook
        .top 置顶
      .blog-title
        | 苹果2019年WWDC开发者大会总结。
</template>

<script>
export default {
  name: 'BlogCard',
  data() {
    return {
      active: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.blog-card
  cursor: pointer
.blog-info
  padding: 24px
.cover-image
  transition: all 0.5s
  width: 100%;
  &.active
    transform: scale(1.1)
.publisher
  flex(row, center, flex-start)
  .name
    font-size: 14px
    margin-left: 12px
    font-weight: bold
    flex-1()
  .top
    color: $color-primary
    width: 30px
    font-weight: 14px
    text-align: center
.blog-title
  // font-weight: bold
  font-size: 16px
  padding-top: 12px

/deep/ .el-collapse-item__header
  background-color: #efefef
</style>
