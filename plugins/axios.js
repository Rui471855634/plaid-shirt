import { Message } from 'element-ui'
export default function ({ $axios, redirect, store, $nuxt }) {
  $axios.onRequest(config => {
    config.url = '/api' + config.url
    config.headers.token = store.state.user.token || ''
    // if (config.method.toLowerCase() === 'post') {
    //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // }
    return config
  })

  $axios.onResponse(response => {
    return response.data
  })

  $axios.onResponseError(error => {
    return Promise.reject(error)
  })

  $axios.onError(error => {
    // const code = parseInt(error.response && error.response.status)
    // if (code === 400) {
    //   redirect('/400')
    // }
    return Promise.reject(error)
  })
}
