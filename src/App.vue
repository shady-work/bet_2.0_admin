<template>

  <div id="app">



      <router-view/>


  </div>
</template>

<script>

export default
{
  name: 'App',

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

</style>
