import Vue from 'vue'
import Router from 'vue-router'
import Computers from './views/Computers.vue'
import Users from './views/Users.vue'
import All from './views/All.vue'
import Login from './views/Login.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: All
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },

  ]
})
