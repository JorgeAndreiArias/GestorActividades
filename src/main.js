import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'
import VueSweetalert2 from 'vue-sweetalert2';
import VueCookies from 'vue-cookies'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

Vue.use(VueCookies)
Vue.use(VueSweetalert2);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})