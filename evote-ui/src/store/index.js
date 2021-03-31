import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
// list of modules
import notification from './modules/notification'
import user from './modules/user'
import candidates from './modules/candidates'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    notification,
    user,
    candidates
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
