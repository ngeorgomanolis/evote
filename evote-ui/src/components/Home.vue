<template>
  <div>
    <app-cover>
      
      <h2 class="cover-heading scroll-effect">Vote for President, Today!</h2>

      <p class="cover-subheading scroll-effect scroll-effect-delayed-1">
        A selection of oustanding wanna be politicians.
      </p>
      
      <p class="text-center scroll-effect scroll-effect-delayed-2" v-if="this.logged">
        <b-button v-if="!profile.candidate" @click="participate" variant="primary">I want to become President!</b-button>
        <b-button v-else @click="discard" variant="primary">President? It's no longer my dream!</b-button>
      </p>
      
      <p class="text-center scroll-effect scroll-effect-delayed-2" v-if="this.logged">
        <span v-if="!profile.candidate">
          <span v-if="canLoggedUserVote">You can vote for up to 2 candidates (Votes left : <span v-html="getVotesLeft()"></span>)</span>
          <span v-else>You have reached your max vote</span>
        </span>
      </p>
      
    </app-cover>

    <b-container>
      <b-row class="mt-4">
        <b-col v-if="!this.logged">
          <h1 class="text-center centered">Unauthorized area. Please <router-link :to="{ name: 'login' }">sign in</router-link> to vote.</h1>
        </b-col>
        <b-col v-else>
          <h1 class="text-center centered">Our Candidates</h1>
          <b-row>
            <b-col :key="candidate.id" v-for="candidate in candidates" md="4" class="mt-3">
              <app-candidate-card :candidate="candidate" ></app-candidate-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
import { mapState, mapActions,mapMutations,mapGetters } from 'vuex'
import Cover from './Common/Cover'
import CandidateCard from './Common/CandidateCard'

export default {
  name: 'Home',
  components: {
    'app-cover': Cover,
    'app-candidate-card': CandidateCard
  },
  created () {
    if(this.logged)
      this.getCandidates()
  },
  methods: {
    ...mapActions('candidates', [
      'getCandidates'
    ]),
    ...mapActions('user', [
      'isCandidate','getAccountProfile'
    ]),
     ...mapMutations('notification', [
      'showError', 'showSuccess'
    ]),
     ...mapGetters('user', [
      'canLoggedUserVote','getVotesLeft'
    ]),
    participate(){
      this.isCandidate({
        id: this.profile.id, 
        candidate:true
        })
        .then((response)=>{
          if (response.error) {
            this.showError({
              title: 'Participation failed',
              content: 'Unfortunately, currently you cannot participate'
            })
          } else {
            this.showSuccess({
              title: 'Congratulations!',
              content: 'You are already on the list! You can discard your candidancy anytime. Good luck!!'
            })
            this.getAccountProfile()
            this.getCandidates()
          }
      })
    },
    discard(){
      this.isCandidate({
        id: this.profile.id, 
        candidate:false
        })
        .then((response)=>{
          if (response.error) {
            this.showError({
              title: 'Participation failed',
              content: 'Unfortunately, currently you cannot remove you from the list'
            })
          } else {
            this.showSuccess({
              title: 'We will miss you!',
              content: 'You are now out of list! Thank you for participating!!'
            })
            this.getAccountProfile()
            this.getCandidates()
          }
      })
    }
  },
  computed: {
    ...mapState('candidates', {
      candidates: state => state.candidates
    }),
    ...mapState('user', [
      'logged','profile'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
