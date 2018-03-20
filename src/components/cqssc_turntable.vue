<template>
    <div id="cqssc_turntable">
          <table class="table table-hover table-bordered table-striped text-center">
              <thead>
                <tr>
                  <td>转盘名称</td>
                  <td>转盘地址</td>
                  <td>转盘token</td>
                  <td>现金额度</td>
                  <td>信用额度</td>
                  <td>最小下注额度</td>
                  <td>最大下注额度</td>
                  <td>最大中奖额</td>
                  <td>是否默认转盘</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(v,k) in list">
                  <td>{{v.trad_name}}</td>
                  <td>{{v.trad_url}}</td>
                  <td>{{v.trad_tokensup}}</td>
                  <td>{{v.trad_cash}}</td>
                  <td>{{v.trad_credit}}</td>
                  <td>{{v.trad_min}}</td>
                  <td>{{v.trad_max}}</td>
                  <td>{{v.trad_win}}</td>
                  <td>{{v.sel==0?'否':'是'}}</td>
                </tr>
              </tbody>
          </table>
    </div>
</template>

<script>
  export default
  {
      name:'cqssc_turntable',
      data()
      {
          return{
             msg:'xw',
             list:[],
          }
      },
      methods:
      {
          get_turntable:function()
          {
            this.$http.get(`${this.api}/admin/ssc/tradlist`)
              .then(function(res)
              {
                  if(res.data.status == 200)
                  {
                    this.list = res.data.data.trad_list;
                  }
                  else
                  {
                    console.log('加载失败');
                  }
              });
          }
      },
      created()
      {
          this.get_turntable();
      },
  }
</script>

<style scoped>
  .table {
    width: 90%;
    margin: 0 auto;
    margin-top: 50px;
  }
</style>
