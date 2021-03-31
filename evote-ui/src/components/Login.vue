<template>
  <b-container>
    
    <b-row class="mt-4 justify-content-center">
      <b-col md="6" md-offset="3">
        <h1>Login</h1>
        <b-form ref="form-login" class="mt-4" @submit.prevent="onSubmit">
          <b-form-group id="input-group-1" label="Email address" label-for="email">
            <b-form-input
              id="email"
              v-model="form.email"
              type="email"
              required
              placeholder="Email">
            </b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Password" label-for="password">
            <b-form-input
              id="password"
              type="password"
              v-model="form.password"
              required
              placeholder="Password">
            </b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-col>
        <p class="text-center">Not registered?<b-link :to="{ name: 'register' }">Sign up for free now</b-link></p>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'Login',
  created () {},
  data: () => {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('user', [
      'signIn','getAccountProfile'
    ]),
    ...mapMutations('notification', [
      'showInfo', 'showError'
    ]),
    onSubmit () {
      this.signIn(this.form).then((response) => {
        if (response.token && !response.error) {
          this.showInfo({
            title: "Welcome",
            content: "We are happy to see you again!"
          })
          this.getAccountProfile()
          this.$router.push({ name: 'home' })
        } else {
          this.showError({
            title: "Sign In Error",
            content: response.message
          })
        }
      })
    }
  },
  computed: {
    ...mapState('user', [
      'logged'
    ])
  }
}
</script>

<style scoped>

</style>
