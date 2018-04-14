<template>
      <div id="watch">
            <ul class="nav nav-tabs my-nav  nav-justified">
              <li role="presentation" :class="activeArray[0]?'active':''"><a @click="get_cqssc_orders('ssc',0)">cqssc</a></li>
              <li role="presentation" :class="activeArray[1]?'active':''"><a @click="get_cqssc_orders('pk10',1)">pk10</a></li>
              <li role="presentation" :class="activeArray[2]?'active':''"><a @click="get_cqssc_orders('egg',2)">pcegg</a></li>
              <li role="presentation" :class="activeArray[3]?'active':''"><a @click="get_cqssc_orders('cake',3)">cakeno</a></li>
            </ul>
            <table class="table table-bordered table-striped text-center">
               <thead>
                  <tr>
                    <td>用户名-昵称</td>
                    <td>期数</td>
                    <td>下注内容</td>
                    <td>下注金额</td>
                    <td>下注时间</td>
                  </tr>
               </thead>
              <tbody>
                  <tr v-for="(v,k) in list">
                    <td>{{v.username}}-{{v.nickname}}</td>
                    <td>{{v.expect}}</td>
                    <td>{{v.lty_name}}-{{v.mark_a}}-{{v.mark_b}}</td>
                    <td>{{v.money}}</td>
                    <td>{{v.create_time}}</td>
                  </tr>
              </tbody>
            </table>
      </div>
</template>

<script>
export  default
{
    data(){
      return {
        list:[],
        activeArray:[1,0,0,0],
        ssc:[],
        pk10:[],
        cake:[],
        egg:[],
        all:[],
        host:'',
      };
    },
    created()
    {
        this.$http.get(`${this.api}/host`).then(function(res){

          this.host = res.data;
        }).then(function(){
          this.created_websoket();
          this.get_cqssc_orders();
        });

    },

    methods:
    {
        bind_websoket_id:function(client_id)
        {
          this.$http.post(`${this.api}/admin/client`,
          {
             client_id
          }).then(function(res)
          {
               if(res.data.status == 200)
               {
                 console.log(res.data.msg);
               }
               else
               {
                 console.log('failed bind websoket_id');
               }
          });
        },
         created_websoket:function()
         {
           var that = this;
           //创建websoket
           let ws = new WebSocket("ws://"+ this.host +":8282");
           //当websoket创建成功的时候触发的函数
           ws.onopen = function ()
           {
             ws.send('{"type":"login","msg":"'+ (window.localStorage.token?window.localStorage.token:'') +'"}');
           };
           //当websoket接收server信息的时候触发的函数
           ws.onmessage = function (e)
           {
             let msg = e.data;
             let obj = JSON.parse(msg);
             switch (obj.type) {
               case 'ping':
                 ws.send('{"type":"pong"}');
                 break;
               case 'client':
                 that.bind_websoket_id(obj.msg);
                 break;
               default:
                 that.add_orders(obj.msg,obj.lty_name);
             }
           };

           ws.onclose = function ()
           {
             console.log('link closed ...');
           };

           ws.onerror = function (e) {
             console.log(e.data);
           }
         },
         get_cqssc_orders:function(lottery_name = 'ssc',index = 0)
         {

           this.activeArray = [0,0,0,0];
           this.activeArray[index] = true;
           this.$http.get(`${this.api}/admin/${lottery_name}/history/order?per_page=20`)
             .then(function(res){
               if(res.data.status == 200)
               {
                 this[lottery_name] = res.data.data.list;
                 this.list = this[lottery_name];
               }
               else
               {
                 console.log('the codes of history was load failed');
               }
             });
         },
         add_orders:function(obj,type)
         {

             switch (type) {
               case "cqssc" :
                 this.get_cqssc_orders('ssc',0);
                 break;
               case "bjpk10" :
                 this.get_cqssc_orders('pk10',1);
                 break;
               case "cakeno" :
                 this.get_cqssc_orders('cake',3);
                 break;
               case "pcegg" :
                 this.get_cqssc_orders('egg',2);
                 break;
             }
         },
    }

}
</script>


<style scoped>
  #watch{
    position:relative;
  }
  
  .table
  {
    width:1200px;
    margin:0 auto;
    margin-top: 10px;
    font-size: 12px;
    margin-left:10px;
  }
  .my-nav
  { 
     width:1200px;
    margin-left:10px;   
    margin-top: 5px;
  }
</style>
