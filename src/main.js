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
Vue.prototype.$BASE_URL = "http://127.0.0.1:8000"
Vue.prototype.$goBack = function(){window.history.back()}
// Vue.prototype.$storageAvailable= function (type) {
// 	    var storage;
// 	    try {
// 		storage = window[type];
// 		var x = '__storage_test__';
// 		storage.setItem(x, x);
// 		storage.removeItem(x);
// 		return true;
// 	    }
// 	    catch(e) {
// 		return e instanceof DOMException && (
// 		    // everything except Firefox
// 		    e.code === 22 ||
// 		    // Firefox
// 		    e.code === 1014 ||
// 		    // test name field too, because code might not be present
// 		    // everything except Firefox
// 		    e.name === 'QuotaExceededError' ||
// 		    // Firefox
// 		    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
// 		    // acknowledge QuotaExceededError only if there's something already stored
// 		    (storage && storage.length !== 0);
// 	    }
// 	}

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
