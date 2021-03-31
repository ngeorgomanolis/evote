// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import { router } from './router/router.js';
import store from './store/index.js';
import BootstrapVue from 'bootstrap-vue'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all'
import 'codemirror/lib/codemirror.css'
import './scss/global.scss'

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(BootstrapVue)


let cookie_enabled = false;

window.Vue = Vue

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
