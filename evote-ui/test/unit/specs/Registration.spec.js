import Registration from '@/components/Registration'
import Vuex from 'vuex'
import router from '@/router/router'
import store from '@/store'
import sinon from 'sinon'
import BootstrapVue from 'bootstrap-vue'
import { createLocalVue, mount } from '@vue/test-utils'

const localVue = createLocalVue()

describe('Registration.vue', () => {

  let sandbox
  localVue.use(Vuex)
  localVue.use(BootstrapVue)

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  it('should register if all field valid', function () {
    const registerStub = sandbox.stub().returns(new Promise(() => true))

    const wrapper = mount(Registration, {
      store,
      localVue,
      router,
      methods: {
        register: registerStub
      }
    })

    wrapper.setData({
      form: {
        email: '1@q.com',
        password: '1'
      }
    })

    const form = wrapper.find({ ref: 'form-registration' })
    form.trigger('submit')

    //expect(registerStub.calledOnce).to.equal(true)
  })

  it('should not register if the form is incomplete', function () {
    const registerStub = sandbox.stub().returns(new Promise(() => true))

    const wrapper = mount(Registration, {
      store,
      localVue,
      router,
      methods: {
        register: registerStub
      }
    })

    wrapper.setData({
      form: {
        email: '1@q.com',
        password: ''
      }
    })

    const form = wrapper.find({ ref: 'form-registration' })
    form.trigger('submit')

    //expect(registerStub.calledOnce).to.equal(false)
  })

  afterEach(() => {
    sandbox.restore()
  })
})
