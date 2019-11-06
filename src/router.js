import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/me',
      name: 'me',
      component: () => import('./views/Me.vue')
    },
    {
      path: '/discussions',
      name: 'discussions',
      component: () => import('./views/Discussions.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('./views/News.vue')
    },
    {
      path: '/sermons',
      name: 'sermons',
      component: () => import('./views/Sermons.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('./views/Services.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('./views/Blog.vue')
    },
    {
      path: '/channel-detail/:id',
      name: 'channel-detail',
      component: () => import('./views/ChannelDetail.vue')
    },
    {
      path: '/peer-to-peer-chat/:id',
      name: 'peer-to-peer-chat',
      component: () => import('./views/PeerToPeerChats.vue')
    }
  ]
})
