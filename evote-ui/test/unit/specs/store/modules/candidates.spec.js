import store from '@/store'
import userModule from '@/store/modules/candidates'
import { testAction } from '../helper'
const actionsInjector = require('inject-loader!@/store/modules/candidates.js')

describe('store/modules/candidates', () => {

  it('test action: candidates/getCandidates success', done => {

    const candidates = actionsInjector({
      '@/api/candidates': {
        getCandidates (params) {
          return new Promise((resolve, reject) => {
            setTimeout(function () {
              resolve({
                data : {
                  error:false,
                  candidates: []
                }
              })
            }, 10)
          })
        }
      }
    })

    testAction(candidates.default.actions.getCandidates, null, candidates.default.state, store.state, [
      { type: 'setCandidates', payload: [] }
    ], done)
  })

});