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
                 <input type="text" class="form-control" placeholder="请输入用户名" v-model="username">
               </div>

                <div class="input-group input-group-lg mt15">
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-lock"></i>
                  </span>
                  <input type="text" class="form-control" placeholder="请输入密码" @focus="test($event)" v-model="pwd_1">
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
                console.log(res.data);
                if(res.data.status == 403 || res.data.status == 404 || res.data.status == 0)
                {
                  alert(res.data.msg);
                  return false;
                }
                if(res.data.status == 200)
                {
                   //login success
                   alert(res.data.msg);
                   window.localStorage.token = res.data.data.token;
                   window.sessionStorage.admin_id = res.data.data.user_id;
                   window.sessionStorage.isLogin_admin = 'ok';
                   //window.sessionStorage.admin_type = 'ok';
                   this.$set(this.$store.state,'admin_id',res.data.data.user_id);
                   this.$router.push('/');
                }
                return;
             });
          },
          test:function(e)
          {
            console.log(1);
            let event = e || window.event;
            console.log(e.keyCode);
          }
      },

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
