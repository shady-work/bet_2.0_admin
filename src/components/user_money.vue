
<template>
    <div id="user_money">
            <table class="table table-hover table-bordered table-striped text-center">
          <thead>
            <tr class="">
              <td>序号</td>
              <td>用户名/昵称</td>
              <td>现金额度</td>
              <td>信用额度</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(v,k) in list" >
                <td>
                  {{k+1}}
                </td>
                <td>{{v.username}}/{{v.nickname}}</td>
                <td>
                  {{v.cash_money}}
                </td>
                <td>
                  {{v.credit_money}}
                </td>
                
            </tr>
          </tbody>
          
      </table>
    </div>  
</template>

<script>
export default 
{
    name:'user_money',
    data (){
      return {
          list:[],
          classes:['info','danger','primary','warning'],
      }
    },
    methods: {
        get_users_money:function()
        {
            this.$http.get(this.api + '/admin/money').then(function(res){
                    this.list = res.data.data.money_list;
            });
        },
    },
    created () {
        this.get_users_money();
    }
}
</script>

<style scoepd>
.table
  {
    width: 80%;
    margin:0 auto;
    margin-top: 50px;
  }
</style>


