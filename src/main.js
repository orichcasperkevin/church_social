import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import VueChatScroll from 'vue-chat-scroll'
import VueSession from 'vue-session'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import VueLetterAvatar from 'vue-letter-avatar';
import VueWorker from 'vue-worker'


Vue.use(VueWorker,'$worker') 
Vue.use(VueLetterAvatar);
Vue.use(VueSession)
Vue.use(VueChatScroll)

TimeAgo.addLocale(en)

Vue.prototype.$timeAgo = new TimeAgo('en-US')
Vue.prototype.$http = axios
Vue.prototype.$BASE_URL = "http://tenant.my-domain.com:8000"

Vue.prototype.$goBack = function(){window.history.back()}
Vue.prototype.$humanizeDate = function(date_time){return this.$timeAgo.format(new Date(date_time), 'twitter')},

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
