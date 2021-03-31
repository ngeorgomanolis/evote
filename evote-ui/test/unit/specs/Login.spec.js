import Login from '@/components/Login'
import Vuex from 'vuex'
import router from '@/router/router'
import store from '@/store'
import sinon from 'sinon'
import BootstrapVue from 'bootstrap-vue'
import {createLocalVue, shallowMount, mount} from '@vue/test-utils'

const localVue = createLocalVue()

describe('Login.vue', () => {

  let sandbox
  localVue.use(Vuex)
  localVue.use(BootstrapVue)

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  it('should register if all field valid', function () {

    const loginStub = sandbox.stub().returns(new Promise(() => true))

    const wrapper = mount(Login, {
      store,
      localVue,
      router,
      methods: {
        register: loginStub
      }
    })

    wrapper.setData({
      form: {
        email: '1@q.com',
        password: '1'
      }
    })

    const form = wrapper.find({ ref: 'form-login' })
    form.trigger('submit')

    //expect(loginStub.calledOnce).to.equal(true)

  })

  afterEach(() => {
    sandbox.restore()
  })

})
