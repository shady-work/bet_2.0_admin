<template>
   <div id="users">
     <div class="form-horizontal">
        <h2>添加用户</h2>

       <div class="form-group">
         <label  class="col-sm-2 control-label">用户名</label>
         <div class="col-sm-10">
           <input type="text" v-model="username" class="form-control"  placeholder="请输入">
         </div>
       </div>

       <div class="form-group">
         <label  class="col-sm-2 control-label">昵称</label>
         <div class="col-sm-10">
           <input type="text" v-model="nickname" class="form-control"  placeholder="请输入">
         </div>
       </div>

       <div class="form-group">
         <label  class="col-sm-2 control-label">登录密码</label>
         <div class="col-sm-10">
           <input type="text" v-model="pwd_1" class="form-control"  placeholder="请输入">
         </div>
       </div>

       <div class="form-group">
         <label  class="col-sm-2 control-label">支付密码</label>
         <div class="col-sm-10">
           <input type="text" v-model="pwd_2" class="form-control"  placeholder="请输入">
         </div>
       </div>

       <div class="form-group">
         <label  class="col-sm-2 control-label">类型</label>
         <div class=" col-sm-10">
           <select class="form-control" v-model="user_type">
             <option v-bind:value="0">普通用户</option>
             <option v-bind:value="1">代理</option>
             <option v-bind:value="2">经理</option>
           </select>
         </div>
       </div>

       <button class="btn btn-primary btn-lg center-block" @click="add_user()">添加</button>
     </div>
   </div>
</template>

<script>
  export default
  {
     data()
     {
        var data =
        {
          username:'',
          nickname:'',
          pwd_1:'',
          pwd_2:'',
          user_type:0,
        };
        return data;
     },
     methods:
     {
        add_user:function()
        {
           let check = this.check();
           if(check)
           {
             this.$http.post(this.api + '/admin/users',{username:this.username,nickname:this.nickname,pwd_1:this.pwd_1,pwd_2:this.pwd_2,type:this.type}).then(function(res){
               console.log(res.data);
               if(res.data.status == 200)
               {
                  alert(res.data.msg);
                  this.$router.push('users');
                  return;
               }
               else
               {
                 alert(res.data.msg);
               }
               return;
             });
           }
           else
           {
             alert('格式不对~');
             return false;
           }



        },
        check:function()
        {
          var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
          if(!uPattern.test(this.username))
          {
            console.log('username is wrong');
            return false;
          }
          if(this.nickname == '')
          {
            console.log('nickname is null');
            return false;
          }
          var pPattern = /^[0-9a-zA-Z]{6,16}$/;
          if(!pPattern.test(this.pwd_1))
          {
            console.log('pwd_1 is wrong');
            return false;
          }
          if(!pPattern.test(this.pwd_2))
          {
            console.log('pwd_2 is wrong');
            return false;
          }

          return true;
        }

     },//end of methods
     created:function()
     {

     },

  }
</script>

<style scoped>
  #users
  {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .form-horizontal
  {
    width: 80%;
    margin:0 auto;
  }
</style>
