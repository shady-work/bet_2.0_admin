<template>
  <div id="left">
      <!--用户管理-->
      <div class="list-admin c-3f " @click="showUsers()">
         用户管理
      </div>
      <div class="items" id="users" style="display:none;">
        <div class="list-admin-items">
          <router-link to="users" >查看用户信息</router-link>
          <router-link to="add_user" >添加用户</router-link>
        </div>
      </div>
      <!--充值-->
      <div class="list-admin c-3f " @click="toUrl('recharge')">
        资金明细
      </div>
      <!--提现-->
      <!--<div class="list-admin c-3f " @click="toUrl('withdraw')">-->
       <!--提现-->
      <!--</div>-->
      <!--重庆时时彩-->
      <div class="list-admin c-3f show-cqssc" @click="showitems_cqssc()" >
         重庆时时彩
      </div>
      <div class="items-cqssc" id="cq" style="display:none;">
          <div class="list-admin-items">
            <router-link to="cqssc" >用户注额列表</router-link>
          </div>
          <div class="list-admin-items">
            <router-link to="cqssc_odds" >赔率列表</router-link>
          </div>
          <div class="list-admin-items">
            <router-link to="cqssc_odds_user" >用户赔率列表</router-link>
          </div>
          <div class="list-admin-items">
            <router-link to="cqssc_history" >开奖历史</router-link>
          </div>
          <div class="list-admin-items">
            <router-link to="cqssc_history_bet" >下注历史</router-link>
          </div>
          <div class="list-admin-items">
            <router-link to="cqssc_turntable" >转盘列表</router-link>
          </div>
      </div>

      <!--北京pk10-->
      <div class="list-admin c-3f " @click="showitems_pk10()" >
        北京赛车pk10
      </div>
      <div class="items" id="pk10" style="display:none;">
        <div class="list-admin-items">
          <router-link to="pk10" >用户注额列表</router-link>
        </div>
        <div class="list-admin-items">
          <router-link to="pk10_odds" >赔率列表</router-link>
        </div>
        <div class="list-admin-items">
          <router-link to="pk10_odds_user" >用户赔率列表</router-link>
        </div>
        <div class="list-admin-items">
          <router-link to="pk10_history" >开奖历史</router-link>
        </div>
        <div class="list-admin-items">
          <router-link to="pk10_history_bet" >下注历史</router-link>
        </div>
        <div class="list-admin-items">
          <router-link to="cqssc_turntable" >转盘列表</router-link>
        </div>
      </div>

      <!--pc蛋蛋-->
      <div class="list-admin c-3f " @click="showitems_pcegg()" >
        PC蛋蛋
      </div>
      <div class="items" id="pcegg" style="display:none;">
        <div class="list-admin-items">
          <router-link to="pcegg" >用户注额列表</router-link>
        </div>
        <div class="list-admin-items">
          <router-link to="pcegg_odds" >赔率列表</router-link>
        </div>
        <div class="list-admin-items">
          <router-link to="pcegg_odds_user" >用户赔率列表</router-link>
        </div>
        <div class="list-admin-items">
          <router-link to="pcegg_history" >开奖历史</router-link>
        </div>
        <div class="list-admin-items">
          <router-link to="pcegg_history_bet" >下注历史</router-link>
        </div>
        <div class="list-admin-items">
          <router-link to="cqssc_turntable" >转盘列表</router-link>
        </div>
      </div>


      <!--cake_no-->
      <div class="list-admin c-3f " @click="showitems_cake()" >
        加拿大28
      </div>
      <div class="items" id="cake" style="display:none;">
        <div class="list-admin-items">
          <router-link to="cake" >用户注额列表</router-link>
        </div>
        <div class="list-admin-items">
          <router-link to="cake_odds" >赔率列表</router-link>
        </div>
        <div class="list-admin-items">
          <router-link to="cake_odds_user" >用户赔率列表</router-link>
        </div>
        <div class="list-admin-items">
          <router-link to="cake_history" >开奖历史</router-link>
        </div>
        <div class="list-admin-items">
          <router-link to="cake_history_bet" >下注历史</router-link>
        </div>
        <div class="list-admin-items">
          <router-link to="cqssc_turntable" >转盘列表</router-link>
        </div>
      </div>

      <div class="list-admin c-3f"  @click="toUrl('watch_order')">
        watch_order
      </div>


      <div class="list-admin c-3f"  @click="toUrl('articles')">
        articles
      </div>


  </div>
</template>
<script>
  import '../assets/js/jquery.min.js';
  export default
  {
      data()
      {
         return{
           isShowCqssc:false,
         }

      },
      methods:
      {
        toUrl:function(uri)
        {
          this.$router.push(uri);
        },
        showitems_cqssc:function()
        {
            $('#cq').slideToggle(100);
        },
        showUsers:function()
        {
           $('#users').slideToggle(100);
        },
        showitems_pk10:function ()
        {
          $('#pk10').slideToggle(100);
        },
        showitems_pcegg:function ()
        {
          $('#pcegg').slideToggle(100);
        },
        showitems_cake:function ()
        {
          $('#cake').slideToggle(100);
        },
        //
      }

  };

</script>

<style scoped>
  #left {
    position: fixed;
    height: 100%;
    width: 200px;
    left: 0;
    top: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: #333;
    border: 1px solid #222;
    padding-top: 55px;
    padding-left:4px;
    padding-right:4px;
    color: #fff;
    z-index: 2;
  }

  #left > .list-group, #left > .list-group > li {
    background: #333;
    color: #fff;
    border: none;
    box-sizing: border-box;
  }

  #left > .list-group > li {
    border-bottom: 1px solid #f3f3f3;
    border-top: 1px solid #f3f3f3;
    height: auto!important;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
  }
  .bg-333
  {
    background: #333;
    color: #fff;
  }
  .c-3f
  {
    color: #fff;
  }
  .list-admin
  {
    height: 45px;
    line-height: 45px;
    text-indent:25px;
    font-weight: 700;
    font-size: 16px;
    border-bottom: 1px solid #222;
    cursor:pointer;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  #left>.active
  {
    background: #777;
  }
  .list-admin-items
  {
    border-bottom: 1px solid gray;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  .list-admin-items>a
  {
    display: block;
    width: 100%;
    padding-left:35px;
    padding-top: 5px;
    padding-bottom: 5px;
    color: #fff;
    text-decoration: none!important;
    height:40px;
    line-height:30px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  .list-admin-items>a:hover
  {
    text-decoration: none!important;
  }
  .list-admin-items>.active
  {
    background: #777;
  }
</style>
