<template>
   <div id="head">
     <nav class="navbar navbar-inverse navbar-fixed-top">
       <div class="container-fluid">
         <span class="hello"><a href="/" class="color-white">
            首页
         </a></span>
         <span class="hello">您好，{{this.$store.state.admin_name}}
           （{{this.$store.state.admin_type==1?'代理':(this.$store.state.admin_type==2?'总代理':"管理员")}}）</span>
         <span class="hello pull-right log-out" @click="log_out()">退出</span>
       </div><!-- /.container-fluid -->
     </nav>
   </div>
</template>
<script>
  export default
  {
     methods:
     {
       log_out:function()
       {
          //清除所有的sessionStorage
          let keys = Object.keys(sessionStorage);
          for(let i=0;i<keys.length;i++)
          {
            sessionStorage.removeItem(keys[i])
          }
          //退出登录接口
         this.$http.delete(`${this.api}/admin/token`)
           .then(function(res)
           {
              console.log(res.data);
              if(res.data.status == 200)
              {
                 alert('退出成功');
                 this.$router.push('login');
              }
              else
              {
                alert('出错了，请重新登录');
                this.$router.push('login');
              }
           });

       }
     }
  }
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
