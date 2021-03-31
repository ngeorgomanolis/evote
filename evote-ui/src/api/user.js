import axios from 'axios'
axios.defaults.headers['Content-Type'] = 'application/json'

export default {
  register (email,password) {
    return axios.post(process.env.BASE_ENDPOINT + 'register', {
      email, password
    })
  },
  signIn (email, password) {
    return axios.post(process.env.BASE_ENDPOINT + 'login', {
      email, password
    })
  },
  getAccountProfile (token) {
    axios.defaults.headers['x-access-token'] = token
    return axios.get(process.env.BASE_ENDPOINT + 'profile')
  },
  isCandidate(token, id, value ){
    axios.defaults.headers['x-access-token'] = token
    return axios.put(process.env.BASE_ENDPOINT + 'profile/update',{
      id:id,
      candidate:value
    })
  },
  voteCandidate(token, id ){
    axios.defaults.headers['x-access-token'] = token
    return axios.post(process.env.BASE_ENDPOINT + 'vote/add',{
      candidate_id:id
    })
  },
  discardVote(token, id ){
    axios.defaults.headers['x-access-token'] = token
    return axios.post(process.env.BASE_ENDPOINT + 'vote/discard',{
      candidate_id:id
    })
  },
  signOut () {
    return axios.get(process.env.BASE_ENDPOINT + 'logout', {
      data: {},
      withCredentials: true
    })
  }
}
