<template>
    <div>
        <div class="form-horizontal"  v-show="next_step">
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
       <button class="btn btn-primary btn-lg center-block" @click="nextstep()">修改</button>
     </div> 

          <div class="form-horizontal" v-show="!next_step">
               
                <div class="lottery" v-for="(v,k) in lottery_list">
                    <div class="form-group" style="margin-bottom: 5px;">
                    <label  class="col-sm-2 control-label">
                        {{be_str_lty_name(k)}}{{k}}
                    </label>
                    <div class="col-sm-10">
                        <label class="checkbox-inline" v-for="(i,d) in v.odds_list">
                        <input type="checkbox" v-bind:value="i"   v-model="handicaps[k+'_handicaps']"> {{return_last_alp(i)}}盘
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
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
          </div>
    </div>
    


    
</template>

<script>
export default {
    data()
    {
        return{
            user_id:0,
            lotteries:[],
            list:[],
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
            },
            next_step : true,
            lottery_list:{},
        };
    },
    methods:
    {
        get_user_lty()
        {
            this.$http.get(`${this.api}/admin/lottery/${this.user_id}/edit`)
            .then(function(res)
            {
                if(res.data.status == 200)
                {
                    this.list = res.data.data.list;
                    for(let  i = 0;i<res.data.data.list.length;i++)
                    {
                            if(res.data.data.list[i].checked == 1)
                            {
                                this.lotteries.push(res.data.data.list[i].name);
                            }
                    }
                } 
                
            });
        },
        nextstep()
        {
            let data =  this.list;
            if(this.lotteries.indexOf('cqssc') != -1)
            {
                data[0].checked = 1;
            }
            else
            {
                data[0].checked = 0;
            }
            if(this.lotteries.indexOf('bjpk10') != -1)
            {
                data[1].checked = 1;
            }
            else
            {
                data[1].checked = 0;
            }
            if(this.lotteries.indexOf('pcegg') != -1)
            {
                data[2].checked = 1;
            }
            else
            {
                data[2].checked = 0;
            }
            if(this.lotteries.indexOf('cakeno') != -1)
            {
                data[3].checked = 1;
            }
            else
            {
                data[3].checked = 0;
            }
            this.$http.post(`${this.api}/admin/userLottery/${this.user_id}`,
            {
                 "list":data,
            })
            .then(function(res)
            {
                console.log(res.data); 
                if(res.data.status == 200)
                {
                    //只是删除彩种，提示成功，并且跳转到user_manager的页面
                    if(res.data.data.lotteries.length < 1)
                    {
                        this.$message({message:"修改成功",center:true,type:"success",});
                        this.$router.push('users');

                    }
                    else
                    {
                        this.lottery_list = res.data.data.lotteries;
                        this.next_step = false;
                    }
                }
            });
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
         },
         return_last_alp:function(str)
          {
            let data = str.charAt(str.length - 1);
            data = data.toUpperCase();
            return data;
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
                         
                         this.$message({message:"修改成功",center:true,type:"success",});
                         this.$router.push('/users');
                         return;
                      }
                  });
           }
           else
           {
             this.$message.error(str)
           }
           return;

         },

    },
    created()
    {
      this.user_id = this.$route.params.u_id?this.$route.params.u_id:window.sessionStorage.edit_uid;
      window.sessionStorage.edit_uid = this.user_id;
      this.get_user_lty();
    },
    watch:
    {
      
    }
}
</script>

<style scoped>
.form-horizontal
  {
    width: 80%;
    margin:0 auto;
    margin-left:10px;
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
  .form-group{
    /*position:absolute;*/
    left:10px;
  }
</style>
