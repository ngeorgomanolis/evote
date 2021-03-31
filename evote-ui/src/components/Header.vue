<template>
  <b-navbar :sticky="true" toggleable="lg" type="light" variant="light">
    <b-navbar-brand>
      <div class="beta">eVOTE</div>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{ name: 'home' }">Home</b-nav-item>
            <b-nav-item v-if="!userLogged" :to="{ name: 'login' }">Login</b-nav-item>
            <b-nav-item v-else :to="{ name: 'logout' }">Logout</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Header',
  data: () => {
    return {
      defaultImage:require('@/assets/graphic-community.png')
    }
  },
  computed: {
    ...mapState({
      userLogged: state => state.user.logged,
      userProfile: state => state.user.infos
    })
  }
}

</script>

<style lang="scss">
  @import '@/styles/themes.scss';
  @import '@/styles/variables.scss';

  #dropdownLang > ul{
    min-width:1rem
  }

  .beta {
    margin-left: 4px;
    font-size: 40px;
    //font-size: $font-size-tiny;
    line-height: 100%;
    text-transform: uppercase;
    font-weight: 700;
    padding: 4px;
    display: flex;
    align-self: flex-start;
  }

  .loginBtn {
    padding: 0 8px;
    height: 42px;
    margin: 14px;
    font-size: 13px;
    border: 1px solid #231f20;
    color: #c5202e;
    border-radius: 6px;
    outline: none;
    cursor: pointer;
    text-transform: uppercase;
    background: none;
  }
  
</style>
