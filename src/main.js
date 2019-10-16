import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import VueChatScroll from 'vue-chat-scroll'

Vue.use(VueChatScroll)

Vue.prototype.$http = axios
Vue.prototype.$BASE_URL = "http://127.0.0.1:8000"

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
