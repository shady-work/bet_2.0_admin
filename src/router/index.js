import Vue from 'vue';
import Router from 'vue-router';
import login from '../components/login';
import test from '../components/test';
import index from '../components/index';
import users from '../components/user_manager';
import add_user from '../components/add_user';
import recharge from '../components/recharge'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'index',
      component:index,
      children:
      [

        {
          path:'/',
          name:'index',
          component:test,
        },
        {
          path:'users',
          name:'users',
          component:users,
        },
        {
          path:'add_user',
          name:'add_user',
          component:add_user,
        },
        {
          path:'recharge',
          name:'recharge',
          component:recharge,
        }
      ],
    }
    ,
    {
      path: '/login',
      name: 'login',
      component: login
    },
  ]
})
