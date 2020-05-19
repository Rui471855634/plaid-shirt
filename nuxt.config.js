
module.exports = {
  mode: 'universal',
  /*
  ** 服务器配置
   */
  server: {
    host: '0.0.0.0',
    port: 4005
  },
  /*
  ** 路由配置
   */
  router: {
    base: '/'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/vue-meta',
    '@/plugins/vue-cookies',
    '@/plugins/axios'
  ],
  /*
  ** postcss
   */
  postcss: {
    plugins: {
      'postcss-pxtransform': {
        platform: 'h5',
        designWidth: 375,
        propList: ['*', '!border', '!border-width'],
        minPixelValue: 0.5
      }
    }
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/pwa',
    '@nuxtjs/auth'
  ],
  /*
  ** Extends Style
   */
  styleResources: {
    stylus: ['@libs/mixin.styl', '@libs/variables.styl', '@libs/common.styl']
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
