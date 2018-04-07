<template>
   <div id="users">
     <div class="form-horizontal" v-show="next_step">
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
         <label  class="col-sm-2 control-label">现金额度</label>
         <div class="col-sm-10">
           <input type="text" class="form-control"  placeholder="请输入" v-model="cash_money">
         </div>
       </div>
       <div class="form-group">
         <label  class="col-sm-2 control-label">信用额度</label>
         <div class="col-sm-10">
           <input type="text"  class="form-control"  placeholder="请输入" v-model="credit_money">
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

       <div class="form-group">
         <label  class="col-sm-2 control-label">选择彩种</label>
         <div class="col-sm-10">
           <label class="checkbox-inline">
             <input type="checkbox" id="inlineCheckbox1" value="cqssc"   v-model="lotteries"> 重庆时时彩
           </label>
           <label class="checkbox-inline">
             <input type="checkbox" id="inlineCheckbox2" value="bjpk10" v-model="lotteries"> 北京赛车PK10
           </label>
           <label class="checkbox-inline">
             <input type="checkbox" id="inlineCheckbox3" value="pcegg" v-model="lotteries"> PC蛋蛋
           </label>
           <label class="checkbox-inline">
             <input type="checkbox" id="inlineCheckbox4" value="cakeno" v-model="lotteries"> 加拿大28
           </label>
         </div>
       </div>
       <button class="btn btn-primary btn-lg center-block" @click="add_user()">添加</button>
     </div>


     <div class="form-horizontal" v-show="!next_step">
       <div class="form-group">
         <label  class="col-sm-2 control-label">用户名</label>
         <div class="col-sm-10">
           <input type="text" v-bind:value="username2" class="form-control"  >
         </div>
       </div>

       <div class="lottery" v-for="(v,k) in lottery_list">

         <div class="form-group" style="margin-bottom: 5px;">
           <label  class="col-sm-2 control-label">
             {{be_str_lty_name(k)}}{{k}}
           </label>
           <div class="col-sm-10">
             <label class="checkbox-inline" v-for="(i,d) in v.odds_list">
               <input type="checkbox" v-bind:value="i"   v-model="handicaps[k+'_handicaps']"> {{i}}
             </label>
           </div>
         </div>

         <div class="form-group" style="margin-bottom: 5px;">
           <label  class="col-sm-2 control-label">最低下注</label>
           <div class="col-sm-10">
             <input type="text"  class="form-control" v-model="bet_rules[k].money_min"  placeholder="请输入">
           </div>
         </div>

         <div class="form-group" style="margin-bottom: 5px;">
           <label  class="col-sm-2 control-label">最高下注</label>
           <div class="col-sm-10">
             <input type="text"  class="form-control" v-model="bet_rules[k].money_max"  placeholder="请输入">
           </div>
         </div>

         <div class="form-group" style="margin-bottom: 5px;">
           <label  class="col-sm-2 control-label">最多中奖金额</label>
           <div class="col-sm-10">
             <input type="text"  class="form-control" v-model="bet_rules[k].money_win"  placeholder="请输入">
           </div>
         </div>
       </div>
       <button class="btn btn-primary center-block" @click="comfire_that()">确定</button>
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
          cash_money:10000,
          credit_money:10000,
          lotteries:['cqssc'],
          next_step : true,
          lottery_list:{},
          username2:'',
          user_id:'',
          handicaps:
          {
            cqssc_handicaps :[],
            bjpk10_handicaps:[],
            pcegg_handicaps :[],
            cakeno_handicaps:[],
          },
          bet_rules:
          {
            cqssc:
            {
              money_min:10,
              money_max:10000,
              money_win:50000,
            },
            bjpk10:
            {
              money_min:10,
              money_max:10000,
              money_win:50000,
            },
            pcegg:
            {
              money_min:10,
              money_max:10000,
              money_win:50000,
            },
            cakeno:
            {
              money_min:10,
              money_max:10000,
              money_win:50000,
            },
          }
        };
        return data;
     },
     methods:
       {
         add_user: function () {
           let check = this.check();
           if (check) {
             this.$http.post(this.api + '/admin/users',
               {
                 username: this.username,
                 nickname: this.nickname,
                 pwd_1: this.pwd_1,
                 pwd_2: this.pwd_2,
                 type: this.user_type,
                 lotteries: this.lotteries,
                 cash_money: this.cash_money,
                 credit_money: this.credit_money,
               }).then(function (res) {
               if (res.data.status == 200) {
                 console.log(res.data);
                 this.lottery_list = res.data.data.lotteries;
                 this.username2 = res.data.data.user.username;
                 this.user_id = res.data.data.user.id;
                 this.next_step = false;
                 //alert(res.data.msg);
                 //this.$router.push('users');
                 return;
               }
               else {
                 alert(res.data.msg);
               }
               return;
             });
           }
           else {
             alert('格式不对~');
             return false;
           }


         },
         check: function () {
           var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
           if (!uPattern.test(this.username)) {
             console.log('username is wrong');
             return false;
           }
           if (this.nickname == '') {
             console.log('nickname is null');
             return false;
           }
           var pPattern = /^[0-9a-zA-Z]{6,16}$/;
           if (!pPattern.test(this.pwd_1)) {
             console.log('pwd_1 is wrong');
             return false;
           }
           if (!pPattern.test(this.pwd_2)) {
             console.log('pwd_2 is wrong');
             return false;
           }
           if (this.cash_money == '') {
             console.log('cash_money is wrong');
             return false;
           }

           return true;
         },

         comfire_that: function ()
         {
           var str = '至少选择一个盘口给用户' ;
           var flag = true ;
           var data =
           {
              user_id : this.user_id ,
              lotteries:
              {

              },
           };
           var keys =  Object.keys(this.lottery_list);
           for (let  i = 0;i<keys.length;i++)
           {
             data.lotteries[keys[i]] = {};
             data.lotteries[keys[i]].odds_sel = this.handicaps[keys[i] + '_handicaps'];
             if(data.lotteries[keys[i]].odds_sel.length < 1)
             {
                flag = false;
                break;
             }
             data.lotteries[keys[i]].trad = {};
             data.lotteries[keys[i]].trad = this.bet_rules[keys[i]];
           }
           if(flag)
           {
                this.$http.post(`${this.api}/admin/lottery`,data)
                  .then(function(res)
                  {
                      if(res.data.status == 200)
                      {
                         alert('添加用户成功');
                         this.$router.push('/users');
                         return;
                      }
                  });
           }
           else
           {
             alert(str);
           }
           return;

         },
         be_str_lty_name : function (str)
         {
            var data = '';
            str = str.toString();
            switch (str)
            {
              case 'bjpk10':
                data = '北京赛车PK拾';
                break;
              case 'cqssc':
                data = '重庆时时彩';
                break;
              case 'pcegg':
                data = 'PC蛋蛋';
                break;
              case 'cakeno':
                data = ' 加拿大28';
                break;
              default:
                break;
            }
            return data;
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
  #inlineCheckbox1,#inlineCheckbox2,#inlineCheckbox3,#inlineCheckbox4
  {
    width:25px;
    height:25px;
    margin-left:-30px;
    margin-top:-6px;
  }
  .checkbox-inline
  {
    margin-right:20px;
  }
</style>
