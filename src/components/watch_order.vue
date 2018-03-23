<template>
      <div id="watch">

      </div>
</template>

<script>
export  default
{
    data(){
      return {

      };
    },
    created()
    {
      var that = this;
      //创建websoket
      let ws = new WebSocket("ws://lty-main.com:8282");
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
            //console.log(obj.msg);
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
        }
    }

}
</script>


<style scoped></style>
