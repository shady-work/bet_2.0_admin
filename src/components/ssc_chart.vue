<template>
     <div>
         <div class="col-md-8">
             <h4 style="margin-top: 8px;margin-bottom: 14px;">
                 总条数：<span class="label label-default">{{sum.sum_bet_num}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 总金额：<span class="label" style="color:blue">{{sum.sum_bet_money}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                 结算后盈亏：<span style="color:green" v-if="sum.sum_open_win>0">{{sum.sum_open_win}}</span>
                 <span style="color:red" v-else="sum.sum_open_win<0">{{sum.sum_open_win}}</span>

             </h4>


             <table class="table table-hovor table-bordered table-striped text-center">
                 <thead class="bg-primary">
                 <tr >
                     <td width="20" rowspan="10" style="text-align: right;padding-right:38px;">玩法</td>
                     <!--<td >特码</td>-->
                     <td width="100">赔率</td>
                     <td width="90">下注总条数</td>
                     <td width="150">下注总金额</td>
                     <td width="150">盈亏</td>

                 </tr>
                 </thead>
                 <tbody>
                 <tr v-for="(v,k) in all_odds" >
                     <td style="text-align: right">
                         {{v.mark_a}}【{{v.mark_b}}】

                     </td>
                     <!--<td>-->
                         <!--{{v.mark_b}}-->
                     <!--</td>-->
                     <td>
                         {{v.rate}}
                     </td>
                     <td>
                         {{v.bet_num}}
                     </td>
                     <td>
                         {{v.bet_money}}
                     </td>
                     <td>
                         {{v.sum_win}}
                     </td>
                 </tr>
                 </tbody>
             </table>


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
        name: "ssc_chart",
        data(){
            return{
                all_odds:[],
                sum:'',
            };
        },
        created()
        {
            this.get_all_odds();
        },
        methods:{
            get_all_odds:function(){
                this.$http.get(
                        `${this.api}/admin/ssc/markb`
                    )
                    .then(function(res) {
                        if(res.data.status == 200)
                        {
                            console.log(res.data);
                            this.all_odds = res.data.data.list;
                            this.sum=res.data.data.summary;
                        }
                    });
            },
        },
    }
</script>

<style scoped>
.col-md-8{
    margin-left:10px;
    margin-top: 5px;
}
</style>