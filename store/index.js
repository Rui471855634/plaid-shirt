const consola = require('consola')
const store = {
  state() {
    return {
      menuList: [],
      subMenuList: [],
      user: {},
      dictionary: [],
      jobList: []
    }
  },
  getters: {
    menuList(state) {
      return state.menuList
    },
    subMenuList(state) {
      return state.subMenuList
    }
  },
  mutations: {
    menuList(state, menuList) {
      state.menuList = menuList
    },
    subMenuList(state, subMenuList) {
      state.subMenuList = subMenuList
    },
    dictionary(state, dictionary) {
      state.dictionary = dictionary
    },
    logout(state) {
      state.user = {}
    },
    setUser(state, user) {
      state.user = user
    },
    jobList(state, jobList) {
      state.jobList = jobList
    }
  },
  actions: {
    async nuxtServerInit({ state, commit, dispatch }, { req, app: { $axios, router } }) {
      await dispatch('getDictionary')
      if (req.headers.cookie) {
        let parsedResult = {}
        req.headers.cookie.split(';').forEach(cookie => {
            const currentCookie = cookie.split('=');
            parsedResult[currentCookie[0].trim()] = (currentCookie[1] || '').trim();
        })
        let token = parsedResult['token']
        let user = await $axios.get(`/auth/userInfo?token=${token}`)
        if (!user.data.id) {
          token = ''
        }
        commit('setUser', {...user.data, token})
      }
    },
    async getMenuList(context, menu) {
      let menuList = await this.$axios.$get(`/auth/menu?menu=root`)
      context.commit('menuList', menuList)
    },
    async getSubMenuList(context, menu) {
      let subMenuList = await this.$axios.$get(`/auth/menu?menu=${menu || 'home'}`)
      context.commit('subMenuList', subMenuList)
    },
    async getDictionary(context) {
      let dictionary = await this.$axios.$get('/auth/dictionary')
      context.commit('dictionary', dictionary)
    },
    async getJobList(context) {
      let data = await this.$axios.$get('/my/jobResume')
      if (data instanceof Array && data.length) {
        context.commit('jobList', data.map(el => {
          return Object.assign({}, el, {period: [(el.start_time || ''), (el.end_time || '')]})
        }))
      } else {
        context.commit('jobList', [])
      }
    }
  }
}

export default store
