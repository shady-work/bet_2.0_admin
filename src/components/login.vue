<template>
    <div id="login">
         <div class="panel panel-info center-block">
            <div class="panel-heading text-center">
              <h2>后台管理</h2>
            </div>
            <div class="panel-body">
               <div class="input-group input-group-lg">
                 <span class="input-group-addon">
                    <i class="glyphicon glyphicon-user"></i>
                 </span>
                 <input type="text" class="form-control" placeholder="请输入用户名" v-model="username" autofocus='autofocus'>
               </div>

                <div class="input-group input-group-lg mt15">
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-lock"></i>
                  </span>
                  <input type="password" class="form-control" placeholder="请输入密码" v-on:keyup.enter="do_login" v-model="pwd_1">
                </div>
           </div>

            <div class="panel-footer">
                <button class="btn btn-primary btn-lg center-block w200" @click="do_login">登录</button>
            </div>
         </div>
    </div>
</template>

<script>
  export  default
  {
      name:'login',
      data:function()
      {
         let data =
         {
           username:'',
           pwd_1:'',
         };
         return data;
      },
      methods:
      {
          do_login:function()
          {
             this.$http.post(`${this.api}/admin/token`,{username:this.username,pwd_1:this.pwd_1}).then(function(res)
             {
                //登录成功
                if(res.data.status == 200)
                {
                   //login success
                   window.localStorage.token = res.data.data.token;
                   window.sessionStorage.admin_id = res.data.data.user_id;
                   window.sessionStorage.isLogin_admin = 'ok';
                   this.$set(this.$store.state,'admin_id',res.data.data.user_id);
                   this.$router.push('/');
                   this.$message(
                   {
                     message:res.data.msg,
                     center:true,
                     type:'success',
                   });
                }
                else
                {
                  this.$message.error(res.data.msg);
                  
                }
             });
          },

      },
      created()
      {
      }

  }
</script>

<style scoped>
   #login
   {
     position: fixed;
     top: 0;
     left: 0;
     width:100%;
     height: 100%;
     background: url('../assets/img/admin-login-bg.jpg');
     background-size:cover;
     overflow: hidden;
   }
   #login>.panel
   {
     width: 500px;
     margin-top: 255px;
     opacity: 0.8;
   }
   .panel-heading>h2
   {
     margin:0;
     font-size: 22px;
   }
   .mt15
   {
     margin-top: 15px;
   }
   .w200
   {
     width: 250px;
   }
</style>
