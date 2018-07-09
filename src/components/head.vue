<template>
   <div id="head">
     <nav class="navbar navbar-inverse navbar-fixed-top">
       <div class="container-fluid pull-right">
         <span class="hello">
            <router-link to="/" class="color-white">首页</router-link>
         </span>
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
              if(res.data.status == 200)
              {

                  this.$message(
                  {
                    message:"退出成功~",
                    center:true,
                    type:'success',
                  });
                  this.$router.push('login');
              }
              else
              {
                this.$message(
                  {
                    message:'出错了，请重新登录~',
                    center:true,
                    type:'success',
                  });
                this.$router.push('login');
              }
           });

       }
     }
  }
</script>


<style scoped>
  .navbar{
    background:#2aabd2;
    border:0;
    height:60px;
    line-height:60px;
  }
  .hello
  {
    font-size: 18px;
    color: #fff;
    line-height:60px;
    margin-right:30px;
  }
  .log-out
  {
    margin-right:60px;
    cursor: pointer;
  }
</style>
