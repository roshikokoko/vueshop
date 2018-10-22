// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import VeeValidate from 'vee-validate';
import zhTW_Validate from 'vee-validate/dist/locale/zh_TW';
import 'vue-loading-overlay/dist/vue-loading.css';

import 'bootstrap';

import App from './App'
import router from './router'
import store from './store'
import './bus'
import currencyFilter from './filters/currency'

//Vue.config.productionTip = false
axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios)
Vue.use(Vuex)

VeeValidate.Validator.localize('zh_TW',zhTW_Validate);
Vue.use(VeeValidate);
//Vue.use(Loading);
Vue.component('loading', Loading);
Vue.filter('currency', currencyFilter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  console.log(to, from, next);
  if(to.meta.requiresAuth){
    console.log('需要驗證');
    const api = `${process.env.APIPATH}/api/user/check`;
    const vm = this;
    axios.post(api, vm.user).then((response) => {
      console.log(response.data)
      if(response.data.success){
           next();
      } else {
        next({
          path:'/login'
        });
      }
    });
  } else {
    next();
  }
})