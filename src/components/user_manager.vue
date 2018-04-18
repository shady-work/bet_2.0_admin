
<template>
   <div id="users">
       <div id="search">
         <input type="text" class="form-control search-input pull-left" v-model="username" placeholder="请输入用户名">
         <div class="user-type-str pull-left ml10">用户类型</div>
         <select v-model="type" class="form-control pull-left ml10" id="user-type">
           <option v-bind:value="null">不限</option>
           <option v-bind:value="3">管理</option>
           <option v-bind:value="2">代理</option>
           <option v-bind:value="1">推广</option>
           <option v-bind:value="0">会员</option>

         </select>
         <div class="user-type-str pull-left ml10">是否禁用</div>
         <select v-model="status" class="form-control pull-left ml10" id="user-type-1">
           <option v-bind:value="null">不限</option>
           <option v-bind:value="1">启用</option>
           <option v-bind:value="0">禁用</option>
         </select>
         <button class="btn btn-success ml10 pull-left " @click="search_user">查找</button>
         <div class="clearfix"></div>
       </div>

        <table class="table table-bordered  table-hover text-center table-striped">
          <thead>
            <tr class=" active">
              <td >用户ID</td>
              <td >用户名</td>
              <td >昵称</td>
              <td >现金额度</td>
              <td >信用额度</td>
              <!--<td >用户加入时间</td>-->
              <td >是否可用</td>
              <td >用户类型</td>
              <td >tokensup</td>
              <td >操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(v,k,index) in users" >
              <td>{{v.user_id}}</td>
              <td>{{v.username}}</td>
              <td>{{v.nickname}}</td>
              <td v-if="v.type != 3">{{v.money.cash_money}}</td>
              <td v-if="v.type == 3">无</td>
              <td v-if="v.type != 3">{{v.money.credit_money}}</td>
              <td v-if="v.type == 3">无</td>
              <!--<td>{{v.ctime}}</td>-->
              <td>
                  <b class="text-danger" v-if="v.status != 1">禁用</b>
                  <b class="text-info" v-if="v.status == 1">可用</b>
              </td>
              <td>
                  <b v-if="v.type == 0">会员</b>
                  <b v-if="v.type == 1">推广</b>
                  <b v-if="v.type == 2">代理</b>
                  <b v-if="v.type == 3">管理</b>
              </td>
              <td>
                <a @click="show_users_tokensup(v.tokensup,v.username)">点此查看</a>
              </td>
              <td  style="text-align: right">
                <button v-if="v.type != 0" class="btn btn-info btn-sm" @click="right_edit(v.user_id)">权限管理</button>
                <button v-if="v.status == 1"  class="btn btn-danger btn-sm"  @click="user_disabled(v.user_id)">禁用</button>
                <button v-if="v.status == 0"  class="btn btn-info btn-sm"  @click="user_open(v.user_id)">启用</button>
                 <!--<button class="btn btn-warning btn-sm" @click="check_handicaps(v.user_id)">查看盘口</button>-->
                <button class="btn btn-primary btn-sm" @click="toUserSum(v.user_id)">查看用户报表</button>
                <button class="btn btn-primary btn-sm" @click="user_edit(v.nickname,v.type,v.user_id,v.money.cash_money,v.money.credit_money)">修改</button>
                <button class="btn btn-primary btn-sm" @click="toEditLty(v.user_id)">修改彩种</button>
              </td>
            </tr>
          </tbody>
        </table>

       <div class="row mt15">
         <div class="col-md-4"></div>
         <div class="col-md-4">
           <span>当前第 {{page}} 页</span>
           <span>共 {{pageNum}} 页，</span>
           <button class="btn btn-primary btn-xs" v-if="hasPrev" @click="prevPage()">
             上一页
           </button>

           <button class="btn btn-info btn-xs" v-if="hasNext" @click="nextPage()">
             下一页
           </button>
           <span>共 {{sum}} 条</span>
           <br>
           <br>
         </div>
         <div class="col-md-4"></div>
       </div>
     <br>
     <br>

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

             <div class="form-group">
               <label for="inputEmail4" class="col-sm-2 control-label">现金额度</label>
               <div class="col-sm-10">
                 <input type="text" v-model="cash_money" class="form-control" id="inputEmail4" placeholder="请输入">
               </div>
             </div>

             <div class="form-group">
               <label for="inputEmail5" class="col-sm-2 control-label">信用额度</label>
               <div class="col-sm-10">
                 <input type="text" v-model="credit_money" class="form-control" id="inputEmail5" placeholder="请输入">
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
            page:1,
            per_page:15,
            hasNext:false,
            hasPrev:false,
            nextPageUrl:'',
            prevPageUrl:'',
            type:null,
            agent:null,
            manager:null,
            username:null,
            nickname_s:null,
            status:null,
            sum:0,
            pageNum:0,
            cash_money:10000.00,
            credit_money:10000.00,
            users_tokensup:'',
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
                 this.users = res.data.data.list;
                 this.hasPrev = res.data.data.hasPrev;
                 this.hasNext = res.data.data.hasNext;
                 this.sum = res.data.data.sum;
                 this.pageNum = res.data.data.pageNum;
                 this.prevPageUrl = this.hasPrev?res.data.data.prevPageUrl:'';
                 this.nextPageUrl = this.hasNext?res.data.data.nextPageUrl:'';
               }
               else
               {
                 alert('用户数据加载失败.....');
               }
            });
        },
        /*
         *点击查看用户的tokensup by elementUI message
         */
        show_users_tokensup(tokensup,username)
        {
            this.users_tokensup = tokensup;
            this.$alert(this.users_tokensup, `用户${username}的tokensup`, {
              confirmButtonText: '确定',
              dangerouslyUseHTMLString: true,
              center:true,
            });
        },
        prevPage:function()
        {
         if(this.prevPageUrl == '')
         {
           this.$message.error('没有上一页了');
           return;
         }
         else
         {
           this.page--;
           this.$http.get(`${this.api}${this.prevPageUrl}`)
             .then(function(res){
               if(res.data.status == 200)
               {
                 this.users = res.data.data.list;
                 this.hasPrev = res.data.data.hasPrev;
                 this.hasNext = res.data.data.hasNext;
                 this.prevPageUrl = this.hasPrev?res.data.data.prevPageUrl:'';
                 this.nextPageUrl = this.hasNext?res.data.data.nextPageUrl:'';
               }
               else
               {
                 this.$message.error('数据加载失败');
               }
             });
         }
       },
        nextPage:function()
        {
         if(this.nextPageUrl == '')
         {
           this.$message.error('没有下一页了');
           return;
         }
         else
         {
           this.page++;
           this.$http.get(`${this.api}${this.nextPageUrl}`)
             .then(function(res){
               if(res.data.status == 200)
               {
                 this.users = res.data.data.list;
                 this.hasPrev = res.data.data.hasPrev;
                 this.hasNext = res.data.data.hasNext;
                 this.prevPageUrl = this.hasPrev?res.data.data.prevPageUrl:'';
                 this.nextPageUrl = this.hasNext?res.data.data.nextPageUrl:'';
               }
               else
               {
                 this.$message.error('数据加载失败。');
               }
             });
         }
       },
       /**
        * 禁用用户
        * @param user_id
        */
        user_disabled:function(user_id)
        {
          this.$http.delete(`${this.api}/admin/users/${user_id}`).then(function(res)
          {
            if(res.data.status == 200)
            {

                this.$message(
                    {
                        message:res.data.msg,
                        center:true,
                        type:'success',
                    });
               this.get_user_list();

            }
            else
            {
              this.$message.error(res.data.msg);
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

              if(res.data.status == 200)
              {

                  this.$message(
                      {
                          message:res.data.msg,
                          center:true,
                          type:'success',
                      });
                this.get_user_list();
                return;
              }
              else
              {
                  this.$message.error(res.data.msg);
              }
            });
        },
        
       /**
        * edit user info
        * @param nickname
        * @param user_type
        * @param user_id
        */
        user_edit:function(nickname,user_type,user_id,cash_money,credit_money)
        {
            this.nickname = nickname;
            this.user_type = user_type;
            this.user_id = user_id;
            this.cash_money = cash_money;
            this.credit_money = credit_money;
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
          this.$http.put(`${this.api}/admin/users/${this.user_id}`,{nickname:this.nickname,type:this.user_type,cash_money:this.cash_money,credit_money:this.credit_money}).then(function(res)
          {
            //修改成功
            if(res.data.status == 200)
            {
              this.get_user_list();
              this.isShow = false;
              this.$message(
              {
                message:res.data.msg,
                center:true,
                type:"success",
              });
            }
            else
            {
              //修改失败
              this.$message.error(res.data.msg);
            }
          });
        },
       /**
        * search user
        * @param1 type:用户类型 0 1 2 3
        * @param2 agent 查看指定推广下面的用户
        * @param3 manager 查找指定代理下的用户列表
        * @param4  username: 根据用户名模糊查询
        * @param5  nickname: 可 根据昵称模糊查询
        */
        search_user:function()
        {
            this.users = [];
            let url = this.search_url(
            {
              type:this.type,
              agent:this.agent,
              manager:this.manager,
              username:this.username,
              nickname_s:this.nickname_s,
              status:this.status,
            });
            this.$http.get(url).then(function(res){
                console.log(res.data);
                if(res.data.status == 200)
                {
                  this.users = res.data.data.list;
                  this.hasPrev = res.data.data.hasPrev;
                  this.hasNext = res.data.data.hasNext;
                  this.prevPageUrl = this.hasPrev?res.data.data.prevPageUrl:'';
                  this.nextPageUrl = this.hasNext?res.data.data.nextPageUrl:'';
                  if(this.users.length<1)
                  {
                     alert('没有符合条件的数据.');
                  }
                }
            });
        },


       /**
        *
        * @param maps
        * @returns {string}
        */
       search_url:function(maps={type:null,agent:null,manager:null,username:null,nickname:null,status:null})
       {
            let url = `${this.api}/admin/users?`;
            let keys = Object.keys(maps);
            for(let i = 0;i<keys.length;i++)
            {
                if(maps[keys[i]] != null)
                {
                  url += keys[i] + '=' + maps[keys[i]] + '&';
                }
            }
            return url;
       },
       /**
        * 跳转到用户盘口
        * @param u_id
        */
       check_handicaps:function(u_id)
       {
          this.$router.push(
            {
              path:'users_handicaps',
              name:'users_handicaps',
              params:{u_id}
            }
          );
       },

       /**
        * 权限管理页面
        */
       right_edit:function(u_id)
       {
          this.$router.push(
          {
             path:'edit_right',
             name:'edit_right',
             params:{u_id},
          });
       },
       /**
        * 跳转到用户报表
        * @param u_id
        */
       toUserSum:function(u_id)
       {
         this.$router.push(
           {
             path:'user_sum',
             name:'user_sum',
             params:{u_id},
           });
       },
        /**
        * 跳转到修改用户彩种
        * @param u_id
        */
       toEditLty(u_id)
       {
            this.$router.push(
           {
             path:'edit_user_lty',
             name:'edit_user_lty',
             params:{u_id},
           });
       },

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
    font-size: 12px;
  }
  .table
  {
    width: 1200px;
    margin:0 auto;
    margin-top: 10px;
    margin-left:10px;
  }
  #myModal
  {
    top:-15px;
  }
  #myModal>.panel
  {
    width: 600px;
    margin-top: 50px;
  }
  #search
  {
    height:40px;
    width: 80%;
    margin:0 auto;
    padding-top: 15px;
    margin-left:10px;
  }

  #search>.search-input
  {
    width: 220px;
  }
  #user-type,#user-type-1
  {
    width: 150px;
  }
  .user-type-str
  {
    height: 34px;
    line-height: 34px;
    font-size: 13px;
  }
</style>
