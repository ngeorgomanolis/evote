import api from '@/api/user'

const state = {
  infos: {},
  logged: false,
  token: null,
  profile: {},
  loginOptions: {}
}

// filter methods on the state data
const getters = {
  isLoggedUserCandidate: state => (candidate) => {
    return candidate.id === state.profile.id
  },
  canLoggedUserVote: state => {
    return (state.profile.votes < 3) ? true : false
  },
  getVotesLeft: state => {
    return 2 - state.profile.votes_g.length
  },
  hasBeenVoted: state => (id) =>{
    return (state.profile.votes_g.filter(e => e.candidate_id === id).length > 0) ? true : false
  },
  getToken : state => {
    return state.token
  }
}

// async methods making mutations are placed here
const actions = {
  /**
   * Register a new user
   * @param commit
   * @param state
   * @param dispatch
   * @param form
   * @return {Promise}
   */
  register ({ commit }, form) {
    return api.register(form.email, form.password).then(response => {
      if(!response.data.error && response.data.token){
        commit('setToken',response.data)
      } 
      return response.data
    }).catch(reason => {
      commit('notification/showError', {
        title: 'Registration System Issue', 
        content: reason
      }, { root: true })
      return false
    })
  },

  /**
   * Log the user in
   * @param commit
   * @param email
   * @param password
   * @return {Promise}
   */
  signIn ({ commit }, { email, password }) {
    return api.signIn(email, password).then(response => {
      // checks if the user is authenticated (good credentials)
      if (response.data.token && response.data.error === false) {
        commit('setLogged')
        commit('setToken',response.data)
      }
      return response.data
    }).catch(reason => {
      commit('notification/showError', {
        title: 'Sign In System Error', 
        content: reason
      }, { root: true })
      //return false
    })
  },

  /**
   * Returns all the data about the logged user (session login)
   * @param commit
   * @param state
   * @return {Promise<T | boolean>}
   */
  getAccountProfile ({ state, commit}) {
    return api.getAccountProfile(state.token).then(value => {
      if (value.data.hasOwnProperty('profile') && value.data.error === false) {
        commit('setProfile',value.data.profile)     
        commit('setLogged')
        return value.data
      }
      commit('setLoggedOut')
      return false
    }).catch(reason => {
      commit('notification/showError', {
        title:'Error',
        content: reason
      }, { root: true })
      return false
    })
  },

  /**
   * Logout the user and clear the state
   * @param commit
   * @return {Promise<T | boolean>}
   */
  signOut ({ commit }) {
    commit('setLoggedOut')
    commit('setProfile', {})
    commit('setToken',null)
    commit('notification/showInfo', {
      title: 'SignOut',
      content: 'See you soon!'
    }, { root: true })
    return true
  },

  /**
   * Allows to update the user candidate status
   * @param commit
   * @param state
   * @param payload
   * @return {Promise}
   */
  isCandidate ({ commit, state }, payload) {
    return api.isCandidate(state.token, payload.id, payload.candidate).then(value => {
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: 'Error', 
        content: reason
      }, { root: true })
      return false
    })
  },

  /**
   * Vote for candidate
   * @param commit
   * @param state
   * @param candidate_id
   * @return {Promise}
   */
  voteCandidate ({commit, state}, candidate_id){
    return api.voteCandidate(state.token, candidate_id).then(response => {
      return response.data
    }).catch(reason => {
      commit('notification/showError', {
        title: 'Vote System Error', 
        content: reason
      }, { root: true })
      //return false
    })
  },

  /**
   * Discaard a vote
   * @param commit
   * @param state
   * @param candidate_id
   * @return {Promise}
   */
  discardVote ({commit, state}, candidate_id){
    return api.discardVote(state.token, candidate_id).then(response => {
      return response.data
    }).catch(reason => {
      commit('notification/showError', {
        title: 'Discard Vote Error', 
        content: reason
      }, { root: true })
      //return false
    })
  }
}

// methods that change the state
const mutations = {
  setLogged (state) {
    state.logged = true
  },
  setProfile (state, profile) {
    state.profile = profile
  },
  setToken (state, payload) {
    state.token = payload.token
  },
  setLoggedOut (state) {
    state.logged = false
  },
  setUserInfos (state, infos) {
    state.infos = infos
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
