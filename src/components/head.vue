<template>
   <div id="head">
     <nav class="navbar navbar-inverse navbar-fixed-top">
       <div class="container-fluid">
         <span class="hello"><a href="/" class="color-white">
            首页
         </a></span>
         <span class="hello">您好，{{this.$store.state.admin_name}}</span>
         <span class="hello pull-right log-out">退出</span>
       </div><!-- /.container-fluid -->
     </nav>
   </div>
</template>
<script>

</script>


<style scoped>
  .hello
  {
    font-size: 18px;
    color: #fff;
    line-height: 40px;
    margin-left: 15px;
  }
  .log-out
  {
    margin-right: 30px;
    cursor: pointer;
  }
</style>
