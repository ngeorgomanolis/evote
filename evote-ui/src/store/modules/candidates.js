import api from '@/api/candidates'

// global state for this module
const state = {
  candidates: [], // all candidates
}

// filter methods on the state data
const getters = {}

// async methods making mutations are placed here
const actions = {
  /**
   * Gets all the available candidates
   * @param commit
   * @return {Promise}
   */
  getCandidates ({ commit }) {
    return api.getCandidates().then(value => {
      commit('setCandidates', value.data.candidates)
      return value.data.candidates
    }).catch(reason => {
      commit('notification/showError', {
        title: 'ERROR', 
        content: reason
      }, { root: true })
      return false
    })
  },
}

// methods that change the state
const mutations = {
  setCandidates (state, candidates) {
    state.candidates = candidates
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
