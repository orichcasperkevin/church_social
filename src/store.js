import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showNav: true,
  },
  mutations: {
    showNav(state,payload){
      state.showNav = payload
    }
  },
  actions: {
    update_showNav(context,payload){
      context.commit('showNav', payload)
    }
  },
  getters: {
    showNav(state){
      return state.showNav
    }
  }
})
