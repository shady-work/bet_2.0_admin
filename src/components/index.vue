<template>
    <div id="index">
      <!--头部-->
      <my-head></my-head>
      <!--左边导航栏-->
      <my-left></my-left>
      <!--主内容区域-->
      <div id="center">
      <router-view/>
      </div>
    </div>
</template>

<script>
  import head from "../components/head"
  import left from "../components/left"
  export default
  {
    name:'Index',
    components:
    {
      "my-head":head,
      "my-left":left
    },
    created:function(){
       //is_login
       if(this.$store.state.admin_id || window.sessionStorage.admin_id)
       {
          console.log('欢迎回来.....admin_id:' + (this.$store.state.admin_id || window.sessionStorage.admin_id) );
       }
       else
       {
         this.$router.push('login');
       }
    }
  }
</script>
<style>
  #index
  {
    background: #fff;
  }
  #center
  {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-left: 200px;
    padding-top: 50px;
    overflow:auto;
    overflow-x: hidden;

  }
  #user
  {
    width: 100%;
    height:100%;
    overflow: hidden;
  }
</style>
