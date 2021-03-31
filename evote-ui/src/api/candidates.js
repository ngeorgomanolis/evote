import axios from 'axios'
axios.defaults.headers['Content-Type'] = 'application/json'

export default {
  /**
   * Get the list of all candidates
   */
  getCandidates () {
    return axios.get(process.env.BASE_ENDPOINT + 'candidates')
  }
}
