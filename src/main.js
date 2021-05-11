import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store'
import VueRouter from "vue-router";
import axios from "axios";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import './style/app.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$axios = axios.create({
  baseURL: 'http://ab6c4c95d4e1a42b28daadd5f536f662-1813810788.eu-west-3.elb.amazonaws.com',
  headers: {
    common: {
      'Authorization' : localStorage.getItem('id_token') ? 'Bearer ' + localStorage.getItem('id_token') : ''
    },
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    'Accept': '*/*',
  }
})
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
