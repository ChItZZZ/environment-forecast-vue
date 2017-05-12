// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import vuex from './store'
// import router from './router'
import VueResource from 'vue-resource'
import './styles/main.css'

Vue.config.productionTip = false

Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // store,
  // router,
  template: '<App/>',
  components: { App }
})


console.log($);