export async function logout() {
  $nuxt.$store.commit('logout')
  $nuxt.$cookies.set('token', '')
  $nuxt.$router.push('/')
}
