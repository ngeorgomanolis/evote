<template>
  <b-container>
  <b-row class="mt-4 justify-content-center">
    <b-col md="6" md-offset="3">
      <b-row>
        <b-col>
          <h1>Registration</h1>
          <b-form ref="form-registration" @submit.prevent="submitRegistration" class="mt-4">
            <!-- Email -->
            <b-form-group
              label="Email address"
              label-for="email"
              :state="emailValid"
              :invalid-feedback="emailFeedback">

              <b-input id="email"
                type="email"
                v-model="form.email"
                @input="fieldUpdated('email')"
                placeholder="Email address">
              </b-input>
            </b-form-group>

            <!-- Password -->
            <b-form-group 
              label="Password"
              label-for="password"
              :state="passwordsValid"
              :invalid-feedback="passwordFeedback">

              <b-input id="password"
                type="password"
                v-model="form.password"
                @input="fieldUpdated('password')"
                placeholder="Password">
              </b-input>
            </b-form-group>

            <!-- Password confirmation -->
            <b-form-group
              label="Confirm password"
              label-for="password-confirmation"
              :state="passwordsValid"
              :invalid-feedback="passwordFeedback">

            <b-input id="password-confirmation"
              type="password"
              v-model="form.passwordConfirmation"
              @input="fieldUpdated('password')"
              placeholder="Confirm password">
            </b-input>
          </b-form-group>

          <b-button class="mt-3" type="submit" variant="primary"> Submit</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-col>
</b-row>
</b-container>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import { validateEmail } from '@/helper'

export default {
  name: 'Registration',
  data: () => {
    return {
      form: {
        email: '',
        password: '',
        passwordConfirmation: ''
      },

      firstInteractions: {
        fullname: true,
        username: true,
        email: true,
        password: true
      }
    }
  },
  methods: {
    ...mapMutations('notification', [
      'showError', 'showSuccess'
    ]),
    ...mapActions('user', [
      'register', 'getAccountProfile'
    ]),

    submitRegistration () {
      this.firstInteractions = {
        fullname: false,
        username: false,
        email: false,
        password: false
      }

      if (
        this.emailValid &&
        this.passwordsValid
      ) {
        this.register({
          email: this.form.email,
          password: this.form.password
        }).then(response => {
          if (response.token) {
            this.showSuccess({
              title: 'Registration Success',
              content: 'You can now vote or be voted! Good luck!!'
            })
            this.getAccountProfile().then(() => {
              if (this.userLogged) {
                this.$router.push({ name: 'home' })
              }
            })
          }  else {
             this.showError({
              title: 'Registration Issues',
              content: response.message
            })
          }

        })
      } else {
        this.showError({
          title: 'Incomplete form',
          content: 'Form validation issues.'
        })
      }
    },

    fieldUpdated (fieldName) {
      this.firstInteractions[fieldName] = false
    }
  },
  computed: {
    ...mapState('user', {
      userLogged: state => state.logged
    }),
    // email validation
    emailValid () {
      return this.firstInteractions.email || (this.form.email.length >= 3 && this.form.email.length <= 254 && validateEmail(this.form.email))
    },
    emailFeedback () {
      return "Email must be between 3 and 254 characters long and must be a valid email address"
    },
    // password validation
    passwordsValid () {
      return this.firstInteractions.password || (this.form.password === this.form.passwordConfirmation && this.form.password.length > 0)
    },
    passwordFeedback () {
      if (this.form.password.length === 0) {
        return "The password cannot be empty"
      } else {
        return "Passwords must match"
      }
    }
  }
}
</script>

<style scoped>

</style>
