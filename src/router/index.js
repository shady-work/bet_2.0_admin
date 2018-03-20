import Vue from 'vue';
import Router from 'vue-router';
import login from '../components/login';
import test from '../components/test';
import index from '../components/index';
import users from '../components/user_manager';
import add_user from '../components/add_user';
import recharge from '../components/recharge'
import withdraw from '../components/withdraw'
import user_money from '../components/user_money'
import cqssc from '../components/cqssc'
import cqssc_odds from '../components/cqssc_odds'
import cqssc_odds_user from '../components/cqssc_odds_user'
import cqssc_history from '../components/cqssc_history'
import cqssc_history_bet from '../components/cqssc_history_bet'


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
          path:'/',        //index page
          name:'index',
          component:test,
        },
        {
          path:'users',    //users page
          name:'users',
          component:users,
        },
        {
          path:'add_user',  //add user page
          name:'add_user',
          component:add_user,
        },
         {
          path:'user_money',  //user money
          name:'user_money',
          component:user_money,
        },
        {
          path:'recharge',  //recharge page
          name:'recharge',
          component:recharge,
        },
        {
          path:'withdraw',  //withdraw page
          name:'withdraw',
          component:withdraw,
        },
        {
          path:'cqssc',  //cqssc page
          name:'cqssc',
          component:cqssc,
        },
        {
          path:'cqssc_odds',  //cqssc_odds page
          name:'cqssc_odds',
          component:cqssc_odds,
        },
        {
          path:'cqssc_odds_user',  //cqssc_odds_user page
          name:'cqssc_odds_user',
          component:cqssc_odds_user,
        },
        {
          path:'cqssc_history',  //cqssc_history page
          name:'cqssc_history',
          component:cqssc_history,
        },
        {
          path:'cqssc_history_bet',  //cqssc_history_bet page
          name:'cqssc_history_bet',
          component:cqssc_history_bet,
        },

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
