<template>
  <div class="project">
    <div class="project-info">
      <b-badge class='project-restricted'>
        #<span v-html="candidate.votes_receive"></span> votes
      </b-badge>

      <b-row class="row text-center mb-4">
        <b-col class="col-image">
          <div class="project-image" :style="{ 'background-image': 'url(' + getBaseUrl() + ')'  }"></div>
        </b-col>
      </b-row>

      <b-row class="row">
        <b-col>
          <h3 v-html="truncateStr(candidate.username,15)"></h3>
          <p></p>
        </b-col>
      </b-row>
    
      <b-btn v-if='!hasBeenVoted(candidate.id)' variant="primary" @click="vote" :id="candidate.id" :disabled="isLoggedUserCandidate(candidate)">Vote</b-btn>
      <b-btn v-else variant="info" @click="discardVoteCandidate" :id="candidate.id">Discard</b-btn>
    </div>
     
    <div class="overlay"></div>
    <div class="project-bg-image" :style="{ backgroundImage: 'url('+ getBaseUrl() +')' }"></div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState,mapGetters } from 'vuex'
import {truncate} from '@/helper'

export default {
  name: 'ProjectCard',
  data: () => {
    return {
      defaultImg: require('@/assets/graphic-community.png'),
      candidateImg: require('@/assets/logo.png')
    }
  },
  props: {
    candidate: Object
  },
  computed:{
    ...mapState('user', [
      'profile'
    ]),
    ...mapGetters('user', [
      'isLoggedUserCandidate','hasBeenVoted'
    ]),   
  },
  methods:{
    ...mapMutations('notification', [
      'showError', 'showSuccess','showInfo'
    ]),
    ...mapActions('user',[
      'voteCandidate','discardVote','getAccountProfile'
    ]),
    ...mapActions('candidates',[
      'getCandidates'
    ]),
    vote(event){
      this.voteCandidate(event.target.id).then((response)=>{
        if(response.error){
          this.showError({
            title: 'Voting System',
            content: response.message
          })
        } else{ 
          this.showSuccess({
            title: 'Voting System',
            content: response.message
          })
          this.getCandidates().then(()=>{
            this.getAccountProfile()
          })
        }
       
      })
    },
    discardVoteCandidate(event){
      this.discardVote(event.target.id).then((response)=>{
        if(response.error){
          this.showError({
            title: 'Voting System',
            content: response.message
          })
        } else{ 
          this.showSuccess({
            title: 'Voting System',
            content: response.message
          })
          this.getCandidates().then(()=>{
            this.getAccountProfile()
          })
        }
      })
    },
    getBaseUrl(){
      //return (this.isLoggedUserCandidate(this.candidate)) ? this.candidateImg : this.defaultImg
      return (this.candidate.info && this.candidate.info.picture) ? this.candidate.info.picture : this.defaultImg
    },
    truncateStr(str, len){
      return truncate(str,len)
    },
  }
}
</script>

<style lang="scss" scoped>
  @import '../../scss/variables.scss';

  .project {
    position: relative;
    border-radius: $border-radius;
    box-shadow: 0 4px 8px -4px rgba($black,0.2);
    overflow: hidden;

    .project-info {
      position: relative;
      z-index: 2;
      color: white;
      height: 100%;
      padding: $spacing-3 $spacing-2;

      .project-restricted{
        position: absolute;
        right: 0;
        top: 0;
        font-size: 20px;
      }

      .project-type {
        display: block;
        font-size: $font-size-small;
        text-transform: uppercase;
        margin-bottom: $spacing-1;
      }

      .col-image {
        .project-image {
          border-radius: 50%;
          width: 9rem;
          height: 9rem;
          background-size: cover;
          background-position: 50% 50%;
          margin: auto;
          box-shadow: 0 4px 8px $color-black-tint-20;
        }
      }

      h3 {
        font-size: $font-size-medium;
        font-weight: 700;
        line-height: 1.25;
        text-align: left;
        margin-bottom: $spacing-2;
        text-transform: uppercase;
      }

      p {
        font-size: $font-size-small;
        margin-bottom: $spacing-2;
      }
    }

    .overlay {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: linear-gradient(120deg, $color-gradient-start, $color-gradient-end);
      opacity: 0.8;
    }

    .project-bg-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: 50% 50%;
    }

    transition: all $transition-duration-long*2 $transition-timing-function;
    &:active {
      //transform: translateY(-$spacing-1/2);
      .btn-primary {
        background-color: $color-primary-shade-20;
      }
    }
    @media (hover: hover) {
      &:hover {
        //transform: translateY(-$spacing-1/2);
        .btn-primary {
          background-color: $color-primary-shade-20;
        }
      }
    }

  }

  @media only screen and (min-width: $viewport-mobile-large) {

    .project {
      .project-info {
        padding: $spacing-4 $spacing-3;
      }
      .info-text {
        max-width: 160px;
      }
    }
  }

  @media only screen and (min-width: $viewport-tablet-portrait) {

    .project {
      .info-text {
        max-width: none;
      }
    }

  }

  @media only screen and (min-width: $viewport-large) {

    .project {
      height: 100%;
      .project-info {
        p {
          margin-bottom: $spacing-7;
        }
        .btn {
          position: absolute;
          bottom: $spacing-4;
          left: $spacing-3;
        }
        .row {
          position: initial;
        }
      }
    }
  }

  @media only screen and (min-width: $viewport-xlarge) {

  }

</style>
