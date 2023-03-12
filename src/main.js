import Vue from 'vue'
import App from './App.vue'
//import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './plugins/axios'
import router from "@/router"
import VueMask from 'v-mask'

import "../node_modules/@fortawesome/fontawesome-free/css/all.css"

import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"

import "./styles.css"

// Import Bootstrap and BootstrapVue CSS files (order is important)
//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
//Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
//Vue.use(IconsPlugin)
Vue.use(VueMask)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

