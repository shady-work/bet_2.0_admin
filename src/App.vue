<template>

  <div id="app">
    <!--头部-->
    <my-head></my-head>
    <!--左边导航栏-->
    <my-left></my-left>
    <div id="center">
      <router-view/>
    </div>

  </div>
</template>

<script>
  import head from "./components/head"
  import left from "./components/left"
export default
{
  name: 'App',
  components:
  {
      "my-head":head,
      "my-left":left
  }
}
</script>

<style>
  @import url('./assets/css/init.css');
  @import url('./assets/css/bootstrap.css');
  html,body,#app
  {
    height: 100%;
    width: 100%;
    font-family: "Microsoft Yahei","Hiragino Sans GB","Helvetica Neue",Helvetica,tahoma,arial,"WenQuanYi Micro Hei",Verdana,sans-serif,"\5B8B\4F53";
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

  }
</style>
