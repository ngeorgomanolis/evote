import store from '@/store'
import userModule from '@/store/modules/user'
import { testAction } from '../helper'
const actionsInjector = require('inject-loader!@/store/modules/user.js')

describe('store/modules/user', () => {

  it('test action: user/signIn success', done => {
    const credentials = {
      login: '',
      password: ''
    }

    const user = actionsInjector({
      '@/api/user': {
        signIn (params) {
          return new Promise((resolve, reject) => {
            setTimeout(function () {
              resolve({
                data : {
                  error:false,
                  token:'1'
                }
              })
            }, 10)
          })
        }
      }
    })

    testAction(user.default.actions.signIn, credentials, user.default.state, store.state, [
      { type: 'setLogged' },
      { type: 'setToken', payload: {error:false,token:'1'}}
    ], done)
  })

  it('test action: user/getAccountProfile with authenticated session success', done => {

    const user = actionsInjector({
      '@/api/user': {
        getAccountProfile () {
          return new Promise((resolve, reject) => {
            resolve({
              data: {
                error: false,
                token: "1",
                profile: {}
              }
            })
          })
        }
      }
    })

    testAction(user.default.actions.getAccountProfile, null, user.default.state, store.state, [
      { type: 'setProfile', payload: {} },
      { type: 'setLogged' }
    ], done)
  })

  it('test action: user/getAccountProfile error', done => {
    const error = new Error('HTTP ERROR')

    const user = actionsInjector({
      '@/api/user': {
        getAccountProfile () {
          return new Promise((resolve, reject) => {
            reject(error)
          })
        }
      }
    })

    testAction(user.default.actions.getAccountProfile, null, user.default.state, store.state, [
      { type: 'notification/showError', payload: { title: 'Error', content: error } }
    ], done)
  })

});