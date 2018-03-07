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
                 <input type="text" class="form-control" placeholder="请输入用户名">
               </div>

                <div class="input-group input-group-lg mt15">
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-lock"></i>
                  </span>
                  <input type="text" class="form-control" placeholder="请输入密码">
                </div>
           </div>

            <div class="panel-footer">
                <button class="btn btn-primary btn-lg center-block w200">登录</button>
            </div>
         </div>
    </div>
</template>

<script>
  export  default
  {

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
