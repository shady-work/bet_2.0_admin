<template>
    <div class="diagram">
      <h2 class="text-info" style="text-indent:25px;">系统报表</h2>
        <!--<div class="head">-->
          <!--&lt;!&ndash;<span class="pull-left">按条件筛选</span>&ndash;&gt;-->
          <!--&lt;!&ndash;<span class="pull-left ml10">时间</span>&ndash;&gt;-->
          <!--&lt;!&ndash;<select  class="form-control select-time pull-left">&ndash;&gt;-->
            <!--&lt;!&ndash;<option value="">请选择</option>&ndash;&gt;-->
          <!--&lt;!&ndash;</select>&ndash;&gt;-->


          <!--&lt;!&ndash;<span class="pull-left ml10">彩种</span>&ndash;&gt;-->
          <!--&lt;!&ndash;<select  class="form-control select-time pull-left">&ndash;&gt;-->
            <!--&lt;!&ndash;<option value="">请选择</option>&ndash;&gt;-->
          <!--&lt;!&ndash;</select>&ndash;&gt;-->

          <!--&lt;!&ndash;<button class="btn btn-success pull-left ml10">查询</button>&ndash;&gt;-->
          <!--<div class="clearfix"></div>-->

        <!--</div>-->
        <div class="wrap" v-for="(v,k) in english_array">
        <h3>{{chinese_array[k]}}</h3>
        <table class="table table-hovered table-bordered table-striped text-center">
          <thead>
          <tr class="bg-info">
            <td>彩种</td>
            <td>盈亏</td>
            <td>已结算条数</td>
            <td>已结算金额</td>
            <td>中奖条数</td>
            <td>中奖金额</td>
            <td>未中奖条数</td>
            <td>未中奖金额</td>
            <td>未结算条数</td>
            <td>未结算金额</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(val,key) in summary[v]">
            <td>{{be_str(key)}}</td>
            <td>{{val.yk}}</td>
            <td>{{val.clearedCount}}</td>
            <td>{{val.clearedMoney}}</td>
            <td>{{val.luckyCount}}</td>
            <td>{{val.luckyMoney}}</td>
            <td>{{val.unluckyCount}}</td>
            <td>{{val.unluckyMoney}}</td>
            <td>{{val.unclearedCount}}</td>
            <td>{{val.unclearedMoney}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
  export  default
  {
      name:'Index',
      data()
      {
         return{
           summary:
           {
             today:{},
             this_week:{},
             last_week:{},
             this_month:{},
             last_month:{},
             this_year:{},
           },
           take_val_array:['all','bjpk10','cqssc','pcegg','cakeno'],
           chinese_array:['今天','本周','上周','本月','上月','今年'],
           english_array:['today','this_week','last_week','this_month','last_month','this_year'],
         }
      },
      methods:
      {
         getSummary:function(time = 'today', lty_type = 'all')
         {

            for(let i = 0;i<this.english_array.length;i++)
            {

              this.$http.get(`${this.api}/admin/summary?range=${this.english_array[i]}&ty_type=${lty_type}`)
                .then(function(res)
                {
                  console.log(res);
                  if(res.data.status == 200)
                  {
                    this.summary[this.english_array[i]] = res.data.data.summary;
                  }
                  else
                  {
                      // this.$message(
                      // {
                      //   message:"您尚未登录，请登录后再试",
                      //   center:true,
                      //   type:'warning',
                      // });
                      // this.$router.push('login');
                  }
                });
            }

         },
         be_str:function(str)
         {
           let data = '';
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
               data = '全部';
               break;
           }
           return data;
         },
      },
      created()
      {
        this.getSummary();
      },

  }
</script>

<style scoped>
   .head
   {
     width: 900px;
     margin:0 auto;
     margin-top: 15px;
     height: 40px;
     line-height: 40px;
   }
  .select-time
  {
    width: 100px;
    margin-left: 15px;
  }

  .wrap
  {
    width: 1000px;
    margin-left: 50px;
  }
</style>
