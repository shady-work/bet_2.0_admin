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
import cqssc_turntable from '../components/cqssc_turntable'
import pk10 from '../components/pk10'
import pk10_odds from '../components/pk10_odds'
import pk10_odds_user from '../components/pk10_odds_user'
import pk10_history from '../components/pk10_history'
import pk10_history_bet from '../components/pk10_history_bet'
import pcegg from '../components/pcegg'
import pcegg_history from '../components/pcegg_history'
import pcegg_history_bet from '../components/pcegg_history_bet'
import pcegg_odds from '../components/pcegg_odds'
import pcegg_odds_user from '../components/pcegg_odds_user'
import cake from '../components/cake'
import cake_history from '../components/cake_history'
import cake_history_bet from '../components/cake_history_bet'
import cake_odds from '../components/cake_odds'
import cake_odds_user from '../components/cake_odds_user'

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
        {
          path:'cqssc_turntable',  //cqssc_turntable page
          name:'cqssc_turntable',
          component:cqssc_turntable,
        },
        {
          path:'pk10',  //pk10 page
          name:'pk10',
          component:pk10,
        },
        {
          path:'pk10_odds',  //pk10_odds page
          name:'pk10_odds',
          component:pk10_odds,
        },
        {
          path:'pk10_odds_user',  //pk10_odds_user page
          name:'pk10_odds_user',
          component:pk10_odds_user,
        },
        {
          path:'pk10_history',  //pk10_history page
          name:'pk10_history',
          component:pk10_history,
        },
        {
          path:'pk10_history_bet',  //pk10_history_bet page
          name:'pk10_history_bet',
          component:pk10_history_bet,
        },
        {
          path:'pcegg',  //pcegg page
          name:'pcegg',
          component:pcegg,
        },
        {
          path:'pcegg_history',  //pcegg_history page
          name:'pcegg_history',
          component:pcegg_history,
        },
        {
          path:'pcegg_history_bet',  //pcegg_history_bet page
          name:'pcegg_history_bet',
          component:pcegg_history_bet,
        },
        {
          path:'pcegg_odds',  //pcegg_odds page
          name:'pcegg_odds',
          component:pcegg_odds,
        },
        {
          path:'pcegg_odds_user',  //pcegg_odds_user page
          name:'pcegg_odds_user',
          component:pcegg_odds_user,
        },
        {
          path:'cake',  //cake page
          name:'cake',
          component:cake,
        },
        {
          path:'cake_history',  //cake_history page
          name:'cake_history',
          component:cake_history,
        },
        {
          path:'cake_history_bet',  //cake_history_bet page
          name:'cake_history_bet',
          component:cake_history_bet,
        },
        {
          path:'cake_odds',  //cake_odds page
          name:'cake_odds',
          component:cake_odds,
        },
        {
          path:'cake_odds_user',  //cake_odds_user page
          name:'cake_odds_user',
          component:cake_odds_user,
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
