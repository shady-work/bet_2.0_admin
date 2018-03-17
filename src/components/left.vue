<template>
  <div id="left">
      <div class="list-admin c-3f " @click="toUrl('users')">
         用户管理
      </div>
      <div class="list-admin-items">
        <router-link to="users" >查看用户信息</router-link>
        <router-link to="add_user"  >添加用户</router-link>
      </div>


    <div class="list-admin c-3f active" @click="toUrl('recharge')">
       充值
    </div>
  </div>
</template>
<script>
  export default
  {
      methods:
      {
        toUrl:function(uri)
        {
          this.$router.push(uri);
        },

      }

  }
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
    height: 35px;
    line-height: 35px;
    text-indent:25px;
    font-weight: 700;
    font-size: 14px;
    border-bottom: 1px solid #222
  }
  #left>.active
  {
    background: #777;
  }
  .list-admin-items
  {

    border-bottom: 1px solid #fff;
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
