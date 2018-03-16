<template>
   <div id="users">
        <table class="table table-bordered  table-hover text-center table-striped">
          <thead>
            <tr class=" active">
              <td class="h3">序号</td>
              <td class="h3">用户名</td>
              <td class="h3">昵称</td>
              <td class="h3">用户加入时间</td>
              <td class="h3">是否可用</td>
              <td class="h3">用户类型</td>
              <td class="h3">操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(v,k,index) in users" class="">
              <td>{{k}}</td>
              <td>{{v.username}}</td>
              <td>{{v.nickname}}</td>
              <td>{{v.ctime}}</td>
              <td>
                  <b class="text-danger" v-if="v.status != 1">禁用</b>
                  <b class="text-info" v-if="v.status == 1">可用</b>
              </td>
              <td>
                  <b v-if="v.type == 0">普通用户</b>
                  <b v-if="v.type == 1">代理</b>
                  <b v-if="v.type == 2">经理</b>
                  <b v-if="v.type == 3">管理</b>
              </td>
              <td>
                <button v-if="v.status == 1"  class="btn btn-danger"  @click="user_disabled(v.id)">禁用</button>
                <button v-if="v.status == 0"  class="btn btn-info"  @click="user_open(v.id)">启用</button>
                <button class="btn btn-primary" @click="user_edit(v.nickname,v.type,v.id)">修改</button>
              </td>
            </tr>
          </tbody>
        </table>

       <!--修改用户信息-->
       <div id="myModal" v-show="isShow" @click="close()">
           <div class="panel panel-info center-block" @click="stop_cancel()">

             <div class="panel-heading">修改用户信息</div>

             <div class="panel-body form-horizontal">

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">昵称</label>
                  <div class="col-sm-10">
                    <input type="text" v-model="nickname" class="form-control" id="inputEmail3" placeholder="请输入">
                  </div>
                </div>

                <div class="form-group">
                  <label  class="col-sm-2 control-label">类型</label>
                  <div class=" col-sm-10">
                    <select class="form-control" v-model="user_type">
                      <option v-bind:value="0">普通用户</option>
                      <option v-bind:value="1">代理</option>
                      <option v-bind:value="2">经理</option>
                      <option v-bind:value="3">管理</option>
                    </select>
                  </div>
                </div>
              </div>

             <div class="panel-footer">
               <button class="btn btn-primary pull-right" @click="do_edit()">修改</button>
               <button class="btn btn-info pull-right mr10" @click="isShow = false">取消</button>
               <div class="clearfix"></div>
             </div>

           </div>
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
            users:[],
            user_type:0,
            nickname:'',
            isShow:false,
            user_id:false,
        };
        return data;
     },
     methods:
     {
        /**
         * load users
         */
        get_user_list:function()
        {
            this.$http.get(`${this.api}/admin/users`).then(function(res)
            {
               if(res.data.status == 200)
               {
                 this.users = res.data.data.user;
               }
               else
               {
                 alert('用户数据加载失败.....');
               }
            });
        },
       /**
        * 禁用用户
        * @param user_id
        */
        user_disabled:function(user_id)
        {
          this.$http.delete(`${this.api}/admin/users/${user_id}`).then(function(res)
          {
            if(res.data.status == 201)
            {
               alert(res.data.msg);
               this.get_user_list();
               return;
            }
            else
            {
              alert(res.data.msg);
              console.log('禁用失败');
            }
          });
        },
       /**
        * open user
        * @param user_id
        */
        user_open:function(user_id)
        {
            this.$http.put(`${this.api}/admin/unbinduser/${user_id}`).then(function(res)
            {
              if(res.data.status == 201)
              {
                alert(res.data.msg);
                this.get_user_list();
                return;
              }
              else
              {
                alert(res.data.msg);
                console.log('启用失败');
              }
            });
        },
       /**
        * edit user info
        * @param nickname
        * @param user_type
        * @param user_id
        */
        user_edit:function(nickname,user_type,user_id)
        {
            this.nickname = nickname;
            this.user_type = user_type;
            this.user_id = user_id;
            this.isShow = true;
        },
        stop_cancel:function(e)
        {
         let event = e || window.event;
         event.cancelBubble = true;
        },
        close:function(e)
        {
         this.isShow = false;
         let event = e || window.event;
         event.cancelBubble = true;
        },
       /**
        * 修改用户资料
        * @param user_id
        */
        do_edit:function(user_id)
        {
          this.$http.put(`${this.api}/admin/users/${this.user_id}`,{nickname:this.nickname}).then(function(res)
          {
            if(res.data.status == 201)
            {
              alert(res.data.msg);
              this.get_user_list();
              this.isShow = false;
              return;
            }
            else
            {
              alert(res.data.msg);
              console.log('修改失败');
              return;
            }
          });
        }
     },//end of methods
     created:function()
     {
          this.get_user_list();
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
  .table
  {
    width: 80%;
    margin:0 auto;
    margin-top: 50px;
  }
  #myModal>.panel
  {
    width: 600px;
    margin-top: 50px;
  }
</style>
